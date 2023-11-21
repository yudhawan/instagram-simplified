import React from 'react'
import { ModalWindowProps } from '../types'

function ModalWindow({isOpen,modalId,handleOpen,handleId,children}:ModalWindowProps) {
    const handleBlur=(e:React.MouseEvent<HTMLDivElement>)=>{
        const target = e.target as HTMLElement
        if(target.className==='modalProvider'){
            // @ts-ignore
            handleOpen(false)
            // @ts-ignore
            handleId('')
        }
    }
    
  return (
    <>
        {isOpen&&<div className='modalProvider' onClick={handleBlur}>
            {children}
        </div>}
    </>
  )
}

export default ModalWindow