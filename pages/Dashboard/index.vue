<template>
    <div>
        <div class="container mx-auto px-4 pt-4">
            <div class="mockup-code bg-neutral-content text-black dark:bg-base-100 dark:text-slate-100">
                <div class="h-[30vh] lg:h-[22vh] overflow-y-auto" ref="logsContainer">
                    <pre data-prefix="~" v-for="(message, index) in botState.logs" :key="index"><code>{{ message }}</code></pre>
                </div>
            </div>
            <div class="flex mt-4 gap-1">
                <button type="button" class="btn min-w-[7rem] capitalize" :disabled="!botState.started" @click="botState.stop(token!)">stop</button>
                <button type="button" class="btn min-w-[7rem] capitalize" @click="botState.start(token!)">{{ botState.started ? 'restart' : 'start'}}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { botStore } from "~/stores/bot"

const token = useCookie("sb-access-token")
const runtimeConfig = useRuntimeConfig()
const botState = botStore()
const logsContainer = ref<HTMLDivElement | null>(null)

let socket: WebSocket

onMounted(async()=> {
    await botState.fetchStatus(token.value!)
    socket = new WebSocket(runtimeConfig.public.serviceUrl!.replace("http", "ws") + "/ws?token=" + token.value)
    
    socket.addEventListener("open", () => {
        botState.putLog(botState.started ? "Start listening log" : "Discord bot is offline")
        console.log("WebSocket connection opened")
    })
    
    socket.addEventListener("close", () => {
        botState.putLog("Disconnected from logs service")
        console.log("WebSocket connection closed")
    })
    
    socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data)
        switch (data.type) {
            case "log":
                botState.putLog(data.value)
                if (logsContainer.value) {
                    logsContainer.value.scrollTop = logsContainer.value.scrollHeight;
                }
            break
        }
    })

    if (logsContainer.value) {
        logsContainer.value.scrollTop = logsContainer.value.scrollHeight;
    }
})

onUnmounted(()=> {
    socket.close()
})


</script>