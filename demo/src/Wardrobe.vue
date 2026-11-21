<script setup lang="ts">
import {ref,computed} from 'vue'
import Art from './Art.vue'
import photo from './sample.jpg?inline'
import {categories,sampleItems,savedJacket,type Item} from './scenario'
const props=defineProps<{items:Item[]}>(),emit=defineEmits<{update:[Item[]],next:[]}>()
const view=ref<'list'|'photo'|'edit'|'saved'>('list'),fromPhoto=ref(false)
const drafts=ref(sampleItems.map(i=>({...i})))
const pending=computed(()=>drafts.value.filter(i=>!props.items.some(e=>e.id===i.id)))
const entry=ref<Item>({id:'',name:'',category:'shirt'})
function edit(i?:Item,from=false){fromPhoto.value=from;entry.value=i?{...i}:{id:crypto.randomUUID(),name:'',category:'shirt'};view.value='edit'}
function save(){const data={...entry.value,name:entry.value.name.trim()};if(!data.name)return
if(fromPhoto.value){drafts.value=drafts.value.map(i=>i.id===data.id?data:i);view.value='photo';return}
emit('update',[...props.items.filter(i=>i.id!==data.id),data]);view.value='list'}
function confirm(){emit('update',[...props.items,...pending.value]);view.value='list'}
</script>
<template><section class="content"><small class="kicker">TRAVEL WARDROBE</small><h1>{{ {list:'Your clothes.',photo:'Photo review.',edit:'Item details.',saved:'Saved clothes.'}[view] }}</h1>
<template v-if="view==='list'"><p class="subtext">Start with the pieces you might bring.</p><button class="photoentry" @click="view='photo'"><img :src="photo" alt=""><span><b>Use sample photo</b><small>T-shirt & trousers</small></span><i>↗</i></button><div class="pair"><button @click="edit()">＋ Add manually</button><button @click="view='saved'">Saved clothes</button></div>
<h3 class="sectitle">Trip candidates <small>{{ items.length }}</small></h3><p v-if="!items.length" class="hint">Confirmed items will appear here.</p><button class="row" v-for="i in items" :key="i.id" @click="edit(i)"><Art :kind="i.category"/><b>{{ i.name }}</b><small>Edit</small></button></template>
<template v-else-if="view==='photo'"><img class="reviewphoto" :src="photo" alt="A sage T-shirt and navy trousers"><p class="subtext">Sample recognition · Tap an item to edit.</p><button class="row" v-for="i in pending" :key="i.id" @click="edit(i,true)"><Art :kind="i.category"/><b>{{ i.name }}</b><small>Edit</small></button><p v-if="!pending.length">Both photo items are already added.</p></template>
<form v-else-if="view==='edit'" id="itemform" @submit.prevent="save"><label>Item name<input required v-model="entry.name" placeholder="e.g. Oxford shirt"></label><label>Category<select v-model="entry.category"><option v-for="(name,k) in categories" :value="k">{{ name }}</option></select></label><button v-if="!fromPhoto && items.some(i=>i.id===entry.id)" type="button" class="textbtn" @click="emit('update',items.filter(i=>i.id!==entry.id));view='list'">Remove from trip</button></form>
<template v-else><button class="row" :disabled="items.some(i=>i.id===savedJacket.id)" @click="emit('update',[...items,savedJacket]);view='list'"><Art kind="jacket"/><b>{{ savedJacket.name }}</b><small>{{items.some(i=>i.id===savedJacket.id)?'Added':'Add'}}</small></button></template></section>
<footer class="foot"><button v-if="view!=='list'" class="textbtn" @click="view=view==='edit'&&fromPhoto?'photo':'list'">Back</button><button v-if="view==='list'" class="primary" @click="emit('next')">View packing plan <span>→</span></button><button v-if="view==='photo'&&pending.length" class="primary" @click="confirm">Confirm {{pending.length}} items</button><button v-if="view==='edit'" class="primary" form="itemform" :disabled="!entry.name.trim()">Save item</button></footer></template>
