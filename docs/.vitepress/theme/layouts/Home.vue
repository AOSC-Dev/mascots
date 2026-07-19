<template>
  <div class="Home">
    <VPNav>
      <template #nav-bar-title-before>
        <slot name="nav-bar-title-before" />
      </template>
      <template #nav-bar-title-after>
        <slot name="nav-bar-title-after" />
      </template>
      <template #nav-bar-content-before>
        <slot name="nav-bar-content-before" />
      </template>
      <template #nav-bar-content-after>
        <slot name="nav-bar-content-after" />
      </template>
      <template #nav-screen-content-before>
        <slot name="nav-screen-content-before" />
      </template>
      <template #nav-screen-content-after>
        <slot name="nav-screen-content-after" />
      </template>
    </VPNav>
    <div class="hero" />
  </div>
</template>

<script setup>
import VPNav from 'vitepress/dist/client/theme-default/components/VPNav.vue'
</script>

<style>
.Home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.hero {
  flex: 1;
  background-image: url(/images/home.png);
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
}
</style>
