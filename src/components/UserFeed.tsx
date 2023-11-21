import { UserFeedType} from '../types'
import IconsComponent from './IconsComponent'
import { TripleDotIcon } from '../icons'
import {HeartLogo,CommentIcon,SendIcon,BookmarkIcon} from '../icons/'
import './index.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { defaultPicture } from '../common/constant'


type Comment = {
  text? : string
}
function UserFeed({feed }:UserFeedType) {
  const {
    register,
    handleSubmit,
  } = useForm<Comment>()
  const onSubmit: SubmitHandler<Comment> = (data) => console.log(data)
  return (
    <div className='userFeeds'>
        <div className='flex items-center justify-between '>
            <div className='flex items-center gap-4'>
                <img src={`${feed.user.picture?feed.user.picture:defaultPicture}`} alt="user" width={32} height={32} loading='lazy' className='rounded-full w-8 h-8' />
                <span className='font-semibold'>{feed.user.username}</span>
            </div>
            <button onClick={()=>{}}><IconsComponent name={TripleDotIcon} /></button>
        </div>
        <div className='flex flex-col gap-2'>
          <img className='!w-[468px] !max-h-[568px] object-contain border border-gray-200 rounded-sm' src={`${feed.picture?feed.picture:defaultPicture}`} loading='lazy' />
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-4'>
              <button><IconsComponent name={HeartLogo} className='' /></button>
              <button><IconsComponent name={CommentIcon} /></button>
              <button><IconsComponent name={SendIcon} /></button>
            </div>
            <button><IconsComponent name={BookmarkIcon} className='' /></button>
          </div>
          <div className='flex gap-2'>
            <span className='font-semibold text-sm'>{feed.user.username}</span>
            <p className='text-sm'>{feed.text}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder='Add a comment...' className='text-sm w-full focus:outline-none' {...register("text")} />
          </form>
        </div>
    </div>
  )
}

export default UserFeed