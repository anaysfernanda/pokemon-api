import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { apiDelete, apiGet, apiPost } from "../../api";
import { TaskType, TaskSaveType } from "../../types";

const adapter = createEntityAdapter<TaskType>({
  selectId: (item) => item.id,
});

export const { selectAll: selectTasks, selectById } = adapter.getSelectors(
  (state: RootState) => state.tasks
);

export const tasksGetAll = createAsyncThunk("tasks/getAll", async () => {
  const { data } = await apiGet("/tasks");

  if (data.success === "OK") {
    const { tasks } = data.data;
    return tasks;
  }

  return false;
});

export const taskAdd = createAsyncThunk(
  "tasks/addOne",
  async (product: TaskSaveType, { dispatch }) => {
    const { data } = await apiPost("/products", product);

    if (data.success === "OK") {
      dispatch(tasksGetAll());
    }

    return true;
  }
);

export const taskDelete = createAsyncThunk(
  "tasks/deleteOne",
  async (id: number, { dispatch }) => {
    const { data } = await apiDelete(`/tasks/${id}`);

    if (data.success === "OK") {
      dispatch(tasksGetAll());
    }
    return true;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: adapter.getInitialState(),
  reducers: {
    addOne: adapter.addOne,
    addMany: adapter.addMany,
    updateOne: adapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(tasksGetAll.pending, (state, action) => {
        console.log("Executou a requisição...");
      })
      .addCase(
        tasksGetAll.fulfilled,
        (state, action: PayloadAction<TaskType[]>) => {
          adapter.setAll(state, action.payload);
        }
      )
      .addCase(tasksGetAll.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(taskDelete.pending, (state, action) => {
        console.log("Executou a requisição...");
      })
      .addCase(taskDelete.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Excluiu");
      })
      .addCase(taskDelete.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(taskAdd.pending, (state, action) => {
        console.log("Executou a requisição...");
      })
      .addCase(taskAdd.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Add");
      })
      .addCase(taskAdd.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const { addOne, addMany, updateOne } = taskSlice.actions;
export default taskSlice.reducer;
