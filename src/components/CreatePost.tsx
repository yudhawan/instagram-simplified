import React, { useContext, useEffect, useRef, useState } from 'react'
import IconsComponent from './IconsComponent'
import { BackIcon, PicturePostIcon } from '../icons'
import { defaultPicture } from '../common/constant'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../redux/appHooks'
import { addFeeds, setSuccess } from '../redux/features/feedSlice'
import { ModalContext } from '../common/ModalContex'
type feeProps={
    text:string
}
function CreatePost() {
    const dispatch = useAppDispatch()
    // @ts-ignore
    const {handleOpen}=useContext(ModalContext)
    const userId = useAppSelector(state=>state.authReducer.id)
    const success = useAppSelector(state=>state.feedReducer.success)
    const imgRef = useRef(null)
    const [next,setNext]=useState(false)
    const [img,setImg]=useState<any>(null)
    const [pict,setPict]=useState<string | null>(null)
    const {register,handleSubmit} = useForm<feeProps>()
    function handleImage(e:React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files
        if(file){ 
            setImg(file[0])
            let pic = file[0]?URL.createObjectURL(file[0]):''
            setPict(pic)
        }
    }
    const onSubmit: SubmitHandler<feeProps> = async(data) => {
        let reader = new FileReader();
        if(img){
            reader.readAsDataURL(img);
            reader.onload = async function () {
                const newData = {...data,images:reader.result,userId:userId}
                dispatch(addFeeds(newData))
            };
        }
        return
    }
    useEffect(()=>{
        if(success==='Success') {
            handleOpen(false)
            dispatch(setSuccess(''))
        }
    },[success])
  return (
    <div className='modalContainer'>
        <header className={`headerPost ${pict?'!justify-between px-3':''}`}>
            {pict&&<span onClick={()=>{
                setNext(false)
                setPict('')
                setImg(null)
                }} className='cursor-pointer'><IconsComponent name={BackIcon} /></span>}
            <span>Create new post</span>
            {(pict && !next)&&<span className='text-blue-500 font-semibold text-sm cursor-pointer' onClick={()=>setNext(true)}>Next</span>}
            {next&&<button className='text-blue-500 font-semibold text-sm cursor-pointer' onClick={handleSubmit(onSubmit)}>Post</button>}
        </header>
        <form className='modalbody relative' onSubmit={handleSubmit(onSubmit)}>
            {
                !pict?<>
                    <IconsComponent name={PicturePostIcon} />
                    {/* @ts-ignore */}
                    <button onClick={()=>imgRef.current.click()} className='text-sm font-semibold bg-blue-500 px-4 py-1 rounded-md text-white'>Select your picture</button>
                    <input ref={imgRef} className='inputForm hidden' type='file' accept="image/png, image/jpg, image/jpeg" onChange={handleImage}/></>
                    :<img src={pict?pict:defaultPicture} className='w-full h-[500px] object-contain' />
            }
            {
                next&&
                <div className={`flex flex-col w-96 h-full absolute right-0 top-0 border-r border-gray-400 shadow-md bg-white`}>
                    <textarea {...register('text')} placeholder='Write a caption' className='p-2  focus:outline-none text-sm text-gray-500' />
                </div>
            }
        </form>
    </div>
  )
}

export default CreatePost