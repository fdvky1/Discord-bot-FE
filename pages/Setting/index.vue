<template>
  <div class="py-10 px-6">
    <div class="sm:max-w-[50rem] flex flex-col items-center mx-auto pt-10 rounded-md bg-base-100 min-h-[calc(100vh-14rem)]">
      <div class="w-auto">
        <div class="w-full flex flex-col sm:flex-row gap-2">
          <div class="form-control w-full max-w-xs lg:max-w-[27rem]">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="text" :placeholder="user!.email" class="input input-bordered w-full" disabled />
          </div>
          <div class="form-control w-full max-w-xs lg:max-w-[27rem]">
            <label class="label">
              <span class="label-text">Discord bot token</span>
            </label>
            <div class="join">
              <div>
                <input :type="showPassword ? 'text' : 'password'" placeholder="Type here" class="input input-bordered w-full join-item" v-model="botToken" />
              </div>
              <div>
                <button type="button" class="btn join-item" @click="showPassword = !showPassword">
                  <ClientOnly>
                    <font-awesome-icon icon="fa-regular fa-eye-slash" class="max-h-5" v-if="showPassword"/>
                    <font-awesome-icon icon="fa-regular fa-eye" class="max-h-5" v-else/>
                  </ClientOnly>
                </button>
              </div>
            </div>
          </div>
          <button type="button" class="btn w-full max-w-xs mt-1.5 sm:mt-auto sm:max-w-[4rem] lg:max-w-[6rem]" @click="setBotToken">Save</button>
        </div>
        <div class="w-full mt-4">
          <div class="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" :checked="showCmds" class="hidden"/> 
            <div class="collapse-title text-sm flex items-center justify-between pl-4 pr-6 font-medium" @click="showCmds = !showCmds">
              <span>
                Command setting
              </span>
              <ClientOnly>
                <font-awesome-icon icon="fa-solid fa-chevron-down" class="max-h-5" v-if="showCmds"/>
                <font-awesome-icon icon="fa-solid fa-chevron-right" class="max-h-5" v-else/>
              </ClientOnly>
            </div>
            <div class="collapse-content"> 
              <ul>
                <li v-for="(item, index) in botState.commands" :key="index">
                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <div>
                        <h1 class="font-medium text-base">{{ item.name }}</h1>
                        <p class="text-xs">{{ item.description }}</p>
                      </div> 
                      <input type="checkbox" class="toggle" :checked="!botState.disabled.includes(item.name)" @change="botState[botState.disabled.includes(item.name) ? 'enableCommands': 'disableCommands'](token!, [item.name])"/>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from "@/types/database.types"
import { botStore } from "~/stores/bot";
const user = useSupabaseUser()
const client = useSupabaseClient<Database>()

const showPassword = ref<boolean>(false)
const showCmds = ref<boolean>(false)
const token = useCookie("sb-access-token")
const botToken = ref<string>("")
const botState = botStore()

const getUserData = async () => {
  const {data, error} = await client.from("users").select().eq("id", user.value!.id)
  if (!error) {
    botToken.value = data[0].bot_token!
  }
}

const setBotToken = async () => {
  const { error } = await client.from("users").update({ bot_token: botToken.value }).eq("id", user.value!.id)
  if (!error) {
    useMyToastStore().setToast("success", "Discord bot token already updated")
  }
}

getUserData()
botState.fetchCommands(token.value!)
botState.fetchDisabled(token.value!)
</script>