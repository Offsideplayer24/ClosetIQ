<script setup lang="ts">
import {computed,ref} from 'vue'
import Art from './Art.vue'
import {categories,plan,type Item,type Category} from './scenario'
const props=defineProps<{items:Item[],dinner:boolean,packed:string[]}>(),emit=defineEmits<{update:[Item[]],packed:[string[]],wardrobe:[]}>()
const result=computed(()=>plan(props.items,props.dinner))
const chosen=computed(()=>Array.from(result.value.selections.values()))
const focus=ref<Category|null>(null), estimate=ref(false), name=ref('')
const current=computed(()=>focus.value?result.value.selections.get(focus.value):undefined)
const uses=computed(()=>result.value.occasions.filter(o=>focus.value&&o.needs.includes(focus.value)).map(o=>o.title).join(' + '))
const full=computed(()=>result.value.selections.has('formal'))
const space=computed(()=>!chosen.value.length?'Empty case':!full.value?'Estimate pending formalwear':chosen.value.length>=4?'Snug with formalwear':'Room to spare')
function open(c:Category){focus.value=c;name.value=categories[c]}
function add(){if(!focus.value||!name.value.trim())return
emit('update',[...props.items,{id:crypto.randomUUID(),name:name.value.trim(),category:focus.value}]);focus.value=null}
function toggle(){if(!current.value)return;const id=current.value.id
emit('packed',props.packed.includes(id)?props.packed.filter(key=>key!==id):[...props.packed,id]);focus.value=null}
</script>
<template><section class="content"><small class="kicker">PACKING PLAN</small><h1>Your carry-on.</h1>
<template v-if="focus"><button class="textbtn" @click="focus=null">‹ Back to case</button><div class="detail"><Art :kind="focus"/><h2>{{current?.name??categories[focus]}}</h2><p>{{ uses }}</p><p v-if="focus==='trousers'&&dinner">Wear the same trousers for travel and Friday dinner. Pack one pair.</p><p v-if="focus==='formal'">Keep formalwear in a garment bag. Lay it flat over your folded clothes.</p><p v-if="focus==='jacket'">A light layer is recommended for cool evenings.</p><form id="gapform" v-if="!current" @submit.prevent="add"><label>Item name<input v-model="name" required></label></form></div></template>
<template v-else-if="estimate"><button class="textbtn" @click="estimate=false">‹ Back to case</button><h2>About the fit</h2><p>This sample uses one cabin-size case. The illustration counts each selected piece once, including clothes used for multiple occasions.</p><p>Formalwear takes extra room to lay flat. The estimate covers these clothes only. Shoes, toiletries and airline size limits are outside this demo.</p></template>
<template v-else><div class="casecard"><div class="casetop"><small>CABIN CASE</small><button @click="estimate=true" aria-label="About the fit estimate">ⓘ</button></div><div class="case"><div class="handle"></div><div class="lining"><button v-for="i in chosen" :key="i.id" :aria-label="'Inspect '+i.name" @click="open(i.category)"><Art :kind="i.category"/><i v-if="packed.includes(i.id)">✓</i></button></div></div><div class="casecaption"><b>{{space}}</b><small>{{chosen.length}} pieces</small></div></div>
<h3 class="sectitle">Occasion coverage</h3><div v-for="o in result.occasions" :key="o.title" class="occasion"><div><b>{{o.title}}</b><small>{{o.label}}</small></div><div class="links"><button v-for="c in o.needs" :key="c" :class="{missing:!result.selections.has(c)}" @click="open(c)">{{result.selections.has(c)?'✓':'＋'}} {{categories[c]}}</button></div></div><p class="hint" v-if="full">Garment bag · Lay formalwear flat.</p></template></section>
<footer class="foot"><button v-if="focus && !current" class="primary" form="gapform" :disabled="!name.trim()">I have one · Add item</button><button v-else-if="focus && current" class="primary" @click="toggle">{{ packed.includes(current.id)?'Mark unpacked':'Mark as packed' }}</button><button v-else-if="estimate" class="primary" @click="estimate=false">Back to packing plan</button><button v-else class="primary" @click="emit('wardrobe')">Edit travel wardrobe <span>↗</span></button></footer></template>
