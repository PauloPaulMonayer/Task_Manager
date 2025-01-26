import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  addTaskToFirebase,
  fetchTasksFromFirebase,
  deleteTaskFromFirebase,
  editTaskInFirebase,
  fetchCategoriesFromFirebase,
  addCategoryToFirebase,
} from "../lib/firebaseTasks";

// Slice לניהול ערכת נושא
const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: "light" },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});
export const { setTheme } = themeSlice.actions;

// Slice לניהול משימות
const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (state, action) => action.payload,
    clearTasks: () => [],
    updateTaskPriority: (state, action) => {
      const { firebaseKey, priority } = action.payload;
      const task = state.find((t) => t.firebaseKey === firebaseKey);
      if (task) task.priority = priority;
    },
  },
});
export const { setTasks, clearTasks, updateTaskPriority } = tasksSlice.actions;

export const fetchTasks = () => (dispatch) => {
  fetchTasksFromFirebase((tasks) => {
    dispatch(setTasks(tasks));
  });
};

export const addTask = (task) => async () => {
  await addTaskToFirebase(task);
};

export const editTask = (firebaseKey, updatedTask) => async (dispatch) => {
  await editTaskInFirebase(firebaseKey, updatedTask);
  dispatch(fetchTasks());
};

export const deleteTask = (firebaseKey) => async (dispatch) => {
  await deleteTaskFromFirebase(firebaseKey);
  dispatch(fetchTasks());
};

// Slice לניהול קטגוריות
const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    setCategories: (state, action) => action.payload,
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    clearCategories: () => [],
  },
});
export const { setCategories, addCategory, clearCategories } =
  categoriesSlice.actions;

export const fetchCategories = () => (dispatch) => {
  fetchCategoriesFromFirebase((categories) => {
    dispatch(setCategories(categories));
  });
};

export const createCategory = (category) => async (dispatch) => {
  await addCategoryToFirebase(category);
  dispatch(fetchCategories());
};

export const editTaskPriority = (firebaseKey, priority) => async (dispatch) => {
  await editTaskInFirebase(firebaseKey, { priority });
  dispatch(fetchTasks());
};

// הגדרת החנות
const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    tasks: tasksSlice.reducer,
    categories: categoriesSlice.reducer,
  },
});

export default store;
