import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Animated, Easing, View, ScrollView } from 'react-native';
import { Title, Content, Left, Right, Body, Icon, Text } from 'native-base';
import Button from '../components/Button';
import Timer from '../components/Timer';
import HandleBack from '../components/HandleBack';
import ThemeContainer from '../components/ThemeContainer';
import Header from '../components/Header';
import ConfirmButtons from '../components/ConfirmButtons';
import ConfirmModal from '../components/ConfirmModal';
import { increment, pass, decrement, nextTurn } from '../actions/GameActions';
import utils from '../utils';
import style from '../styles/Core';

class Game extends Component {
  constructor(props) {
    super(props);

    let scoreBars = {};
    for (let team of props.game.teams) {
      scoreBars[team.name] = new Animated.Value(0);
    }

    this.state = {
      currentTeam: null,
      inPlay: false,
      scoreBars: scoreBars,
      roundTime: props.game.settings.roundLength,
      progress: new Animated.Value(100),
      background: new Animated.Value(0),
      paused: false,
      timeRemaining: 0,
    };
  }

  onBack = () => {
    if (!this.props.game.gameOver()) {
      this.pause();
      return true;
    } else {
      this.props.navigation.navigate('Home');
      return true;
    }
  }

  pause = () => {
    let _this = this;
    _this.setState({ paused: true });

    if (this.state.inPlay) {
      this.timer.togglePaused();
      this.state.progress.stopAnimation((val) => {
        this.progressValue = val;
      });
    }
  }

  unpause() {
    this.setState({ paused: false });
    if (this.state.inPlay) {
      this.timer.togglePaused();
      this.animateProgress(
        0, this.progressValue * this.props.game.settings.roundLength * 10,
        this.endRound
      );
    }
  }

  startRound = (currentTeam, roundLength) => {
    this.animateProgress(100, 0);
    this.animateProgress(0, roundLength * 1000, this.endRound);
    this.setState({ currentTeam: currentTeam, inPlay: true, roundTime: roundLength });
  }

  endRound = () => {
    if (!this.state.paused) {
      this.props.nextTurn(this.state.currentTeam);
      this.setState({inPlay: false});
      this.animateScoreBars(this.props.game.teams);
      if (!this.props.game.gameOver()) {
        this.animateBg(this.props.game.currentIndex());
      } else {
        this.animateBg(
          utils.indexOfArray(
            this.props.game.teams, 'name', this.props.game.winner().name,
          )
        );
      }
    }
  }

  animateProgress(val, duration, callback) {
    Animated.timing(
      this.state.progress,
      {
        toValue: val,
        duration: duration,
        easing: Easing.linear,
      }
    ).start(callback);
  }

  animateScoreBars(teams, duration=500) {
    let topScore = utils.maxBy(teams, 'score').score;
    for (let i = 0; i < teams.length; i++) {
      let pct = Math.floor(teams[i].score < 0 ? 0 : (100 * (teams[i].score / topScore)));
      if (isNaN(pct)) pct = 0;
      Animated.timing(
        this.state.scoreBars[teams[i].name],
        {
          toValue: pct,
          duration: duration,
          easing: Easing.linear,
        }
      ).start();
    }
  }

  animateBg(idx, duration=300) {
    Animated.timing(
      this.state.background,
      {
        toValue: idx,
        duration: 300,
      }
    ).start();
  }

