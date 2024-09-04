"use client";

import { FC, useState } from "react";
import axios from "axios";
import { TextField, Button, InputLabel, Select, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setForm({ ...form, [target.name]: target.value });
  };
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
    <div className="inset-0 bg-gray-800 bg-opacity-5 backdrop-blur-md p-6">
      <h1 className="text-center text-white text-3xl font-bold mb-4">Cadastro de Contraventor</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="nome_cont"
          value={form.nome_cont}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="CPF"
          name="cpf_cont"
          value={form.cpf_cont}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <Select
          labelId="tipo_cont-label"
          name="tipo_cont"
          value={form.tipo_cont}
          onChange={(e) => handleChange(e as React.ChangeEvent<{ name?: string; value: unknown }>)}
          fullWidth
          displayEmpty
          className="text-white"
        >
          <MenuItem value="" disabled>
            Selecione o Tipo
          </MenuItem>
          <MenuItem value="admin">Administrador</MenuItem>
          <MenuItem value="comum">Comum</MenuItem>
        </Select>
        <TextField
          label="Login"
          name="login_cont"
          value={form.login_cont}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Senha"
          name="senha_cont"
          type={showPassword ? "text" : "password"}
          value={form.senha_cont}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{
            style: { color: 'white' },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  style={{ color: 'white' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default CadastroContraventor;
