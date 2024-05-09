import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit'
import { scoop } from '../constant'
import { toop } from '../constant'
import axios from 'axios';
const initialState = {
  tooping : toop,
  scoop:scoop,
   posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (data) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos',data)
  return response.data
})
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    update: (state,action) => {
        const { id, value } = action.payload;
      const updatedScoop = state.scoop.map(item => {
        if (item.id === id) {
          return { ...item, qu:value };
        }
        return item;
      });
      state.scoop = updatedScoop;
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { scoopQuntity, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer