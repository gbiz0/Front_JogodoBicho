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

interface Bicho {
  id_bicho: number;
  nome_bicho: string;
  tipo_aposta: string;
  banca_aposta: string;
  forma_pagamento: string;
  val_aposta: number;
  data_aposta: string; // Use string se você estiver trabalhando com datas no formato ISO
  id_cont: number;
  id_cli: number;
}

const ListBichos: FC = () => {
  const [bichos, setBichos] = useState<Bicho[]>([]);
  const router = useRouter();

  const fetchBichos = async () => {
    try {
      const response = await api.get<Bicho[]>('/bicho/selectAll');
      setBichos(response.data);
    } catch (error) {
      console.error('Erro ao buscar bichos:', error);
      alert('Falha ao carregar bichos.');
    }
  };

  useEffect(() => {
    fetchBichos();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/bicho/edit/${id}`); // Redireciona para a página de edição do bicho
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este bicho?");
    if (confirmDelete) {
      try {
        await api.delete(`/bicho/delete/${id}`); // Ajuste o endpoint se necessário
        alert("Bicho excluído com sucesso!");
        fetchBichos(); // Atualiza a lista de bichos
      } catch (error) {
        console.error("Erro ao excluir bicho:", error);
        alert("Falha ao excluir bicho.");
      }
    }
  };

  const handleCadastrar = () => {
    router.push('/bicho/create'); // Navega para a página de cadastro de bicho
  };

  return (
    <div className="inset-0 bg-gray-800 bg-opacity-5 backdrop-blur-md p-6">
      <h1 className="text-center text-white text-3xl font-bold mb-4">Lista de Bichos</h1>
      <Button variant="contained" color="primary" className="mb-4" onClick={handleCadastrar}>
        Cadastrar Bicho
      </Button>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo de Aposta</TableCell>
              <TableCell>Banca de Aposta</TableCell>
              <TableCell>Forma de Pagamento</TableCell>
              <TableCell>Valor da Aposta</TableCell>
              <TableCell>Data da Aposta</TableCell>
              <TableCell>ID Contraventor</TableCell>
              <TableCell>ID Cliente</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bichos.map((bicho) => (
              <TableRow key={bicho.id_bicho}>
                <TableCell>{bicho.id_bicho}</TableCell>
                <TableCell>{bicho.nome_bicho}</TableCell>
                <TableCell>{bicho.tipo_aposta}</TableCell>
                <TableCell>{bicho.banca_aposta}</TableCell>
                <TableCell>{bicho.forma_pagamento}</TableCell>
                <TableCell>{bicho.val_aposta}</TableCell>
                <TableCell>{new Date(bicho.data_aposta).toLocaleString()}</TableCell>
                <TableCell>{bicho.id_cont}</TableCell>
                <TableCell>{bicho.id_cli}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(bicho.id_bicho)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(bicho.id_bicho)}>
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

export default ListBichos;
