"use client";

import { FC, useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import api from "../../../utils/axios";
import axios from "axios";

const CadastroContraventor: FC = () => {
  const [nome_cont, setNomeCont] = useState("");
  const [tipo_cont, setTipoCont] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [cpf_cont, setCpfCont] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    const novoContraventor = {
      nome_cont,
      tipo_cont,
      login,
      password,
      cpf_cont,
      accountNonLocked: true,
      authorities: [{ authority: "USER" }],
      username: login,
      accountNonExpired: true,
      credentialsNonExpired: true,
      enabled: true,
    };

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await api.post(
        "/contraventor/create",
        novoContraventor,
        { headers }
      );
      if (response.status === 200) {
        alert("Contraventor criado com sucesso!");
        router.push("/contraventor/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao criar contraventor:",
          error.response?.data || error
        );
        alert(
          "Falha ao criar contraventor: " +
            (error.response?.data?.message || "Erro desconhecido.")
        );
      } else {
        console.error("Erro inesperado:", error);
        alert("Falha ao criar contraventor: Erro inesperado.");
      }
    }
  };

  return (
    <div className="inset-0 bg-gray-800 bg-opacity-5 backdrop-blur-md p-6">
      <h1 className="text-center text-white text-3xl font-bold mb-4">
        Cadastro de Contraventor
      </h1>
      <form onSubmit={handleCreate}>
        <TextField
          label="Nome"
          value={nome_cont}
          onChange={(e) => setNomeCont(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <TextField
          label="CPF"
          value={cpf_cont}
          onChange={(e) => setCpfCont(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <InputLabel id="tipo_cont-label" style={{ color: "white" }}>
          Tipo
        </InputLabel>
        <Select
          labelId="tipo_cont-label"
          value={tipo_cont}
          onChange={(e) => setTipoCont(e.target.value as string)}
          fullWidth
          displayEmpty
          className="text-white mb-4"
        >
          <MenuItem value="" disabled>
            Selecione o Tipo
          </MenuItem>
          <MenuItem value="admin">Administrador</MenuItem>
          <MenuItem value="comum">Comum</MenuItem>
        </Select>
        <TextField
          label="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          className="mb-4"
        />
        <TextField
          label="Senha"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: { color: "white" },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  style={{ color: "white" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="mb-4"
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default CadastroContraventor;
