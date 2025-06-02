import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const initialState: UserState = {
  id: 1,
  name: "Hamza Faham",
  role: "superadmin", // or "inspector" - "ds" - "superadmin"
  avatar: "/images/dummy-profile-logo.jpg",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    setRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    },
  },
});

export const { setUser, setRole } = userSlice.actions;
export default userSlice.reducer; 