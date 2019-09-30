import { combineReducers } from "redux";
import materials from './material-reducer';
import details from './detail-reducer';

export default combineReducers({
  materials,
  details,
});