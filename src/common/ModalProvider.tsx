import React, { useState } from 'react'
import { ModalContext } from './ModalContex'

function ModalProvider({children}:{children:React.ReactNode}) {

    const [isOpen,setIsOpen] = useState(false)
    const [modalId,setModalId] = useState('')
    const handleOpen = (val:boolean)=> setIsOpen(val)
    const handleId = (val:string)=> setModalId(val)
  return <ModalContext.Provider value={{
    isOpen,
    modalId,
    handleId,
    handleOpen
  }}>
    
        {children}
  </ModalContext.Provider>
}

export default ModalProvider