  render() {
    let { props, state } = this;
    let currentTeam = props.game.currentTeam();
    let gameOver = props.game.gameOver();
    let winner = props.game.winner();
    let bgColour = currentTeam.colour;

    let gameOverMsg;
    if (gameOver) {
      bgColour = winner.colour;
      if (props.game.teams.filter(team => team.score == winner.score).length > 1) {
        gameOverMsg = "It's a Draw!";
      } else {
        gameOverMsg = winner.name + ' Wins!'
      }
    }

    let orderedTeams = utils.sortByKey(props.game.teams, 'score', false);

    return (
      <HandleBack onBack={this.onBack}>
        <ThemeContainer>
          <ConfirmModal
            text={"Game progress will be lost.\n\nAre you sure you want to go back?"}
            isVisible={state.paused}
            onRequestClose={() => {this.unpause()}}
            onCancel={() => {this.unpause()}}
            onSuccess={() => {
              this.unpause();
              this.props.navigation.navigate('Home');
            }}
          />
          <Animated.View style={[style.f1, {
            backgroundColor: state.background.interpolate({
              inputRange: utils.sequence(props.game.teams.length),
              outputRange: props.game.teams.map((t) => t.colour),
            })
          }]}>
            {
              state.inPlay &&
              <View style={[style.container]}>
                <View style={[{height: 50, alignItems: 'center'}, style.col]}>
                  <View style={[style.row, style.mt20]}>
                    <Left style={style.row}>
                      <Text style={[style.lightText20b]}>{currentTeam.name}</Text>
                    </Left>
                    <Body>
                      <Text style={[style.lightText20b]}>{currentTeam.score}</Text>
                    </Body>
                    <Right>
                      <Timer
                        style={[style.lightText20b]}
                        length={props.game.settings.roundLength}
                        ref={x => this.timer = x}
                      />
                    </Right>
                  </View>
                </View>
                <Animated.View style={{
                  height: 5, marginTop: 5, marginBottom: 5, backgroundColor: '#fff',
                  width: state.progress.interpolate({
                    inputRange: [0, 100], outputRange: ['0%', '100%'],
                  }),
                }} />
                <View style={[style.lightBox, style.mt20, style.col, style.f1, style.center]}>
                  <Text style={[style.sansSerifBold, {fontSize: 24, marginBottom: 15}]}>
                    {props.keyword.toUpperCase()}
                  </Text>
                  {
                    props.tabooWords.map((w, i) => (
                      <Text key={i} style={[
                        style.lightGrey, style.sansSerifBold, style.fs20, {marginBottom: 5}
                      ]}>{w.toUpperCase()}</Text>
                    ))
                  }
                </View>
                <View style={{flex: 1}} />
                <View>
                  <ConfirmButtons
                    light
                    yesIcon='checkmark' neutralIcon='fastforward' noIcon='close'
                    yesPress={() => {
                      props.increment(currentTeam);
                    }}
                    noPress={() => {
                      props.decrement(currentTeam);
                    }}
                    neutralPress={() => {
                      props.pass(currentTeam);
                    }}
                  />
                </View>
              </View>
            }
            {
              !state.inPlay &&
              <View style={[style.container]}>
                <View style={[{height: 60, alignItems: 'center'}, style.col]}>
                  {
                    gameOver &&
                    <View style={[style.row, style.mt20, style.mb10]}>
                      <Text style={[style.serifHeading, style.lightText]}>GAME OVER</Text>
                    </View>
                  }
                </View>
                <View style={[style.lightBox, {height: 280}]}>
                  <View style={{paddingTop: 10, alignItems: 'center'}}>
                    <Text style={[style.serifHeading]}>SCORES</Text>
                  </View>
                  <ScrollView>
                    <View style={[style.f1, style.padded]}>
                      {
                        orderedTeams.map((t, i) => (
                          <View key={i} style={style.col}>
                            <View style={[style.row, style.mb10, {justifyContent: 'space-between'}]}>
                              <Text style={[style.sansSerifBold, style.fs20, {color: t.colour}]}>{t.name}</Text>
                              <Text style={[style.sansSerifBold, style.fs20]}>{t.score}</Text>
                            </View>
                            <Animated.View style={[style.mb10, {
                              width: state.scoreBars[t.name].interpolate({
                                inputRange: [0, 100], outputRange: ['0%', '100%'],
                              }),
                              height: 5, backgroundColor: t.colour
                            }]} />
                          </View>
                        ))
                      }
                    </View>
                  </ScrollView>
                </View>
                {
                  !gameOver &&
                    <View style={style.f1}>
                      <View style={[style.f1, style.center]}>
                        <Text style={[style.serifHeading, style.lightText]}>{'ROUND ' + props.game.round().toString()}</Text>
                        <Text style={[style.lightText20]}>{'Guessing Team: ' + currentTeam.name}</Text>
                      </View>
                      <Button
                        label='Start Round'
                        onPress={() => {
                          this.startRound(currentTeam, props.game.settings.roundLength);
                        }}
                      />
                    </View>
                }
                {
                  gameOver && (
                    <View style={style.f1}>
                      <View style={[style.f1, style.center]}>
                        <Text style={[style.light, style.serifHeading]}>{gameOverMsg}</Text>
                      </View>
                      <Button
                        label = 'Back to Home'
                        onPress={() => {
                          props.navigation.navigate('Home');
                        }}
                      />
                    </View>
                  )
                }
              </View>
            }
          </Animated.View>
        </ThemeContainer>
      </HandleBack>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.games.currentGame,
    keyword: state.games.keyword,
    tabooWords: state.games.tabooWords,
  }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    increment, pass, decrement, nextTurn,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
