import { CATEGORY_TOGGLE, PATH_TOGGLE, BLOG_TOGGLE, PATH_ADD, PATH_ADD_MODE_TOGGLE, SELECTED_MARKER_CHANGE, 
  TRANSIT_ADD, TRAVEL_TIME_CHANGE, TRAVEL_TIME_SUM } from '../actions';
import { combineReducers } from 'redux';
import update from '../../node_modules/react-addons-update';

const categoryInitialState = {
  categoryData: [
    { categoryName: "식사/카페/바", isPressed: false },
    { categoryName: "쇼핑", isPressed: false },
    { categoryName: "볼거리", isPressed: false },
    { categoryName: "숙박", isPressed: false },
    { categoryName: "핫플", isPressed: false }
  ]
};

const blogSidebarInitialState = {
  isBlogSidebarOpen: false,
}
  
const pathSidebarInitialState = {
  isPathSidebarOpen: false,
  isPathAddMode: false,
  pathData: [],
  travelTime: [0,0,0,0,0,0,0,0,0,0]
}

const markersInitialState = {
  selectedMarker: ''
}

const category = (state = categoryInitialState, action) => {
  switch(action.type) {
    case CATEGORY_TOGGLE:
      const isPressed = state.categoryData[action.key].isPressed;
      return update(state, {
        categoryData: {
          [action.key]: {
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

const blogSidebar = (state = blogSidebarInitialState, action) => {
  let isOpen;
  switch(action.type) {
    case BLOG_TOGGLE:
      isOpen = state.isBlogSidebarOpen;
      return Object.assign({}, state, {
        isBlogSidebarOpen: !isOpen
      })
    default:
      return state
  }
}

const pathSidebar = (state = pathSidebarInitialState, action) => {
  let isOpen, isPathAddMode;
  switch(action.type) {
    case PATH_TOGGLE:
      isOpen = state.isPathSidebarOpen;
      return Object.assign({}, state, {
        isPathSidebarOpen: !isOpen
      })
    case PATH_ADD:
      return update(state, {
        pathData: {
          $push: [action.spot]
        }
      })
    case PATH_ADD_MODE_TOGGLE:
      isPathAddMode = state.isPathAddMode;
      console.log(isPathAddMode, "toggle");
      return Object.assign({}, state, {
        isPathAddMode: !isPathAddMode
      })
    case TRAVEL_TIME_CHANGE:
      return update(state, {
        travelTime: {
          [action.key]: {
            $set: action.time
          }
        }
      })
    default:
      return state
  }
}

const markers =  (state = markersInitialState, action) => {
  switch(action.type) {
    case SELECTED_MARKER_CHANGE: 
      return Object.assign({}, state, {
        selectedMarker: action.selectedMarker
      })
    default:
      return state
  }
}  

const whereTodayApp = combineReducers({ 
  category,
  blogSidebar,
  pathSidebar,
  markers
});

export default whereTodayApp; 