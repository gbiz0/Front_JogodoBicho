"use client";
import { FC, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

interface ContraventorForm {
  nome_cont: string;
  tipo_cont: string;
  login_cont: string;
  senha_cont: string;
  cpf_cont: string;
}

const CadastroContraventor: FC = () => {
  const [form, setForm] = useState<ContraventorForm>({
    nome_cont: "",
    tipo_cont: "",
    login_cont: "",
    senha_cont: "",
    cpf_cont: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/contraventores", form);
      alert("Contraventor cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar contraventor:", error);
      alert("Erro ao cadastrar contraventor.");
    }
  };

  return (
    <div>
      <h1>Cadastro de Contraventor</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="nome_cont"
          value={form.nome_cont}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="CPF"
          name="cpf_cont"
          value={form.cpf_cont}
          onChange={handleChange}
          fullWidth
        />
        <InputLabel id="tipo_cont-label">Tipo</InputLabel>
        <Select
          labelId="tipo_cont-label"
          name="tipo_cont"
          value={form.tipo_cont}
          onChange={handleChange}
          label="Tipo"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="contraventor">Contraventor</MenuItem>
        </Select>
        <TextField
          label="Login"
          name="login_cont"
          value={form.login_cont}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Senha"
          name="senha_cont"
          type="password"
          value={form.senha_cont}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default CadastroContraventor;
