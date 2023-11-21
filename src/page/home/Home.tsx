import UserStory from '../../components/UserStory'
import UserFeed from '../../components/UserFeed'
import { useAppDispatch, useAppSelector } from '../../redux/appHooks'
import { useEffect } from 'react'
import { getFeeds } from '../../redux/features/feedSlice'

function Home() {
  const feeds = useAppSelector(state=>state.feedReducer.feedData)
  const user = useAppSelector(state=>state.authReducer)
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(getFeeds())
  },[user])
  return (
    <main className="flex w-full  flex-col lg:items-start lg:py-8 py-4 gap-8 lg:max-w-[630px] md:ml-40 lg:ml-24 lg:mr-24 xl:ml-0">
      <div className="storyContainer pb-4">
        <UserStory story={[]} user={user} />
      </div>
      <div className="w-full flex flex-col items-center gap-8">
        {
          feeds.map((val,index)=><UserFeed key={index} feed={{picture:val?.images, text:val?.text,user:val.user}}  />)
        }
        
      </div>
    </main>
  )
}

export default Home