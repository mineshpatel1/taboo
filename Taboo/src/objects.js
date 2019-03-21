import { defaultTeams } from './constants';
import utils from './utils';

export class Game {
  constructor(settings, teams=null, scores=null, turn=null, turns=null) {
    this.settings = settings;

    if (!teams) {
      this.teams = [];
      this.scores = {};
      this.turn = 0;
      this.turns = {};

      for (let i = 0; i < this.settings.numTeams; i++) {
        this.teams.push(defaultTeams[i]);
      }

      this.resetScores();
      this.resetTurns();
      this.resetPasses();
    } else {
      this.teams = teams;
      this.scores = scores;
      this.turn = turn;
      this.turns = turns;
    }
  }

  resetTurns() {
    this.turns = {}
    for (let team of this.teams) {
      this.turns[team.name] = 0;
      team.turns = 0;
    }
  }

  resetScores() {
    this.scores = {};
    for (let team of this.teams) {
      this.scores[team.name] = {};
      team.score = 0;
    }
  }

  resetPasses() {
    for (let team of this.teams) {
      team.passes = 0;
    }
  }

  increment(team) {
    team.score += 1;
    this.scores[team.name] += 1;
  }

  pass(team) {
    team.passes += 1;
  }

  decrement(team) {
    team.score -= 1;
    this.scores[team.name] -= 1;
  }

  nextTurn(team) {
    this.turn += 1;
    this.turns[team.name] += 1;
    team.turns += 1;
  }

  currentIndex() {
    return this.turn % this.teams.length;
  }

  currentTeam() {
    return this.teams[this.currentIndex()];
  }

  round() {
    return Math.floor(this.turn / this.teams.length) + 1;
  }

  gameOver() {
    return (this.round() > this.settings.numTurns) || (this.settings.numTurns * this.teams.length == this.turn);
  }

  winner() {
    return utils.maxBy(this.teams, 'score');
  }
}
