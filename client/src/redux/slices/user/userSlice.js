import { createSlice } from "@reduxjs/toolkit";
import {
  editUser,
  fetchByIdUser,
  fetchUser,
  insertUser,
  removeUser,
} from "./userAsyncThunk";

const userSlice = createSlice({
  name: "users",
  initialState: {
    userData: {},
    singleUserData: {},
    error: null,
    loading: false,
    deleteLoading: false,
    mainLoader: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    isFormEmpty: (state) => {
      state.singleUserData = {};
    },
  },
  extraReducers: (builder) => {
    builder

      // all fetch
      .addCase(fetchUser.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.mainLoader = false;
        state.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.mainLoader = false;
        state.error = action.payload?.message;
      })

      // fetch By ID
      .addCase(fetchByIdUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchByIdUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUserData = action.payload;
      })
      .addCase(fetchByIdUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // create
      .addCase(insertUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(insertUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData.push(action.payload);
      })
      .addCase(insertUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // edit
      .addCase(editUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.userData = state.userData.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // remove
      .addCase(removeUser.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.userData = state.userData.filter(
          (users) => users._id !== action.payload.userId
        );
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearError, isFormEmpty } = userSlice.actions;
export default userSlice.reducer;
