import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";
import { pokemonGetOne } from "../store/modules/PokemonSlice";

const Home: React.FC = () => {
  const [nome, setNome] = useState<string>("");

  const pokemonRedux = useAppSelector(
    (state) => state.pokemon
  );
  const dispatch = useAppDispatch();

  const handleGetPokemon = () => {
    console.log(pokemonRedux.species);
    dispatch(pokemonGetOne(nome));
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "60px",
        minHeight: "100vh",
      }}
    >
      <Grid item xs={9}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", m: 2 }}
          >
            Adicione uma tarefa
          </Typography>
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              label="Digite o Pokemon"
              variant="outlined"
              sx={{ mb: 1 }}
              fullWidth
              value={nome}
              onChange={(ev) =>
                setNome(ev.target.value)
              }
            ></TextField>

            <Button
              variant="contained"
              sx={{
                m: 2,
                backgroundColor: "#818181",
              }}
              onClick={handleGetPokemon}
            >
              Buscar
            </Button>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="160"
                  image={
                    pokemonRedux?.sprites
                      ?.front_default
                  }
                  alt="pokemon"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {pokemonRedux?.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {
                      pokemonRedux?.abilities?.[0]
                        .ability?.name
                    }
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
