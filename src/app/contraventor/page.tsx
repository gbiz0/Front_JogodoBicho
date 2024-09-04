"use client";

import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchContraventor } from "../../../store/slices/contraventorSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";

const ListContraventores: FC = () => {
  // const dispatch: AppDispatch = useDispatch();
  // const contraventores = useSelector((state: RootState) => state.contraventor.contraventor);
  // const status = useSelector((state: RootState) => state.contraventor.status);
  const router = useRouter();

  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchContraventor());
  //   }
  // }, [dispatch, status]);

  // const handleEdit = (id: number) => {
  //   router.push(`/contraventor/edit/${id}`);
  // };

  const handleCadastrar = () => {
    router.push("/contraventor/create");
  };

  return (
    <div className="inset-0 bg-gray-800 bg-opacity-5 backdrop-blur-md p-6">
      <h1 className="text-center text-white text-3xl font-bold mb-4">
        Lista de Contraventores
      </h1>
      <Button variant="contained" color="primary" className="mb-4" onClick={handleCadastrar}>
        Cadastrar Contraventor
      </Button>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{/* Dados aqui */}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListContraventores;
