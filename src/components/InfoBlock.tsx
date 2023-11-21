import { useAppDispatch, useAppSelector } from '../redux/appHooks'
import { defaultPicture } from '../common/constant'
import './index.css'
import { useEffect } from 'react'
import { getRandomUsers } from '../redux/features/feedSlice'
function InfoBlock() {
  const user = useAppSelector(state=>state.authReducer)
  const users = useAppSelector(state=>state.feedReducer.users)
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(getRandomUsers())
  },[])
  return (
    <div className='infoBlockContainer'>
      <div className='flex items-center gap-3'>
        <img src={`${user.picture?user.picture:defaultPicture}`} width={44} height={44} className='rounded-full w-11 h-11' />
        <div className='flex flex-col'>
          <span className='text-sm font-semibold'>{user.username}</span>
          <span className='text-sm text-gray-500'>{user.name}</span>
        </div>
      </div>
      <span className='text-gray-500 font-semibold text-sm'>Suggested for you</span>
      {
        users.map((val,index)=><div className='flex items-center justify-between gap-3' key={index}>
          <img src={`${val.picture}`} alt="user" width={44} height={44} loading='lazy' className='rounded-full w-11 h-11' />
          <div className='flex flex-col w-full'>
            <span className='text-sm font-semibold'>{val.username}</span>
            <span className='text-sm text-gray-500'>{val.name}</span>
          </div>
          <button className='text-blue-400 font-semibold text-sm'>Follow</button>
        </div>)
      }
      
    </div>
  )
}

export default InfoBlock