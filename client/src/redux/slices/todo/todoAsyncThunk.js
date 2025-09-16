import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  getByTaskId,
  getTask,
  updateTask,
} from "../../../services/todo/todo";

export const fetchTask = createAsyncThunk(
  "fetch-task",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getTask(userId);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

export const fetchByIdTask = createAsyncThunk(
  "fetch-fetchByIdTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getByTaskId(id);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

export const insertTask = createAsyncThunk(
  "add-task",
  async (body, { rejectWithValue }) => {
    try {
      const response = await addTask(body);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

export const editTask = createAsyncThunk(
  "update-task",
  async (body, { rejectWithValue }) => {
    try {
      const response = await updateTask(body);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

export const removeTask = createAsyncThunk(
  "remove-task",
  async (figurineId, { rejectWithValue }) => {
    try {
      const response = await deleteTask(figurineId);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return { figurineId, data: response };
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);
