<script setup lang="ts">
defineProps<{dinner:boolean|null}>()
defineEmits<{choose:[boolean]}>()
</script>
<template><small class="kicker">TRIP CONFIRMATION</small><h1>Your weekend.</h1><article class="destination"><div class="sky"><svg
        viewBox="0 0 400 188"
        role="img"
        aria-label="Illustrated New York skyline and bridge"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <pattern
            id="windows"
            width="12"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <rect x="4" y="4" width="3" height="6" rx="1" fill="#f7e9cc" />
          </pattern>
        </defs>
        <path fill="#d8e8e3" d="M0 0h400v188H0z" />
        <circle cx="305" cy="51" r="25" fill="#f5cf91" />
        <g fill="#f6f6e9">
          <path
            d="M30 43q4-9 15-6 8-14 20-2 13-4 17 8zM177 25q4-6 10-4 6-9 14-1 9-1 11 5z"
          />
        </g>
        <g fill="#a3bab4">
          <path
            d="M0 145V83h20v62h8V61h18v84h9V75h19v70h12V53h18v92h14V71h24v74h17V86h18v59h20V56h25v89h17V82h14v63h25V71h20v74h15V85h22v60h20V64h17v81h20v-37h26v37z"
          />
        </g>
        <g stroke="#526b66" stroke-width="2" stroke-linejoin="round">
          <path fill="#abbcb0" d="M3 157V99h26v58m6 0V82h27v75" />
          <path fill="#cf9f83" d="M63 158V90h36v68" />
          <path
            fill="#76968c"
            d="M108 157V71h8V58h7V43h5V26l3 17h4v15h7v13h7v86z"
          />
          <path fill="#e1be95" d="M153 158v-57h33v57" />
          <path fill="#829b95" d="M185 159V81h19V68h10v13h15v78" />
          <path fill="#cdada2" d="M235 159V98h31v61" />
          <path
            fill="url(#windows)"
            stroke="none"
            d="M65 95h31v61H65zm52-20h24v80h-24zm71 13h36v68h-36z"
          />
        </g>
        <path fill="#91b4ae" d="M0 151q110-10 214 2t186-6v41H0z" />
        <g stroke="#52766e" fill="none">
          <path
            d="M-10 165q90-8 165-3t150 3m-280 9h40m40 3h32m162 1h61"
            opacity=".5"
          />
          <g stroke="#665f51">
            <path
              d="M210 145Q261 141 289 84q39 59 112 56M290 85q22 42 64 49"
              stroke-width="2"
            />
            <path
              d="M228 143v9m16-15v13m16-23v21m14-39v36m35-35v30m15-14v13m15-7v5m36-1v-1"
            />
            <path
              fill="#ceb28c"
              stroke-width="2.5"
              d="M282 158V80l4-7 4 7v29h5V80l4-7 4 7v75h-7v-34h-6v36z"
            />
            <path d="M205 154l199-21" stroke-width="5" />
          </g>
        </g></svg><span>NYC · DESTINATION CARD</span></div><div class="cardbody"><h2>New York City</h2><p>Fri–Sun · 2 nights · Wedding weekend</p><div class="forecast">☀ &nbsp;18° / 11°C · Cool evenings</div></div>
<div class="question"><small class="kicker">ONE QUICK QUESTION</small><h3>Joining the rehearsal dinner on Friday night?</h3><button v-for="opt in [true,false]" :aria-pressed="dinner===opt" @click="$emit('choose',opt)"><i>{{ dinner===opt?'●':'○' }}</i>{{ opt?'Yes, dinner and ceremony':'Just the ceremony' }}</button><p aria-live="polite">{{ dinner===true?'Friday dinner added · We’ll reuse pieces for its business-casual dress code.':dinner===false?'Saturday ceremony only · We’ll plan for formalwear and travel days.':'Your answer helps us plan for the dress code.' }}</p></div></article></template>
