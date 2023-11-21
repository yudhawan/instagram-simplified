import { CreateLogo, ExploreLogo, HeartLogo, HomeLogo, MessageLogo, MoreLogo, ReelsLogo, SearchLogo } from "../icons"

export const linkList = [
    {
        name:'Home',
        link:'/',
        active:{
            text:'activeNavText',
            icon:'activeNavIcon'
        },
        icon: HomeLogo
    },
    {
        name:'Search',
        active:{
            text:'activeNavText',
            icon:'activeNavIconSearch'
        },
        icon:SearchLogo
    },
    {
        name:'Explore',
        link:'/explore',
        active:{
            text:'activeNavText',
            icon:'activeNavIconSearch'
        },
        icon:ExploreLogo
    },
    {
        name:'Reels',
        link:'/reels',
        active:{
            text:'activeNavText',
            icon:'activeNavIconSearch'
        },
        icon:ReelsLogo
    },
    {
        name:'Messages',
        link:'/message',
        active:{
            text:'activeNavText',
            icon:'activeNavIconMessage'
        },
        icon:MessageLogo
    },
    {
        name:'Notifications',
        active:{
            text:'activeNavText',
            icon:'activeNavIcon'
        },
        icon:HeartLogo
    },
    {
        name:'Create',
        active:{
            text:'',
            icon:''
        },
        icon:CreateLogo
    },
    {
        name:'More',
        active:{
            text:'activeNavText',
            icon:'activeNavIconMore'
        },
        icon:MoreLogo
    },
]

export const getActiveLink = (url:string,button?:boolean)=>{
    if(button) {
        const {text,icon} =linkList.filter(val=> val.name===url).map(val=>val.active)[0]
        return {text,icon} 
    }
    const {text,icon} = linkList.filter(val=> val.link===url).map(val=>val.active)[0]
    return {text,icon} 
}