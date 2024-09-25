"use client";

import { FC, useState } from "react";
import {
  TextField,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import api from "../../../utils/axios";
import axios from "axios";

const CadastroCliente: FC = () => {
  const [nome_cli, setNomeCli] = useState("");
  const [logradouro_cli, setLogradouroCli] = useState("");
  const [bairro_cli, setBairroCli] = useState("");
  const [cidade_cli, setCidadeCli] = useState("");
  const [estado_cli, setEstadoCli] = useState("");
  const [cep_cli, setCepCli] = useState("");
  const [numero_cli, setNumeroCli] = useState(0);
  const [cpf_cli, setCpfCli] = useState("");
  const [rg_cli, setRgCli] = useState("");
  const router = useRouter();

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    const novoCliente = {
      nome_cli,
      logradouro_cli,
      bairro_cli,
      cidade_cli,
      estado_cli,
      cep_cli,
      numero_cli,
      cpf_cli,
      rg_cli,
    };

    try {
      const response = await api.post("/api/cliente/create", novoCliente);
      if (response.status === 200) {
        alert("Cliente criado com sucesso!");
        router.push("/cliente/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao criar cliente:", error.response?.data || error);
        alert("Falha ao criar cliente: " + (error.response?.data?.message || "Erro desconhecido."));
      } else {
        console.error("Erro inesperado:", error);
        alert("Falha ao criar cliente: Erro inesperado.");
      }
    }
  };

  return (
    <div className="inset-0 bg-gray-800 bg-opacity-5 backdrop-blur-md p-6">
      <h1 className="text-center text-white text-3xl font-bold mb-4">
        Cadastro de Cliente
      </h1>
      <form onSubmit={handleCreate}>
        <TextField
          label="Nome"
          value={nome_cli}
          onChange={(e) => setNomeCli(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <TextField
          label="Logradouro"
          value={logradouro_cli}
          onChange={(e) => setLogradouroCli(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <TextField
          label="Bairro"
          value={bairro_cli}
          onChange={(e) => setBairroCli(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <TextField
          label="Cidade"
          value={cidade_cli}
          onChange={(e) => setCidadeCli(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <TextField
          label="Estado"
          value={estado_cli}
          onChange={(e) => setEstadoCli(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <TextField
          label="CEP"
          value={cep_cli}
          onChange={(e) => setCepCli(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <TextField
          label="Número"
          type="number"
          value={numero_cli}
          onChange={(e) => setNumeroCli(Number(e.target.value))}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <TextField
          label="CPF"
          value={cpf_cli}
          onChange={(e) => setCpfCli(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <TextField
          label="RG"
          value={rg_cli}
          onChange={(e) => setRgCli(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default CadastroCliente;
