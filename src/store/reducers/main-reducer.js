import { combineReducers } from 'redux';
import materials from './material-reducer';
import details from './detail-reducer';
import users from './user-reducer';
import selectedMaterials from './selected-reducer';

export default combineReducers({
  materials,
  details,
  users,
  selectedMaterials,
});
