import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count:0
};

export const notificationSlice = createSlice({
  name: "notificationUser",
  initialState,
  reducers: {
    updateCount: (state, action) => {
        state.count=action.payload.count
    },
    incrementCount: (state) => {
        state.count += 1; // Increment count by 1
      },
    resetCount: (state, action) => {
        state.count=0
    },
  },
});

export const { updateCount, resetCount,incrementCount } = notificationSlice.actions;

export default notificationSlice.reducer;
