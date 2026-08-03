<template>
    <div class="mascot-page">
        <div class="mascot-avatar">
            <Transition name="slide">
                <img :src="cards[currentIndex]" :key="cards[currentIndex]" />
            </Transition>
            <div v-if="cards.length > 1" class="avatar-nav">
                <button class="nav-btn prev" @click="prev">‹</button>
                <div class="nav-dots">
                    <span
                        v-for="(_, i) in cards"
                        :key="i"
                        class="dot"
                        :class="{ active: i === currentIndex }"
                        @click="currentIndex = i"
                    ></span>
                </div>
                <button class="nav-btn next" @click="next">›</button>
            </div>
        </div>
        <div class="mascot-panel">
            <div class="tab-bar">
                <button
                    class="tab-button"
                    :class="{ active: activeTab === 'intro' }"
                    @click="activeTab = 'intro'"
                >
                    {{ locale[0] }}
                </button>
                <button
                    class="tab-button"
                    :class="{ active: activeTab === 'story' }"
                    @click="activeTab = 'story'"
                >
                    {{ locale[1] }}
                </button>
            </div>
            <div class="tab-content">
                <div v-show="activeTab === 'intro'" class="tab-intro">
                    <ul>
                        <li v-for="item in info" :key="item">{{ item }}</li>
                    </ul>
                </div>
                <div v-show="activeTab === 'story'" class="tab-story">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    cards: {
        type: Array,
        default: () => [],
    },
    info: {
        type: Array,
        default: () => [],
    },
    locale: {
        type: Array,
        default: () => [],
    },
})

const activeTab = ref('intro')
const currentIndex = ref(0)

function prev() {
    currentIndex.value =
        currentIndex.value === 0
            ? props.cards.length - 1
            : currentIndex.value - 1
}

function next() {
    currentIndex.value =
        currentIndex.value === props.cards.length - 1
            ? 0
            : currentIndex.value + 1
}
</script>

<style scoped>
.mascot-page {
    margin: 0 auto;
    padding: 0;
    display: flex;
    height: calc(100vh - var(--vp-nav-height));
}

.mascot-avatar {
    flex: 0 0 33.333%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--vp-c-bg-soft);
    overflow: hidden;
    position: relative;
}

.mascot-avatar img {
    position: absolute;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from {
    transform: translateX(100%);
}

.slide-leave-to {
    transform: translateX(-100%);
}

.avatar-nav {
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}

.nav-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}

.nav-btn:hover {
    background: rgba(0, 0, 0, 0.6);
}

.nav-dots {
    display: flex;
    gap: 0.4rem;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background 0.2s;
}

.dot.active {
    background: #fff;
}

.mascot-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;
}

.tab-bar {
    display: flex;
    gap: 0;
    border-bottom: 2px solid var(--vp-c-divider);
    margin-bottom: 1.5rem;
}

.tab-button {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    background: transparent;
    color: var(--vp-c-text-2);
    cursor: pointer;
    position: relative;
    transition: color 0.2s;
}

.tab-button::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: transparent;
    transition: background 0.2s;
}

.tab-button.active {
    color: var(--vp-c-brand-1);
}

.tab-button.active::after {
    background: var(--vp-c-brand-1);
}

.tab-button:hover {
    color: var(--vp-c-brand-1);
}

.tab-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.tab-story {
    flex: 1;
    overflow-y: auto;
}

.tab-intro {
    flex: 1;
}

.tab-intro ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.tab-intro li {
    padding: 0.5rem 0;
    border-bottom: 1px dashed var(--vp-c-divider);
    font-size: 1rem;
    line-height: 1.6;
}

.tab-intro li:last-child {
    border-bottom: none;
}

.tab-story :deep(h2) {
    margin-top: 2rem;
}

.tab-story :deep(p) {
    line-height: 1.8;
    margin: 0.8rem 0;
}

.tab-story :deep(ul) {
    padding-left: 1.5rem;
    list-style: disc;
}

.tab-story :deep(li) {
    line-height: 1.8;
    margin: 0.4rem 0;
}

@media (max-width: 640px) {
    .mascot-page {
        flex-direction: column;
        height: auto;
    }

    .mascot-avatar {
        flex: none;
        width: 100%;
        min-height: 70vh;
    }

    .mascot-avatar img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .avatar-nav {
        bottom: 1rem;
    }

    .mascot-panel {
        padding: 1.25rem;
    }
}
</style>
