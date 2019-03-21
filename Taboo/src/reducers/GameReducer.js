import { NEW_GAME, INCREMENT, DECREMENT, PASS, NEXT_TURN } from '../types';
import { Game, Team} from '../objects';
import utils from '../utils';

const wordsLib = require('../../assets/data/words.json');

getWordSet = (keyword, previous) => {
  let words = wordsLib.words;

  // Reset the word
  if (keyword) {
    previous.add(keyword);
  }
  keyword = null;
  var tabooWords = [];

  // Grab a random unused word from the library
  var i = 0;
  while (!keyword && i < (words.length - 1)) {
    let randomWordSet = words[Math.round(Math.random() * words.length)];

    if (!(previous.has(randomWordSet.keyword)) && randomWordSet.taboo_words.length == 5) {
      keyword = randomWordSet.keyword;
      tabooWords = randomWordSet.taboo_words;
    }
    i++;
  }
  return {
    'keyword': keyword,
    'tabooWords': tabooWords,
    'previous': previous,
  };
}

let initialWS = getWordSet(null, new Set());

const INITIAL_STATE = {
  currentGame: null,
  keyword: initialWS.keyword,
  tabooWords: initialWS.tabooWords,
  previous: initialWS.previous,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  let { currentGame, keyword, tabooWords, previous } = state;

  let _currentGame;
  let _words;

  switch (action.type) {
    case NEW_GAME:
      const newGame = new Game(action.settings);
      return { currentGame: newGame, keyword: keyword, tabooWords: tabooWords, previous: previous };
    case INCREMENT:
      currentGame.increment(action.team);
      _currentGame = utils.clone(currentGame);
      _words = getWordSet(keyword, previous);
      return { currentGame: _currentGame, keyword: _words.keyword, tabooWords: _words.tabooWords, previous: _words.previous };
    case PASS:
      currentGame.pass(action.team);
      _currentGame = utils.clone(currentGame);
      _words = getWordSet(keyword, previous);
      return { currentGame: _currentGame, keyword: _words.keyword, tabooWords: _words.tabooWords, previous: _words.previous };
    case DECREMENT:
      currentGame.decrement(action.team);
      _currentGame = utils.clone(currentGame);
      _words = getWordSet(keyword, previous);
      return { currentGame: _currentGame, keyword: _words.keyword, tabooWords: _words.tabooWords, previous: _words.previous };
    case NEXT_TURN:
      currentGame.nextTurn(action.team);
      _currentGame = utils.clone(currentGame);
      _words = getWordSet(keyword, previous);
      return { currentGame: _currentGame, keyword: _words.keyword, tabooWords: _words.tabooWords, previous: _words.previous };
    default:
      return state
  }
};

export default gameReducer;
