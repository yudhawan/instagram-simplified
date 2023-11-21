import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/appHooks'
import { Inputs, UserAuth } from '../../types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setSuccess, updateUser } from '../../redux/features/authSlice'

function Profil() {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state=>state.authReducer)
    const imgRef= useRef(null)
    const [img,setImg]=useState<any>(null)
    const [pict,setPict]=useState<String | null>(null)
    const {register,handleSubmit,setValue, formState: { errors }} = useForm<Inputs&UserAuth>()
    function handleImage(e:React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files
        if(file){ 
            setImg(file[0])
            let pic = file[0]?URL.createObjectURL(file[0]):''
            setPict(pic)
        }
    }
    const onSubmit: SubmitHandler<Inputs&UserAuth> = async(data) => {
        let reader = new FileReader();
        if(img){
            reader.readAsDataURL(img);
            reader.onload = async function () {
                const {id}= user
                data = { id,name:data.name, picture: reader.result }
                dispatch(updateUser(data))
            };
        }else{
            const {id}= user
            dispatch(updateUser({id,name:data.name}))
        }
    }
    useEffect(()=>{
        if(user.name) setValue('name',user.name)
        setTimeout(()=> dispatch(setSuccess(false)),3000)
    },[user])
    return (
        <main className="flex w-full h-screen flex-col lg:items-start pt-8 gap-8 lg:max-w-[630px] md:mx-24 justify-center">
            <form className='form self-center items-center' onSubmit={handleSubmit(onSubmit)}>
                
                <div className='rounded-full cursor-pointer relative group'>
                    <img src={`${pict?pict:user.picture?user.picture:'https://cdn0-production-images-kly.akamaized.net/ezWdf80cHKIo7QXw0MqXTBepozQ=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/1366748/original/027107800_1475757799-forum.wakfu.jpg'}`} alt="user" width={200} height={200} loading="lazy" className="rounded-full w-[200px] h-[200px]" />
                    
                </div>
                {/* @ts-ignore */}
                <span className='text-black font-bold text-sm  group-hover:block cursor-pointer' onClick={()=>imgRef.current.click()}>Change</span>
                <input ref={imgRef} className='hidden' type='file' accept="image/png, image/jpg, image/jpeg" onChange={handleImage}/>
                <input className='inputForm' placeholder='Username' disabled value={user.username} />
                <input className='inputForm' placeholder='Name'  {...register("name",{ required: true })} />
                <input type='submit' value='save' className='capitalize bg-green-400 w-full rounded-md font-semibold cursor-pointer' />
                {user.loading&&<span className=' w-fit px-2 rounded-sm font-semibold text-center text-gray-400'>Loading......</span>}
                {user.success&&<span className=' w-fit px-2 rounded-sm font-semibold text-center text-green-500'>Success 🎉🎊</span>}
            </form>
        </main>
    )
}

export default Profil