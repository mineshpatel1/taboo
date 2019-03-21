import json
import types
import queue
import logging
import threading
import requests
from html.parser import HTMLParser

TABOO_URL = 'http://playtaboo.com/ajax/v1/next'
WORD_LIB = 'Taboo/assets/data/words.json'
RUN_SIZE = 100


def create_logger(name):

    class Formatter(logging.Formatter):
        def __init__(self, msg, datefmt='%Y-%m-%d %H:%M:%S'):
            logging.Formatter.__init__(self, msg)
            self.datefmt = datefmt

        def format(self, record):
            return logging.Formatter.format(self, record)

    def log_newline(self, lines=1):
        self.removeHandler(self.console_handler)
        self.addHandler(self.blank_handler)

        for _ in range(lines):
            self.info('')

        self.removeHandler(self.blank_handler)
        self.addHandler(self.console_handler)

    logger = logging.getLogger(name)
    if len(logger.handlers) == 0:
        logger.setLevel(logging.INFO)
        _format = '[%(levelname)-8s][%(asctime)s][%(name)s]    %(message)s'
        datefmt = '%Y-%m-%d %H:%M:%S'

        console_handler = logging.StreamHandler()
        colour_formatter = Formatter(_format, datefmt)
        console_handler.setFormatter(colour_formatter)
        logger.addHandler(console_handler)
        logger.console_handler = console_handler

        blank_handler = logging.StreamHandler()
        blank_handler.setLevel(logging.DEBUG)
        blank_handler.setFormatter(logging.Formatter(fmt=''))
        logger.blank_handler = blank_handler

        logger.newline = types.MethodType(log_newline, logger)

    return logger


log = create_logger("taboo")


def batch(_func):
    """
    Decorator to wrap a function so that it can run in multiple threads.
    Takes a list of tuples with the inputs of the child function.
    """
    def batch_wrap(
        _lst, num_threads=25, suppress_err_msg=False, raise_exception=False
    ):
        def worker():
            while True:
                item = q.get()
                try:
                    _func(*item)
                except Exception as err:
                    if not suppress_err_msg:
                        log.error('Error: {}'.format(err))
                    if raise_exception:
                        raise Exception(err)
                q.task_done()

        q = queue.Queue()

        for _i in range(num_threads):
            t = threading.Thread(target=worker)
            t.daemon = True
            t.start()

        for _item in _lst:
            if not isinstance(_item, tuple):
                q.put((_item,))
            else:
                q.put(_item)

        q.join()  # Wait for all operations to complete

    return batch_wrap


def load_words(fp):
    log.info('Loading word sets from {}...'.format(fp))
    with open(fp) as f:
        data = json.load(f)
    word_set = set()
    for ws in data['words']:
        word_set.add(WordSet(ws['keyword'], ws['taboo_words']))
    log.newline()
    return word_set


def save_words(word_sets, fp):
    log.newline()
    log.info('Saving word sets to {}...'.format(fp))
    out = {
        'words': [ws.dict for ws in word_sets]
    }
    with open(fp, 'w') as f:
        json.dump(out, f, indent=4)


@batch
def fetch_word(parser):
    r = requests.get(TABOO_URL)
    parser.feed(str(r.content))


class WordSet:
    def __init__(self, keyword, taboo_words):
        if not isinstance(keyword, str):
            raise TypeError("Keyword must be a string.")

        if not hasattr(taboo_words, '__iter__'):
            raise TypeError("taboo_words must be an iterable of strings.")

        for w in taboo_words:
            if not isinstance(w, str):
                raise TypeError("All taboo words must be strings.")

        self.keyword = keyword.lower()
        self.taboo_words = [w.lower() for w in taboo_words]

    @property
    def dict(self):
        return {
            'keyword': self.keyword,
            'taboo_words': [w for w in self.taboo_words],
        }

    def __hash__(self):
        return hash(self.keyword)

    def __eq__(self, other):
        return self.keyword == other.keyword


class MyHTMLParser(HTMLParser):
    def __init__(self, word_set):
        super(MyHTMLParser, self).__init__()

        if not isinstance(word_set, set):
            raise TypeError("word_set must be a set.")

        self.word_set = word_set
        self.keyword = None
        self.taboo_words = None
        self.keyword_flag = False
        self.taboo_block_flag = False

    def handle_starttag(self, tag, attrs):
        for attr, value in attrs:
            if attr == 'class' and value == 'game-word':
                self.keyword_flag = True
            elif attr == 'class' and value == 'game-words':
                self.taboo_block_flag = True

    def handle_endtag(self, tag):
        if tag == 'h2' and self.keyword_flag:
            self.keyword_flag = False
        elif tag == 'ul' and self.taboo_block_flag:

            self.finish()

    def handle_data(self, data):
        if self.keyword_flag:
            self.keyword = data.strip().lower()
        elif self.taboo_block_flag:
            if self.taboo_words is None:
                self.taboo_words = []
            data = data.strip().lower()
            if data != '' and data != '\\r':
                self.taboo_words.append(data)

    def finish(self):
        log.info('Adding {} word set...'.format(self.keyword))
        if len(self.taboo_words) == 5:
            self.word_set.add(WordSet(self.keyword, self.taboo_words))
        self.keyword = None
        self.taboo_words = None
        self.keyword_flag = False
        self.taboo_block_flag = False


def main():
    word_sets = load_words(WORD_LIB)
    parser = MyHTMLParser(word_sets)
    fetch_word([parser] * RUN_SIZE, num_threads=25)
    save_words(word_sets, WORD_LIB)
    log.newline()
    log.info("Total word set size: {}".format(str(len(word_sets))))


if __name__ == "__main__":
    main()
