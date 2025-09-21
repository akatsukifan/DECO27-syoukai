<template>
  <div class="timeline-section">
    <h2 class="timeline-title">{{ title }}</h2>
    <div class="timeline-container">
      <!-- タイムラインの縦線 -->
      <div class="timeline-line"></div>

      <!-- タイムラインアイテム -->
      <div
        class="timeline-item"
        v-for="(item, index) in items"
        :key="index"
        :class="{
          'timeline-item-left': index % 2 === 0,
          'timeline-item-right': index % 2 !== 0,
          'timeline-item-animate': isVisible
        }"
      >
        <div class="timeline-point"></div>
        <div class="timeline-image-container">
          <a
            :href="item.youtubeLink"
            target="_blank"
            rel="noopener noreferrer"
            class="timeline-image-link"
            @click="handleImageClick(index)"
          >
            <img :src="item.image" alt="DECO*27作品" class="timeline-image" />
          </a>
        </div>
      </div>

      <!-- タイムラインの最後のハート -->
      <div class="timeline-heart-container">
        <div class="heart-text-container">
          <span class="heart-text-left">音楽の旅を</span>
          <span class="heart-icon" @click="onHeartClick">❤</span>
          <span class="heart-text-right">共に楽しもう</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { TimelineItem } from '../types'

interface Props {
  title: string
  items: TimelineItem[]
  onHeartClick: () => void
  onItemClick?: (index: number) => void
}

const props = defineProps<Props>()
const isVisible = ref(false)

// アイテムがクリックされたときのハンドラ
const handleImageClick = (index: number) => {
  if (props.onItemClick) {
    props.onItemClick(index)
    console.log(`タイムラインアイテムがクリックされました: ${index}`)
  }
}

// ハートアイコンがクリックされたときのハンドラ
const onHeartClick = () => {
  console.log('Timeline: Heart clicked, calling props.onHeartClick()')
  if (props.onHeartClick) {
    props.onHeartClick()
  } else {
    console.log('Timeline: props.onHeartClick is not defined')
  }
}

// スクロール検出によるアニメーショントリガー
const handleScroll = async () => {
  const timelineSection = document.querySelector('.timeline-section')
  if (!timelineSection) return

  const rect = timelineSection.getBoundingClientRect()
  const isInViewport = rect.top < window.innerHeight * 0.8

  if (isInViewport && !isVisible.value) {
    await nextTick()
    isVisible.value = true
  }
}

// マウント時にスクロールリスナーを追加
onMounted(() => {
  // 初期チェック
  handleScroll()
  // スクロールイベントリスナーを追加
  window.addEventListener('scroll', handleScroll)
})

// アンマウント時にスクロールリスナーを削除
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.timeline-section {
  width: 100%;
  max-width: 1200px;
  margin-top: 5rem;
  padding: 2rem;
}

.timeline-title {
  font-size: 2.5rem;
  color: white;
  text-align: center;
  margin-bottom: 3rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.timeline-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* タイムラインの縦線 - 削除 */
.timeline-line {
  display: none;
}

/* タイムラインアイテム */
.timeline-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
  width: 100%;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;
}

/* アニメーションが有効なアイテム */
.timeline-item-animate {
  opacity: 1;
  transform: translateY(0);
}

/* 左側アイテム */
.timeline-item-left {
  justify-content: flex-end;
  transition-delay: 0.2s;
}

/* 右側アイテム */
.timeline-item-right {
  justify-content: flex-start;
  transition-delay: 0.4s;
}

/* タイムラインの点 */
.timeline-point {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  transform: translate(-50%, -50%);
  z-index: 2;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* 画像コンテナ */
.timeline-image-container {
  width: 45%;
  max-width: 500px;
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

/* YouTubeリンクスタイル */
.timeline-image-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  position: relative;
}

/* ホバー時のプレイアイコン表示 */
.timeline-image-container:hover .timeline-image-link::after {
  content: "▶";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* タイムラインの画像 */
.timeline-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.timeline-image-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

/* レスポンシブデザイン - デスクトップ用 */
@media (min-width: 769px) {
  .timeline-image-container {
    width: 400px;
    aspect-ratio: 1 / 1;
  }
}

/* レスポンシブデザイン - タブレット用 */
@media (max-width: 768px) {
  .timeline-section {
    margin-top: 3rem;
  }

  .timeline-title {
    font-size: 2rem;
  }

  .timeline-image-container {
    width: 300px;
    aspect-ratio: 1 / 1;
  }
}

/* レスポンシブデザイン - モバイル用 */
@media (max-width: 480px) {
  /* モバイルでは縦一列に表示 */
  .timeline-item-left,
  .timeline-item-right {
    justify-content: center;
  }

  .timeline-item-left .timeline-image-container,
  .timeline-item-right .timeline-image-container {
    margin: 0;
    width: 90%;
  }

  .timeline-image-container {
    aspect-ratio: 1 / 1;
  }

  .timeline-item {
    margin-bottom: 2rem;
  }
}

/* タイムラインのハートアイコン */
.timeline-heart-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 3rem;
  opacity: 1;
  transform: translateY(0);
  transition: all 1s ease-out 0.5s;
}

.heart-point {
  background: rgba(255, 105, 180, 0.8) !important;
  box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
}

.heart-text-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
}

.heart-text-left,
.heart-text-right {
  font-size: 18px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.heart-icon {
  position: relative;
  font-size: 4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  z-index: 10;
  color: rgba(255, 105, 180, 0.8);
}

.heart-icon:hover {
  transform: scale(1.2);
  text-shadow: 0 0 20px rgba(255, 105, 180, 0.8);
  animation: heartbeat 1s ease-in-out infinite;
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }

  14% {
    transform: scale(1.1);
  }

  28% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.1);
  }

  70% {
    transform: scale(1);
  }
}
</style>