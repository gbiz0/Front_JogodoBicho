'use client';

import { FC, useEffect, useState } from 'react';
import api from '../../utils/axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Edit, Delete } from '@mui/icons-material'; // Importe os ícones

interface Contraventor {
  id_cont: number;
  nome_cont: string;
  tipo_cont: string;
  login: string;
  cpf_cont: string;
}

const ListContraventores: FC = () => {
  const [contraventores, setContraventores] = useState<Contraventor[]>([]);
  const router = useRouter();

  const fetchContraventores = async () => {
    try {
      const response = await api.get<Contraventor[]>('/contraventor/selectAll');
      setContraventores(response.data);
    } catch (error) {
      console.error('Erro ao buscar contraventores:', error);
      alert('Falha ao carregar contraventores.');
    }
  };

  useEffect(() => {
    fetchContraventores();
  }, []);

  const handleEdit = (id: number) => {
    console.log(`Navegando para /contraventor/edit/${id}`); // Para debugar
    router.push(`/contraventor/edit/${id}`); // Redireciona para a página de edição do contraventor
  };  

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este contraventor?");
    if (confirmDelete) {
      try {
        await api.delete(`/contraventor/delete/${id}`);
        alert("Contraventor excluído com sucesso!");
        fetchContraventores();
      } catch (error) {
        console.error("Erro ao excluir contraventor:", error);
        alert("Falha ao excluir contraventor.");
      }
    }
  };

  const handleCadastrar = () => {
    router.push('/contraventor/create');
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
          <TableBody>
            {contraventores.map((contraventor) => (
              <TableRow key={contraventor.id_cont}>
                <TableCell>{contraventor.id_cont}</TableCell>
                <TableCell>{contraventor.nome_cont}</TableCell>
                <TableCell>{contraventor.tipo_cont}</TableCell>
                <TableCell>{contraventor.login}</TableCell>
                <TableCell>{contraventor.cpf_cont}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(contraventor.id_cont)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(contraventor.id_cont)}>
                    <Delete />
                  </IconButton>
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
