<template>
    <div>
        <div class="container mx-auto px-4 pt-10">
            <div class="mockup-code">
                <div class="h-[30vh] lg:h-[22vh] overflow-y-auto">
                    <pre data-prefix="~" v-for="(message, index) in logs" :key="index"><code>{{ message }}</code></pre>
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

const logs = ref<string[]>([])
const token = useCookie("sb-access-token")
const runtimeConfig = useRuntimeConfig()
const botState = botStore()

onMounted(()=> {
    botState.fetchStatus(token.value!)
    const socket = new WebSocket("ws://" + runtimeConfig.public.serviceUrl!.split("://")[1] + "/ws?token=" + token.value)
    
    socket.addEventListener("open", () => {
        console.log("WebSocket connection opened")
        logs.value.push("Start listening log")
    })
    
    socket.addEventListener("close", () => {
        console.log("WebSocket connection closed")
    })
    
    socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data)
        switch (data.type) {
            case "log":
                logs.value.push(data.value)
        }
    })
})
</script>