import { combineReducers } from 'redux';
import items from './modules/items';

export default combineReducers({
  stateItems: items
});
