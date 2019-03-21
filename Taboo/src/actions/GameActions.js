import { NEW_GAME, INCREMENT, PASS, DECREMENT, NEXT_TURN } from '../types';
export const newGame = (settings) => ({
  type: NEW_GAME,
  settings: settings,
});

export const increment = (team) => ({
  type: INCREMENT,
  team: team,
});

export const decrement = (team) => ({
  type: DECREMENT,
  team: team,
});

export const pass = (team) => ({
  type: PASS,
  team: team,
});

export const nextTurn = (team) => ({
  type: NEXT_TURN,
  team: team,
});
