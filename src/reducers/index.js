import { TOGGLE } from '../actions';
import { combineReducers } from 'redux';
import update from '../../node_modules/react-addons-update';

const categoryInitialState = {
  categoryData: [
    { categoryName: "식사", isPressed: false },
    { categoryName: "쇼핑", isPressed: false },
    { categoryName: "유흥", isPressed: false },
    { categoryName: "유적", isPressed: false }
  ]
};
  
const category = (state = categoryInitialState, action) => {
  switch(action.type) {
    case TOGGLE:
      const isPressed = state.categoryData[action.idx].isPressed;
      return update(state, {
        categoryData: {
          [action.idx]: {
            isPressed: {
              $set: !isPressed
            }
          }
        }
      })
    default:
      return state
  }
}

const whereTodayApp = combineReducers({ 
  category
});

export default whereTodayApp;
