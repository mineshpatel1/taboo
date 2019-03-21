import { INIT_SETTINGS, SAVE_SETTINGS } from '../types';
import utils from '../utils';

const SETTINGS = {
  numTeams: {
    default: 2,
    type: 'number',
  },
  roundLength: {
    default: 60,
    type: 'number',
  },
  numTurns: {
    default: 3,
    type: 'number',
  },
}
const INITIAL_STATE = {};

const convertVal = (val, type) => {
  if (typeof(val) == type || val == null) {
    return val;
  }

  switch(type) {
    case 'string':
      return val.toString();
    case 'number':
      val = parseInt(val);
      if (isNaN(val)) {
        val = null;
      }
      return val;
  }
}

const settingsReducer = (state = INITIAL_STATE, action) => {
  let { settings } = state;
  let _settings = {};
  switch (action.type) {
    case INIT_SETTINGS:
      for (param in SETTINGS) {
        _settings[param] = SETTINGS[param].default;
      }

      if (action.settings) {
        for (param in action.settings) {
          _settings[param] = action.settings[param];
        }
      }
      return { settings: _settings };
    case SAVE_SETTINGS:
      for (param in SETTINGS) {
        if (action.settings.hasOwnProperty(param)) {
          _settings[param] = convertVal(action.settings[param], SETTINGS[param].type);
        } else {
          _settings[param] = SETTINGS[param];
        }
      }
      utils.persistStore('settings', _settings);
      return { settings: action.settings };
    default:
      return state;
  }
};

export default settingsReducer;
