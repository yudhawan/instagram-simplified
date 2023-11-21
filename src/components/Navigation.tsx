import { useEffect, useState } from 'react'
import IconsComponent from './IconsComponent'
import { getActiveLink, linkList } from '../services/link'
import { InstagramIcon } from '../icons'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/appHooks'
import { logout, update_stat } from '../redux/features/authSlice'
import { defaultPicture } from '../common/constant'

import CreatePost from './CreatePost'
import { ModalConsumer } from '../common/ModalContex'
import ModalWindow from './ModalWindow'
function Navigation() {
  const user = useAppSelector(state=>state.authReducer)
  const path = useLocation()
  const dispatch = useAppDispatch()
  const [active,setActive]=useState('')
  const [pathname,setPathname]=useState('')
  function handleActive(id:string){
    if(active===id) return setActive('')
    return setActive(id)
  }
  function logoutHandle() {
    dispatch(logout())   
  }
  function handleButtonActive({name}:{name:string}){
    setPathname('')
    setActive(name)
  }
  useEffect(()=>{
    setActive('')
    setPathname(path.pathname)
    dispatch(update_stat())
  },[path])
  return (
    <div className='navigationContainer fixed'>
        <Link to={'/'} className='w-fit px-3 pt-[25px] pb-4 lg:block hidden'><img src={'/logo.png'} loading='lazy'  width={103} height={29} alt='logo' /></Link>
        <Link to={'/'} className='self-center items-center gap-4  rounded-xl lg:hidden md:block hidden pt-7 pb-4'><IconsComponent name={InstagramIcon} className={`group-hover:transition ease-in-out group-hover:scale-105 w-6 h-6 `} /></Link>
        <nav className='md:flex md:flex-col md:gap-2 md:justify-normal relative h-full flex gap-2 w-full justify-between px-4'>
            {
                linkList.filter(val=> val.name!=='More').map((val,index)=>{
                  if(val.link) return <Link to={val.link} className={`${(val.name==='Create'||val.name==='Notifications'||val.name==='Explore')?'hidden':''} navList group`} key={index}>
                      <IconsComponent name={val.icon} className={`${pathname===val.link?getActiveLink(pathname).icon:''} group-hover:transition ease-in-out group-hover:scale-105`} />
                      <span className={`${pathname===val.link?getActiveLink(pathname).text:''}`+' text-black lg:block hidden'} >{val.name}</span>
                  </Link>
                  else return <ModalConsumer key={index}>
                    {({handleOpen,handleId}:any)=><button className={`${(val.name==='Create'||val.name==='Notifications'||val.name==='Explore')?'hidden':''} navList group`} onClick={()=> {
                      handleButtonActive({name:val.name})
                      handleOpen(true)
                      handleId(val.name)
                      }}>
                        <IconsComponent name={val.icon} className={`${active===val.name?getActiveLink(active,true).icon:''} group-hover:transition ease-in-out group-hover:scale-105`} />
                        <span data-testid="textLink" className={`${active===val.name?getActiveLink(active,true).text:''}`+' text-black lg:block hidden'} >{val.name}</span>
                    </button>}
                  </ModalConsumer>
                  
                })
            }
            <Link to={'/profil'} className='navList group'>
                <img src={`${user.picture?user.picture:defaultPicture}`} width={24} height={24} alt='user' className='rounded-full w-6 h-6' />
                <span className={' text-black lg:block hidden'} >Profil</span>
            </Link>
            {
                linkList.filter(val=> val.name==='More').map((val,index)=><button onClick={()=> {
                  handleButtonActive({name:val.name})
                  handleActive(val.name)
                  }} className='navList group absolute bottom-0 hidden' key={index}>
                    <IconsComponent name={val.icon} className={`${active===val.name?getActiveLink(active,true).icon:''} group-hover:transition ease-in-out group-hover:scale-105`} />
                    <span className={`${active===val.name?getActiveLink(active,true).text:''}`+' text-black lg:block hidden'} >{val.name}</span>
                    <span className='relative'>
                      {active===val.name?<div onClick={logoutHandle} className='absolute -right-10 -top-12 bg-red-200 w-fit px-2 rounded-md text-red-500 text-sm font-bold'>Logout</div>:<></>}
                    </span>
                </button>)
            }
            
        </nav>
        <ModalConsumer>
          {
            ({modalId,isOpen,handleOpen,handleId}:any)=>{
              return<>
            {
              modalId==='Create'&&
              <ModalWindow
              children={<CreatePost/>}
              isOpen={isOpen}
              handleOpen={handleOpen}
              handleId={handleId}
              />
            }</>}
          }
        </ModalConsumer>
    </div>
  )
}

export default Navigation