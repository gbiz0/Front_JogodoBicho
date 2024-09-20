'use client';

import { FC, useEffect, useState } from 'react';
import api from '../../utils/axios'; // Ajuste o caminho conforme necessário
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

interface Cliente {
  id_cli: number;
  nome_cli: string;
  logradouro_cli: string;
  bairro_cli: string;
  cidade_cli: string;
  estado_cli: string;
  cep_cli: string;
  numero_cli: number;
  cpf_cli: string;
  rg_cli: string;
}

const ListClientes: FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const router = useRouter();

  const fetchClientes = async () => {
    try {
      const response = await api.get<Cliente[]>('/cliente/selectAll');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      alert('Falha ao carregar clientes.');
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/cliente/edit/${id}`); // Redireciona para a página de edição do cliente
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este cliente?");
    if (confirmDelete) {
      try {
        await api.delete(`/cliente/delete/${id}`); // Ajuste o endpoint se necessário
        alert("Cliente excluído com sucesso!");
        fetchClientes(); // Atualiza a lista de clientes
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        alert("Falha ao excluir cliente.");
      }
    }
  };

  const handleCadastrar = () => {
    router.push('/cliente/create'); // Navega para a página de cadastro de cliente
  };

  return (
    <div className="inset-0 bg-gray-800 bg-opacity-5 backdrop-blur-md p-6">
      <h1 className="text-center text-white text-3xl font-bold mb-4">Lista de Clientes</h1>
      <Button variant="contained" color="primary" className="mb-4" onClick={handleCadastrar}>
        Cadastrar Cliente
      </Button>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Logradouro</TableCell>
              <TableCell>Bairro</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>CEP</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>RG</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id_cli}>
                <TableCell>{cliente.id_cli}</TableCell>
                <TableCell>{cliente.nome_cli}</TableCell>
                <TableCell>{cliente.logradouro_cli}</TableCell>
                <TableCell>{cliente.bairro_cli}</TableCell>
                <TableCell>{cliente.cidade_cli}</TableCell>
                <TableCell>{cliente.estado_cli}</TableCell>
                <TableCell>{cliente.cep_cli}</TableCell>
                <TableCell>{cliente.numero_cli}</TableCell>
                <TableCell>{cliente.cpf_cli}</TableCell>
                <TableCell>{cliente.rg_cli}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(cliente.id_cli)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cliente.id_cli)}>
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

export default ListClientes;
