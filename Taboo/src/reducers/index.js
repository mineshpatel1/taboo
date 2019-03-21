import { combineReducers } from 'redux';
import RouteReducer from './RouteReducer';
import SettingReducer from './SettingReducer';
import GameReducer from './GameReducer';

export default combineReducers({
  route: RouteReducer,
  settings: SettingReducer,
  games: GameReducer,
})
