import { defineStore } from "pinia";



/*
    param:
        sidebar:true/false  展开/收起
        device:'desktop/mobile' pc端 移动端
*/
const useAppInfoStore = defineStore("appInfo", {
  state: () => ({
    sidebar: {
      opened: false,
      withoutAnimation: false,
    },
    device: 'desktop',
    size: 'medium'
  }),

  getters:{
    getSidebar(){
      return this.sidebar
    }
  },
  actions:{
    changeSidebarOpened(payload){
      // console.log("payload=>",payload)
        this.sidebar.opened = !this.sidebar.opened
    }


  }
});

export default useAppInfoStore
