import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile, updateProfile } from '../services/ProfileService';


export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async ({id,formData}, { rejectWithValue }) => {
    try {
      const res = await updateProfile(id,formData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await getUserProfile(userId); // ✅ This must exist
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        return action.payload;
      });
  }
});

export default profileSlice.reducer;
