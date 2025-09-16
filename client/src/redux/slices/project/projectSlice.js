import { createSlice } from "@reduxjs/toolkit";
import {
  editProject,
  fetchProjectById,
  fetchProjects,
  insertProject,
  removeProject,
} from "./projectAsyncThunk";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    singleProject: {},
    error: null,
    loading: false,
    mainLoader: false,
  },
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchProjects.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.mainLoader = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.mainLoader = false;
        state.error = action.payload?.message;
      })

      // fetch single
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // insert
      .addCase(insertProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })

      // edit
      .addCase(editProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })

      // remove
      .addCase(removeProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (p) => p._id !== action.payload.projectId
        );
      });
  },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;
