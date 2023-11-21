import { useEffect } from 'react'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Home from './page/home/Home'
import Reels from './page/reels/Reels'
import Explore from './page/explore/Explore'
import Navigation from './components/Navigation'
import InfoBlock from './components/InfoBlock'
import AuthProvider, { PrivateRoute } from './AuthProvider'
import { useAppDispatch, useAppSelector } from './redux/appHooks'
import { auth_status } from './redux/features/authSlice'
import Profil from './page/profil/Profil'
import ModalProvider from './common/ModalProvider'
import LoaderMain from './components/LoaderMain'

// const socket = io(import.meta.env.VITE_BASE_URL)
function App() {
  const token =useAppSelector(state=>state.authReducer.token)
  const loadingFeed =useAppSelector(state=>state.feedReducer.loading)
  const dispatch = useAppDispatch()
  const currentToken = localStorage.getItem('__user')
  useEffect(()=>{
    if(token !== currentToken) dispatch(auth_status())
  },[])
  return (
    <div className='flex w-full  flex-row '>
      
        <Router>
          {loadingFeed&&<LoaderMain/>}
          <ModalProvider>
          <AuthProvider>
          <Navigation/>
          </AuthProvider>
          <div className='flex w-full  justify-center lg:ml-[18%]'>
            <Routes location={location} key={location.pathname}>
              <Route element={<PrivateRoute/>}>
                <Route path='/' element={<Home/>} />
                <Route path='/reels' element={<Reels/>} />
                <Route path='/explore' element={<Explore/>} />
                <Route path='/profil' element={<Profil/>} />
              </Route>
            </Routes>
            <AuthProvider>
              <InfoBlock/>
            </AuthProvider>
          </div>
          </ModalProvider>
        </Router>
    </div>
  )
}

export default App
