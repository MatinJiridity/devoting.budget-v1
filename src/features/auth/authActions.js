import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = 'https://devotingversion02.onrender.com';

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const {data} = await axios.post(
        `${backendURL}/user/signup`,
        { email, password, firstName, lastName },
        config
      )
      localStorage.setItem('profile', JSON.stringify({ ...data }));
      localStorage.setItem('userToken', data.token)
      return data
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const signin = createAsyncThunk('auth/signin', async ({ email, password }, { rejectWithValue }) => {
  try {
    // configure header's Content-Type as JSON
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      `${backendURL}/user/signin`,
      { email, password },
      config
    )
    // store user's token in local storage
    localStorage.setItem('profile', JSON.stringify({ ...data }));
    localStorage.setItem('userToken', data.token)
    return data
  } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
})
