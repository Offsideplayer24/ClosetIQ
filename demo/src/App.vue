<script setup lang="ts">
import {ref} from 'vue'
import CityCard from './CityCard.vue'
import Wardrobe from './Wardrobe.vue'
import Pack from './Pack.vue'
import Art from './Art.vue'
import {samplePrompt,type Item} from './scenario'
const step=ref(0), draft=ref(''), dinner=ref<boolean|null>(null),items=ref<Item[]>([]),packed=ref<string[]>([])
function send(text:string){if(text.trim()){draft.value=text.trim();step.value=1}}
function reset(){step.value=0;draft.value='';dinner.value=null;items.value=[];packed.value=[]}
function update(next:Item[]){items.value=next;packed.value=packed.value.filter(id=>next.some(i=>i.id===id))}
</script>
<template><main class="phone">
<header><button v-if="step" class="icon" aria-label="Previous step" @click="step--">‹</button><span v-else class="brandmark">✳</span><b class="brand">Closet<span>IQ</span></b><button v-if="step" class="reset" @click="reset">Start over</button><span v-else class="demo">Offline demo</span></header>
<div class="progress" aria-label="Trip progress"><i v-for="n in 4" :class="{active:n<=step+1}"></i></div>
<template v-if="!step"><section class="content greeting"><div class="heroart"><Art kind="bag"/></div><small class="kicker">TRIP CHAT</small><h1>Where to?</h1><div class="bubble">Tell me where you’re headed and what’s on your calendar. Let’s pack for it.</div>
<button class="suggestion" @click="send(samplePrompt)"><small>TRY THIS TRIP <span>↗</span></small>{{ samplePrompt }}</button></section>
<form class="foot" @submit.prevent="send(draft)"><label class="composer"><textarea aria-label="Describe your trip" rows="1" placeholder="Describe your trip…" v-model="draft" @keydown.enter.exact.prevent="send(draft)"></textarea><button aria-label="Send trip" :disabled="!draft.trim()">↑</button></label><small class="note">Demo itinerary · New York wedding weekend</small></form></template>
<template v-else-if="step===1"><section class="content"><CityCard :dinner="dinner" @choose="dinner=$event"/></section><footer class="foot"><button class="primary" :disabled="dinner===null" @click="step=2">Confirm trip <span>→</span></button></footer></template>
<Wardrobe v-else-if="step===2" :items="items" @update="update" @next="step=3"/>
<Pack v-else :items="items" :packed="packed" :dinner="!!dinner" @update="update" @packed="packed=$event" @wardrobe="step=2"/>
</main></template>
