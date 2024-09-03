"use client";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchContraventores } from "../store/slices/contraventoresSlice";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useRouter } from 'next/navigation';

const ListContraventores: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const contraventores = useSelector((state: RootState) => state.contraventores.contraventores);
  const status = useSelector((state: RootState) => state.contraventores.status);
  const router = useRouter();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContraventores());
    }
  }, [dispatch, status]);

  const handleEdit = (id: number) => {
    router.push(`/contraventor/edit/${id}`);
  };

  const handleCadastrar = () => {
    router.push('/contraventor/create');
  };

  return (
    <div>
      <h1>Lista de Contraventores</h1>
      <Button variant="contained" color="primary" onClick={handleCadastrar}>
        Cadastrar Contraventor
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contraventores.map((contraventor) => (
              <TableRow key={contraventor.id_cont}>
                <TableCell>{contraventor.nome_cont}</TableCell>
                <TableCell>{contraventor.tipo_cont}</TableCell>
                <TableCell>{contraventor.login_cont}</TableCell>
                <TableCell>{contraventor.cpf_cont}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEdit(contraventor.id_cont)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListContraventores;
