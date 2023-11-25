import { useMyToastStore } from './toast';
import { defineStore } from "pinia"

interface BotStatus {
    status: boolean
}

interface Command {
    name: string
    description: string
}

export const botStore = defineStore("bot", {
    state: () => ({
        started: false,
        commands: [] as Command[],
        disabled: [] as string[]
    }),
    actions: {
        async start(token: string){
            const { serviceUrl } = useRuntimeConfig().public
            try {
                const { data, error } = await useFetch("/start", {
                    baseURL: serviceUrl,
                    method: "GET",
                    headers: {
                        "Authorization": token
                    }
                })
                if (!error.value){
                    this.started = true;
                }
            }catch(e){
                console.error(e)
            }
        },
        async stop(token: string){
            try {
                const { serviceUrl } = useRuntimeConfig().public
                const { data, error } = await useFetch("/stop", {
                    baseURL: serviceUrl,
                    method: "GET",
                    headers: {
                        "Authorization": token
                    }
                })
                if (!error.value){
                    this.started = true;
                }
            }catch(e){
                console.error(e)
            }
        },
        async disableCommands(token: string, commands: string[]){
            const { serviceUrl } = useRuntimeConfig().public
            try {
                const { data, error } = await useFetch("/disable", {
                    baseURL: serviceUrl,
                    method: "POST",
                    body: JSON.stringify({ commands }),
                    headers: {
                        "content-type": "application/json",
                        "Authorization": token
                    }
                })
                if (!error.value){
                    this.disabled.push(...commands)
                    useMyToastStore().setToast("success", "command updated")
                }
            }catch(e){
                console.error(e)
            }
        },
        async enableCommands(token: string, commands: string[]){
            const { serviceUrl } = useRuntimeConfig().public
            try {
                const { data, error } = await useFetch("/enable", {
                    baseURL: serviceUrl,
                    method: "POST",
                    body: JSON.stringify({ commands }),
                    headers: {
                        "content-type": "application/json",
                        "Authorization": token
                    }
                })
                if (!error.value){
                    this.disabled = this.disabled.filter(v => !commands.includes(v))
                    useMyToastStore().setToast("success", "command updated")
                }
            }catch(e){
                console.error(e)
            }
        },
        async fetchStatus(token: string){
            const { serviceUrl } = useRuntimeConfig().public
            try {
                const { data, error } = await useFetch<BotStatus>("/status", {
                    baseURL: serviceUrl,
                    method: "GET",
                    headers: {
                        "Authorization": token
                    }
                })
                if (!error.value){
                    this.started = data.value!.status;
                }
            }catch(e){
                console.error(e)
            }
        },
        async fetchCommands(token: string){
            try {
                const { serviceUrl } = useRuntimeConfig().public
                const { data, error } = await useFetch<{commands: Command[]}>("/commands", {
                    baseURL: serviceUrl,
                    method: "GET",
                    headers: {
                        "Authorization": token
                    }
                })
                if (!error.value){
                    this.commands = data.value!.commands
                }
            }catch(e){
                console.error(e)
            }
        },
        async fetchDisabled(token: string){
            try {
                const { serviceUrl } = useRuntimeConfig().public
                const { data, error } = await useFetch<{commands: string[]}>("/disabled", {
                    baseURL: serviceUrl,
                    method: "GET",
                    headers: {
                        "Authorization": token
                    }
                })
                if (!error.value){
                    this.disabled = data.value!.commands
                }
            }catch(e){
                console.error(e)
            }
        }
    }
})