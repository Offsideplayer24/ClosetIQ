<script setup lang="ts">
import type { Category } from './scenario'
defineProps<{kind:Category|'bag'}>()
</script>
<template><svg viewBox="0 0 100 88" aria-hidden="true" fill="none" stroke="#344e45" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
<g v-if="kind==='bag'"><ellipse cx="51" cy="80" rx="33" ry="4" fill="#cad9c6" stroke="none"/><g transform="rotate(-6 50 48)"><path d="M40 25V15q0-5 6-5h13q5 0 5 5v10" fill="#f5cf8e"/><rect x="18" y="23" width="65" height="52" rx="10" fill="#a3c5a9"/><path d="M29 24v50m42-50v50" stroke="#698b72"/><path d="M22 30h54" stroke="#c9dfbe"/><path d="M40 44v4m15-4v4m-14 6q6 6 12-1"/><rect x="56" y="16" width="11" height="18" rx="2" fill="#f0b994" transform="rotate(-15 56 16)"/><path d="M29 76v2m41-2v2"/></g><path d="M8 19v8m-4-4h8m73-13v6m-3-3h6" stroke="#a98648"/></g>
<g v-else-if="kind==='trousers'"><path fill="#92a8bd" d="M25 12h51l2 65-23 1-6-43-4 43-23-1z"/><path d="M25 21h51m-25-7-1 19m-18-9-7 7m43-7 8 7M25 71l16 1m18 0h15"/></g>
<g v-else-if="kind==='formal'"><path fill="#bcb7cf" d="M50 7q6-9 10-1 2 4-6 8v3l22 13 2 46q-28 8-56 0l2-46 25-14"/><path d="M49 20v54m-8-46 8 8 9-8M28 69h13"/></g>
<g v-else><path :fill="kind==='tee'?'#a7c5ad':kind==='shirt'?'#e5d5ad':'#d2afa0'" d="M34 17l9-4q7 6 14 0l10 4 20 17-12 15-11-7 2 33q-16 5-33 0l2-33-11 7-12-15z"/><path v-if="kind==='tee'" d="M41 16q7 16 18 0"/><path v-else d="m41 15 8 10-7 6-7-12m23-4-9 10 7 6 9-12M50 26v48m7-34h7"/><path d="M35 69q15 3 28 0" opacity=".5"/></g></svg></template>
