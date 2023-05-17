import { defineStore } from "pinia";
import { setLocalStorage,getLocalStorage,clearLocalStorage  }  from '@/utils/pageInteractive'
import { routes,asyncRoutes } from '@/router'

import { getuserInfo, } from '@/api/user'
const useUserStore = defineStore('user',{
    state:() => ({
       token:getLocalStorage('token')?getLocalStorage('token'):'',
       userInfo:getLocalStorage('userInfo')?getLocalStorage('userInfo'):'',
       routers:getLocalStorage('routers')?getLocalStorage('routers'):routes,
    }),
    

    actions:{
        setToken(payload){
            if(!payload) return 
            this.token = payload.token
            setLocalStorage("token",payload.token)
        },
        setUserInfo(payload){
            if(!payload) return 
            this.userInfo = payload.userInfo
            setLocalStorage("userInfo",payload.userInfo)
        },
        userLayout(payload){
            clearLocalStorage()
            this.token = '';
            this.userInfo={};
        },
        async getUserInfo(){
            try{
              let result =   await getuserInfo()
              console.log("userInfo",result)
              this.userInfo = result.data
              setLocalStorage("userInfo",result.data)
            }catch(e){
                console.log("e=>",userInfo)
            }
        },

        makupRouters(){
            this.routers = this.routers.concat(asyncRoutes)
            setLocalStorage("routers",this.routers)
        }

        
    }
})

export default useUserStore
