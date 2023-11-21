import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Inputs } from '../../types'

type FeedsProps = {images:string,text:string,user:Inputs}
export interface CounterState {
    feedData:FeedsProps[]
    loading?:boolean
    error?:string
    success?:string
    users:Inputs[]
}

const initialState: CounterState = {
    feedData:[],
    loading:false,
    error:'',
    success:'',
    users:[]
}
export const getFeeds = createAsyncThunk('getFeeds',async()=>{
  const result = await axios.get(import.meta.env.VITE_BASE_URL+'/getFeeds')
  return result.data
})
export const getRandomUsers = createAsyncThunk('getRandomUsers',async()=>{
  const result = await axios.get(import.meta.env.VITE_BASE_URL+'/getRandomUsers')
  return result.data
})
export const addFeeds = createAsyncThunk('addFeed',async(data:object)=>{
  const result = await axios.post(import.meta.env.VITE_BASE_URL+'/addFeed', {data})
  return result.data
})
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setSuccess:(state,action)=>{
      state.success=action.payload
  }
  },
  extraReducers:builder=>{
    builder.addCase(addFeeds.pending,(state)=>{
      state.loading=true
      state.success=''
    }),
    builder.addCase(addFeeds.fulfilled,(state,action)=>{
      state.loading=false
      state.success=action.payload.msg
      state.feedData=action.payload.feeds
    }),
    builder.addCase(addFeeds.rejected,(state)=>{
      state.loading=false
      state.error='Error'
      state.success=''
    }),
    builder.addCase(getFeeds.pending,(state)=>{
      state.loading=true
      state.success=''
    }),
    builder.addCase(getFeeds.fulfilled,(state,action)=>{
      state.loading=false
      state.feedData=action.payload.feedsData
    }),
    builder.addCase(getRandomUsers.pending,(state)=>{
      state.loading=true
      state.success=''
    }),
    builder.addCase(getRandomUsers.fulfilled,(state,action)=>{
      state.loading=false
      state.users=action.payload.users
    })
  }
})

export const { setSuccess } = feedSlice.actions

export default feedSlice.reducer