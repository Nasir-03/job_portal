import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import profileReducer from './ProfileSlice';
import filterReducer from './FilterSlice'
import JwtReducer from './JwtSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    profile:profileReducer,
    filter: filterReducer,
    jwt : JwtReducer
  }
});

export default store;
