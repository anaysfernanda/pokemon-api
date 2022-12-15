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
            Procure o pokemon
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
            {pokemonRedux?.name && (
              <Card
                sx={{
                  maxWidth: 345,
                  marginBottom: "15px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={
                      pokemonRedux?.sprites
                        ?.front_default
                    }
                    alt="pokemon"
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ color: "#666363" }}
                    >
                      Nome
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      {pokemonRedux?.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ color: "#666363" }}
                    >
                      Habilidades
                    </Typography>
                    {pokemonRedux?.abilities?.map(
                      (item: any) => {
                        return (
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            key={item.ability.url}
                          >
                            {" "}
                            {item.ability.name}
                          </Typography>
                        );
                      }
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
