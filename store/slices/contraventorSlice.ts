import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Contraventor {
  id_cont: number;
  nome_cont: string;
  tipo_cont: string;
  login_cont: string;
  senha_cont: string;
  cpf_cont: string;
}

interface ContraventorState {
  contraventor: Contraventor[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: ContraventorState = {
  contraventor: [],
  status: 'idle',
  error: null,
};

// Thunks para ações assíncronas
export const fetchContraventor = createAsyncThunk(
  'contraventor/fetchContraventor',
  async () => {
    const response = await axios.get('/api/contraventor');
    return response.data;
  }
);

export const addContraventor = createAsyncThunk(
  'contraventor/addContraventor',
  async (contraventor: Contraventor) => {
    const response = await axios.post('/api/contraventor/create', contraventor);
    return response.data;
  }
);

export const updateContraventor = createAsyncThunk(
  'contraventor/updateContraventor',
  async ({ id, contraventor }: { id: number; contraventor: Contraventor }) => {
    const response = await axios.put(`/api/contraventor/edit/${id}`, contraventor);
    return response.data;
  }
);

const contraventorSlice = createSlice({
  name: 'contraventor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContraventor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContraventor.fulfilled, (state, action) => {
        state.status = 'idle';
        state.contraventor = action.payload;
      })
      .addCase(fetchContraventor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch contraventor';
      })
      .addCase(addContraventor.fulfilled, (state, action) => {
        state.contraventor.push(action.payload);
      })
      .addCase(updateContraventor.fulfilled, (state, action) => {
        const index = state.contraventor.findIndex(
          (contraventor) => contraventor.id_cont === action.payload.id_cont
        );
        if (index !== -1) {
          state.contraventor[index] = action.payload;
        }
      });
  },
});

export default contraventorSlice.reducer;
