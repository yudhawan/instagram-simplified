import { SubmitHandler, useForm } from 'react-hook-form'
import { Inputs } from '../../types'

import './login.css'
import { useAppDispatch, useAppSelector } from '../../redux/appHooks'
import { userLogin } from '../../redux/features/authSlice'

function Login() {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state=>state.authReducer.error)
    const {register,handleSubmit, formState: { errors }} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        dispatch(userLogin(data))
    }
    return (
        <div className='w-full h-screen flex justify-center items-center -ml-[18%]'>
        <div className='mainContainer'>
            <img src={'/logo.png'} alt='logo' width={175} height={50}   />
            <span className='text-sm mb-2 mt-4'>Login or create an account</span>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <input className='inputForm' placeholder='Username' {...register("username",{ required: true })} />
            <input type='password' className='inputForm' placeholder='Password' {...register("password", { required: true })} />
            {errors.username && <span className='errorInput'>Input useername please</span>}
            {errors.password && <span className='errorInput'>Input password please</span>}
            {error&&<span className='errorInput'>{error}</span>}

            <input className='submit' type="submit" value="Log in" />
            </form>
        </div>
        </div>
    )
}

export default Login