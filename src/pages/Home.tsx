import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectTasks, taskAdd, tasksGetAll } from "../store/modules/TaskSlice";

const Home: React.FC = () => {
  const tasksRedux = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksGetAll());
  }, []);

  // const handleAddTask = () => {
  //   dispatch(taskAdd());
  // };

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
          <Typography variant="h4" sx={{ textAlign: "center", m: 2 }}>
            Adicione uma tarefa
          </Typography>
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              label="Nome da tarefa"
              variant="outlined"
              sx={{ mb: 1 }}
              fullWidth
            ></TextField>
            <TextField
              id="outlined-basic"
              label="Descrição da tarefa"
              variant="outlined"
              fullWidth
            ></TextField>
            <Button
              variant="contained"
              sx={{ m: 2, backgroundColor: "#818181" }}
            >
              Adicionar
            </Button>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table sx={{ minWidth: "300px" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Tarefa</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasksRedux.map((row) => (
                    <TableRow
                      key={row.title}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">
                        <>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            sx={{ marginRight: "10px" }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
