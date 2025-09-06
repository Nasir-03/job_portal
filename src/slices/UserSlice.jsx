import { createSlice } from '@reduxjs/toolkit'; 
import Storage from '../services/Storage';

const { getItems, setItems, removeItems } = Storage;

const initialState = getItems('user') || null;

const UserSlice = createSlice({
  name: 'user',     
  initialState,
  reducers:{
    setUser:(state,action) => {
        setItems('user',action.payload);
         return action.payload;
    },
    removeUser: (state) => {
        removeItems('user');
         return null;
    }
  }
  });

  export const { setUser, removeUser } = UserSlice.actions;
  export default UserSlice.reducer;