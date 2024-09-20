'use client';

import { FC, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import api from '../../../../utils/axios';

interface Contraventor {
  id_cont: number;
  nome_cont: string;
  tipo_cont: string;
  login: string;
  cpf_cont: string;
}

const EditContraventor: FC<{ params: { id: string } }> = ({ params }) => {
  const [contraventor, setContraventor] = useState<Contraventor | null>(null);
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

  const fetchContraventor = async () => {
    try {
      const response = await api.get(`/contraventor/select/${params.id}`);
      setContraventor(response.data);
      setNomeCont(response.data.nome_cont);
      setTipoCont(response.data.tipo_cont);
      setLogin(response.data.login);
      setCpfCont(response.data.cpf_cont);
    } catch (error) {
      console.error('Erro ao buscar contraventor:', error);
      alert('Falha ao carregar contraventor.');
    }
  };

  useEffect(() => {
    fetchContraventor();
  }, []);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedContraventor = {
      ...contraventor,
      nome_cont,
      tipo_cont,
      login,
      password,
      cpf_cont,
    };

    try {
      await api.post(`/contraventor/edit/${params.id}`, updatedContraventor);
      alert('Contraventor atualizado com sucesso!');
      router.push('/contraventor/');
    } catch (error) {
      console.error('Erro ao atualizar contraventor:', error);
      alert('Falha ao atualizar contraventor.');
    }
  };

  if (!contraventor) return <p>Carregando...</p>;

  return (
    <div className="inset-0 bg-gray-800 bg-opacity-5 backdrop-blur-md p-6">
      <h1 className="text-center text-white text-3xl font-bold mb-4">Editar Contraventor</h1>
      <form onSubmit={handleUpdate}>
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
          Atualizar
        </Button>
      </form>
    </div>
  );
};

export default EditContraventor;
