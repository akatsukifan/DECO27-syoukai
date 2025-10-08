<template>
  <div class="timeline-section">
    <h2 class="timeline-title">{{ title }}</h2>
    <div class="timeline-container">
      <!-- タイムラインアイテム - シンプルな縦並び -->
      <div class="timeline-item" v-for="(item, index) in items" :key="index">
        <div class="timeline-image-container">
          <a
            v-if="item.youtubeLink"
            :href="item.youtubeLink"
            target="_blank"
            rel="noopener noreferrer"
            class="timeline-image-link"
            @click="handleImageClick(index)"
          >
            <!-- 画像ロード中のスケルトン -->
            <div class="image-skeleton" v-if="loadingImages[index]"></div>
            <!-- 画像エラー時のフォールバック -->
            <div class="image-error" v-else-if="errorImages[index]">
              <span>画像を読み込めません</span>
            </div>
            <img 
              v-else
              v-bind:src="item.image" 
              :alt="'DECO*27作品 ' + (index + 1)" 
              class="timeline-image"
              loading="eager"
              @load="handleImageLoad(index)"
              @error="handleImageError(index)"
            />
          </a>
          <div v-else class="timeline-image-link">
            <!-- 画像ロード中のスケルトン -->
            <div class="image-skeleton" v-if="loadingImages[index]"></div>
            <!-- 画像エラー時のフォールバック -->
            <div class="image-error" v-else-if="errorImages[index]">
              <span>画像を読み込めません</span>
            </div>
            <img 
              v-else
              v-bind:src="item.image" 
              :alt="'DECO*27作品 ' + (index + 1)" 
              class="timeline-image"
              loading="eager"
              @load="handleImageLoad(index)"
              @error="handleImageError(index)"
            />
          </div>
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
import { ref, onMounted } from 'vue';
import type { TimelineItem } from '../types';

interface Props {
  title: string;
  items: TimelineItem[];
  onHeartClick: () => void;
  onItemClick?: (index: number) => void;
}

const props = defineProps<Props>();

// 画像のロード状態を管理
const loadingImages = ref<boolean[]>([]);
const errorImages = ref<boolean[]>([]);

onMounted(() => {
  // 初期化 - 各画像のロード状態を設定
  loadingImages.value = props.items.map(() => true);
  errorImages.value = props.items.map(() => false);
  
  // デバッグ: 画像URLをログ出力
  console.log('Timeline组件初始化，图片URLs:', props.items.map(item => item.image));
  console.log('Timeline接收到的items数量:', props.items.length);
});

const handleImageClick = (index: number) => {
  if (props.onItemClick) {
    props.onItemClick(index);
  }
};

// 画像の読み込み完了時のハンドラ
const handleImageLoad = (index: number) => {
  loadingImages.value[index] = false;
  errorImages.value[index] = false;
  console.log(`画像の読み込み成功: ${props.items[index].image}`);
};

// 画像の読み込みエラー時のハンドラ
const handleImageError = (index: number) => {
  loadingImages.value[index] = false;
  errorImages.value[index] = true;
  console.error(`❌ 图片加载失败: ${props.items[index].image}`);
  console.error(`📍 错误详情: 索引 ${index}, URL: ${props.items[index].image}, 时间: ${new Date().toISOString()}`);
  console.error(`🔍 可能原因: 1)路径错误 2)文件不存在 3)网络问题 4)路由切换导致请求取消`);
};
</script>

<style scoped>
.timeline-section {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 3rem;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.timeline-item {
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
}

.timeline-image-container {
  width: 100%;
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
}

.timeline-image-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  position: relative;
}

.timeline-image {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  display: block;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

/* 画像ロード中のスケルトン */
.image-skeleton {
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #222 25%, #333 50%, #222 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 12px;
}

/* 画像読み込みエラー時のフォールバック */
.image-error {
  width: 100%;
  height: 200px;
  background-color: #333;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 14px;
  text-align: center;
  padding: 20px;
}

/* スケルトンアニメーション */
@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.timeline-heart-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 3rem;
  opacity: 1;
  transform: translateY(0);
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
  user-select: none;
  z-index: 10;
  color: rgba(255, 105, 180, 0.8);
}

@media (max-width: 768px) {
  .timeline-section {
    margin-top: 2rem;
    padding: 1rem;
  }

  .timeline-title {
    font-size: 2rem;
  }

  .timeline-container {
    gap: 1.5rem;
  }

  .timeline-item {
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .timeline-section {
    padding: 0.5rem;
  }

  .timeline-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .timeline-item {
    max-width: 280px;
  }
  
  .timeline-image {
    aspect-ratio: 16 / 9;
  }
}
</style>