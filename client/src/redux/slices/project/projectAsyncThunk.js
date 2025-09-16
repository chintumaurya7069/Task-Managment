import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../../../services/project/project";

// ✅ fetch all projects
export const fetchProjects = createAsyncThunk(
  "fetch-projects",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getProjects(userId);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

// ✅ fetch project by id
export const fetchProjectById = createAsyncThunk(
  "fetch-projectById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProjectById(id);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

// ✅ add project
export const insertProject = createAsyncThunk(
  "add-project",
  async (body, { rejectWithValue }) => {
    try {
      const response = await addProject(body);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

// ✅ update project
export const editProject = createAsyncThunk(
  "update-project",
  async (body, { rejectWithValue }) => {
    try {
      const response = await updateProject(body);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

// ✅ delete project
export const removeProject = createAsyncThunk(
  "remove-project",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await deleteProject(projectId);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return { projectId };
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);
