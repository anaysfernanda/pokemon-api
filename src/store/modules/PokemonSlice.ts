import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../api";

const initialState: any = {};

export const pokemonGetOne = createAsyncThunk(
  "pokemon/getOne",
  async (name: string) => {
    const { data } = await apiGet(`pokemon/${name}`);

    console.log(name);
    return data;
  }
);

const PokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    create(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pokemonGetOne.pending, (state, action) => {
        console.log("Executou a requisição...");
      })
      .addCase(pokemonGetOne.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(pokemonGetOne.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const { create, clear } = PokemonSlice.actions;
export default PokemonSlice.reducer;
