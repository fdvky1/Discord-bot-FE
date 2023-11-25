import { defineStore } from 'pinia'

export const useMyToastStore = defineStore("toast",{
  state: () => ({
    message: "",
    type: ""
  }),
  actions: {
    setToast(type: string = "info", message :string){
      this.message = message
      this.type = type
      setTimeout(()=> {
        this.message = ""
        this.type = ""
      }, 3000)
    }
  }
})
