import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  getByUserId,
  getUser,
  updateUser,
} from "../../../services/user/user";

export const fetchUser = createAsyncThunk(
  "fetch-user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

export const fetchByIdUser = createAsyncThunk(
  "fetch-fetchByIdUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getByUserId(id);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

export const insertUser = createAsyncThunk(
  "add-user",
  async (body, { rejectWithValue }) => {
    try {
      const response = await addUser(body);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

export const editUser = createAsyncThunk(
  "update-user",
  async (body, { rejectWithValue }) => {
    try {
      const response = await updateUser(body);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);

export const removeUser = createAsyncThunk(
  "remove-user",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await deleteUser(userId);
      if (response.status === 401) {
        return rejectWithValue(response);
      }
      return { userId, data: response };
    } catch (error) {
      return rejectWithValue(error?.response || "Unexpected error");
    }
  }
);
