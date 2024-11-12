import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface DataState {
  data: Data[];
  editItem: Data | null;
}

const initialState: DataState = {
  data: JSON.parse(localStorage.getItem('data') || '[]'), // Load data from localStorage
  editItem: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<Data>) => {
      state.data.push(action.payload);
      localStorage.setItem('data', JSON.stringify(state.data));
    },
    deleteData: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
      localStorage.setItem('data', JSON.stringify(state.data));
    },
    setEditMode: (state, action: PayloadAction<Data | null>) => {
      state.editItem = action.payload;
    },
    editData: (state, action: PayloadAction<Data>) => {
      const index = state.data.findIndex(item => item.email === action.payload.email);
      if (index !== -1) {
        state.data[index] = action.payload;
        localStorage.setItem('data', JSON.stringify(state.data));
      }
    },
  },
});

export const { addData, deleteData, setEditMode, editData } = dataSlice.actions;
export default dataSlice.reducer;
