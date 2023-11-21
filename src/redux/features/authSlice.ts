import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Inputs, UserAuth } from '../../types'
import { RootState } from '../store'
type UserType = UserAuth&Inputs
const initialState: UserType = {
    id:'',
    token:'',
    username:'',
    name:'',
    picture:'',
    loading:false,
    error:'',
    success:false
}

export const authServices = createAsyncThunk("getUsers", async (state,{getState}) => {
    
    let {data} = await axios({
        method: 'GET',
        url:import.meta.env.VITE_BASE_URL+'/authservices',
        params:{token:localStorage.getItem('__token')}
    }) 
    if(data.message==='expired') {
        localStorage.removeItem('__token')
        localStorage.removeItem('__username')
        localStorage.removeItem('__name')
        localStorage.removeItem('__picture')
        localStorage.removeItem('__id')
        return {token:''}
    }
    localStorage.setItem('__token', data.token)
    const nama = localStorage.getItem('__name')
    return {token:data?.token,username:data?.username,nama:nama}
    
})
export const userLogin = createAsyncThunk("login", async (data:Inputs) => {
    const result = await axios.post(import.meta.env.VITE_BASE_URL+'/login', {data})
    localStorage.setItem('__token', result.data?.token)
    localStorage.setItem('__username', result.data?.username)
    result.data?.name!==null?localStorage.setItem('__name', result.data?.name):''
    localStorage.setItem('__id', result.data?.id)
    result.data?.picture!==null?localStorage.setItem('__picture', result.data?.picture):''
    return result.data
})
export const updateUser = createAsyncThunk("update", async (data:UserType) => {
    const result = await axios.post(import.meta.env.VITE_BASE_URL+'/updateUser', {data})
    result.data?.name!==null?localStorage.setItem('__name', result.data?.name):''
    result.data?.picture!==null?localStorage.setItem('__picture', result.data?.picture):''
    return result.data
})
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth_status: (state) => {
        state.token = '';
    },
    logout: (state) => {
        localStorage.removeItem('__token')
        localStorage.removeItem('__username')
        localStorage.removeItem('__name')
        localStorage.removeItem('__picture')
        localStorage.removeItem('__id')
        state.token = ''
        window.location.replace('/')
    },
    update_stat:(state)=>{
        state.id= localStorage.getItem('__id') || ''
        state.token = localStorage.getItem('__token') || ''
        state.username = localStorage.getItem('__username') || ''
        state.name = localStorage.getItem('__name') || ''
        state.picture = localStorage.getItem('__picture') || ''
    },
    setSuccess:(state,action)=>{
        state.success=action.payload.success
    }
  },
  extraReducers:builder=>{
    builder.addCase(authServices.pending,(state)=>{
        state.loading=true
        state.error=''
    }),
    builder.addCase(authServices.fulfilled,(state,action)=>{
        state.token=action.payload.token
        state.username=action.payload.username
        state.loading=false
    }),
    builder.addCase(authServices.rejected,(state)=>{
        state.token=''
        state.username=''
        state.loading=false
        state.error=''
    }),
    builder.addCase(userLogin.pending,(state)=>{
        state.loading=true
        state.error=''
    }),
    builder.addCase(userLogin.fulfilled,(state,action)=>{
        state.id=action.payload.id
        state.token = action.payload.token
        state.username = action.payload.username
        state.name = action.payload.name
        state.picture = action.payload.picture
        state.error=action.payload.error
        state.loading=false
    }),
    builder.addCase(userLogin.rejected,(state)=>{
        state.loading=false
        state.error=''
    }),
    builder.addCase(updateUser.pending,(state)=>{
        state.loading=true
        state.error=''
    }),
    builder.addCase(updateUser.fulfilled,(state,action)=>{
        state.loading=false
        state.name=action.payload.name
        state.picture=action.payload.picture
        state.success=true
    })
  }
})
export const {auth_status,logout,update_stat,setSuccess}= authSlice.actions
export default authSlice.reducer