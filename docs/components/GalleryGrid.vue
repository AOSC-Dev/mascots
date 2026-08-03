<template>
    <div class="gallery-wrapper">
        <div class="gallery-grid">
            <figure
                v-for="(img, i) in images"
                :key="i"
                class="gallery-item"
                @click="open(i)"
            >
                <img
                    :src="'/images/gallery/thumbnails/' + img.src + '.webp'"
                    loading="lazy"
                />
                <figcaption>
                    <span>{{ img.caption }}</span>
                </figcaption>
            </figure>
        </div>

        <Teleport to="body">
            <Transition name="lightbox">
                <div
                    v-if="activeIndex !== null"
                    class="lightbox-overlay"
                    @click.self="close"
                    @keydown.escape="close"
                    tabindex="0"
                >
                    <button
                        class="lightbox-close"
                        @click="close"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <button
                        class="lightbox-nav prev"
                        @click="prev"
                        aria-label="Previous"
                    >
                        &#8249;
                    </button>
                    <Transition :name="slideName" mode="out-in">
                        <div :key="activeIndex" class="lightbox-content">
                            <img
                                :src="
                                    '/images/gallery/' +
                                    images[activeIndex].src +
                                    '.' +
                                    images[activeIndex].ext
                                "
                            />
                            <p class="lightbox-caption">
                                {{ images[activeIndex].caption }}
                            </p>
                        </div>
                    </Transition>
                    <button
                        class="lightbox-nav next"
                        @click="next"
                        aria-label="Next"
                    >
                        &#8250;
                    </button>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    images: {
        type: Array,
        required: true,
        validator: (v) => v.every((img) => 'src' in img),
    },
})

const activeIndex = ref(null)
const direction = ref('next')

const slideName = computed(() =>
    direction.value === 'next' ? 'slide-next' : 'slide-prev'
)

function open(i) {
    activeIndex.value = i
}

function close() {
    activeIndex.value = null
}

function prev() {
    direction.value = 'prev'
    activeIndex.value =
        activeIndex.value === 0
            ? props.images.length - 1
            : activeIndex.value - 1
}

function next() {
    direction.value = 'next'
    activeIndex.value =
        activeIndex.value === props.images.length - 1
            ? 0
            : activeIndex.value + 1
}

function preloadImages() {
    if (activeIndex.value === null) return
    const n = props.images.length
    const indices = [
        activeIndex.value,
        (activeIndex.value + 1) % n,
        (activeIndex.value + n - 1) % n,
    ]
    indices.forEach((i) => {
        const img = props.images[i]
        new Image().src = '/images/gallery/' + img.src + '.' + img.ext
    })
}

watch(activeIndex, (val) => {
    if (val !== null) {
        document.addEventListener('keydown', handleKeydown)
        preloadImages()
    } else {
        document.removeEventListener('keydown', handleKeydown)
    }
})

function handleKeydown(e) {
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
}
</script>

<style scoped>
.gallery-wrapper {
    margin: 0 auto;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.gallery-item {
    margin: 0;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: box-shadow 0.25s ease;
}

.gallery-item:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.gallery-item img {
    display: block;
    width: 100%;
    transform-origin: center center;
    will-change: transform;
    transition: transform 0.3s ease;
}

.gallery-item:hover img {
    transform: scale(1.05);
}

.gallery-item figcaption {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.25s ease;
}

.gallery-item:hover figcaption {
    opacity: 1;
}

.gallery-item figcaption span {
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.7);
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

.lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.9);
}

.lightbox-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 90vw;
    max-height: 90vh;
}

.lightbox-content img {
    display: block;
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
}

.lightbox-caption {
    margin: 0.75rem 0 0;
    color: #ccc;
    font-size: 0.95rem;
}

.lightbox-close {
    position: absolute;
    top: 1rem;
    right: 1.25rem;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 1.8rem;
    line-height: 1;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    z-index: 10;
}

.lightbox-close:hover {
    background: rgba(0, 0, 0, 0.8);
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 3rem;
    height: 3rem;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 2.5rem;
    line-height: 0;
    border-radius: 50%;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: background 0.2s;
    z-index: 10;
    padding-bottom: 0.55rem;
}

.lightbox-nav:hover {
    background: rgba(0, 0, 0, 0.8);
}

.lightbox-nav.prev {
    left: 1.25rem;
}

.lightbox-nav.next {
    right: 1.25rem;
}

.lightbox-enter-active,
.lightbox-leave-active {
    transition: opacity 0.25s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
    opacity: 0;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
    transition:
        transform 0.3s ease,
        opacity 0.3s ease;
}

.slide-next-enter-from,
.slide-prev-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.slide-next-leave-to,
.slide-prev-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}

@media (min-width: 641px) {
    .gallery-grid {
        column-count: 8;
        column-gap: 0;
        display: block;
    }

    .gallery-item {
        break-inside: avoid;
    }
}

@media (max-width: 640px) {
    .gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    .gallery-item img {
        height: 160px;
        object-fit: cover;
    }

    .lightbox-nav {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 2rem;
    }

    .lightbox-nav.prev {
        left: 0.5rem;
    }

    .lightbox-nav.next {
        right: 0.5rem;
    }
}
</style>
