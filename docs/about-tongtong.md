---
layout: page
title: 关于同同
sidebar: false
---

<script setup>
import MascotInfo from '@/components/MascotInfo.vue'
const cards = ["/images/tongtong/tongtong-no-bg.png", "/images/tongtong/tongtong.png"]
const intro = []
</script>

<MascotInfo :cards="cards" :info="intro" :locale="['简介', '故事']">

</MascotInfo>
