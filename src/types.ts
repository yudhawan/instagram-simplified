export type IconProp = {
    name: string
    className?: string | undefined;
}

export type UserFeedType = {
    username?:string,
    picture?:string | ArrayBuffer | null,
    name?:string,
    feed:{
        picture:string,
        text?:string,
        user:Inputs
    }
}

export interface Inputs {
    username?: string
    name?:string
    password?: string
    picture?:string | ArrayBuffer | null
}

export interface UserAuth {
    id?:string
    token?: string
    loading?:boolean
    error?:string
    success?:boolean
}

export type ModalWindowProps = {
    isOpen?:boolean
    modalId?:string
    handleOpen?:(val:boolean)=> void
    handleId?:((val: string) => void) | undefined;
    children?:React.ReactNode
}