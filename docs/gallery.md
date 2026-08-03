---
layout: page
title: 相册
sidebar: false
---

<script setup>
import GalleryGrid from '@/components/GalleryGrid.vue'

const images = [
  { src: 'mascots-full', ext: 'png', caption: '安安和同同 - 钛山(Tyson Tan)' },
  { src: 'an-nimal-earsq-1', ext: 'png', caption: '安安和同同 - 立绘 - Mr.J.AND' },
  { src: 'bunnifilm', ext: 'png', caption: 'BunniFilm' },
  { src: 'anan-and-reimu', ext: 'jpg', caption: '安安和灵梦' },
  { src: 'anan-at-the-tea-stall', ext: 'jpg', caption: '茶摊前的安安' },
  { src: 'anan-by-the-window', ext: 'jpg', caption: '窗边的安安' },
  { src: 'anan-under-mushroom', ext: 'jpg', caption: '蘑菇下的安安' },
  { src: 'anan-with-cake', ext: 'jpg', caption: '安安和蛋糕' },
  { src: 'by-the-Cuiping-Lake', ext: 'jpg', caption: '翠屏湖畔' }
]
</script>

<GalleryGrid :images="images" />
