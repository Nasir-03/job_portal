import { createSlice } from '@reduxjs/toolkit'; 
import Storage from '../services/Storage';

const { getItems, setItems, removeItems } = Storage;

const initialState = localStorage.getItem("token") || null;

const JwtSlice = createSlice({
  name: 'Jwt',     
  initialState,
  reducers:{
    setJwt:(state,action) => {
        localStorage.setItem("token", action.payload);
         return action.payload;
    },
    removeJwt: (state) => {
        localStorage.removeItem("token");
         return null;
    }
  }
  });

  export const { setJwt, removeJwt } = JwtSlice.actions;
  export default JwtSlice.reducer;