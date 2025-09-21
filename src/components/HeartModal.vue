<template>
  <transition name="modal-fade">
    <div class="heart-modal-overlay" v-show="showModal" @click="handleOverlayClick">
      <div class="heart-modal-content" @click.stop>
        <h2 class="heart-modal-title">♡ ありがとう ♡</h2>
        <p class="heart-modal-text">あなたの応援をいただき、DECO*27の音楽はより強くなります。</p>
        <p class="heart-modal-text">Your support makes DECO*27's music even stronger.</p>
        
        <div class="heart-modal-count">
          <span class="heart-modal-count-text">いいね数: </span>
          <span class="heart-modal-count-number">
            {{ formatCount(likeCount) }}
          </span>
        </div>
        
        <div class="heart-modal-buttons">
          <button class="heart-modal-button heart-modal-button-share">
            シェアする
          </button>
          <button class="heart-modal-button heart-modal-button-close" @click="handleClose">
            閉じる
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { watch, nextTick } from 'vue'

interface Props {
  showModal: boolean
  likeCount: number
  onClose: () => void
}

const props = defineProps<Props>()

// カウントをフォーマットする（例：1000 -> 1k）
const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'm'
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
}

// オーバーレイをクリックしたときのハンドラ
const handleOverlayClick = () => {
  props.onClose()
}

// 閉じるボタンをクリックしたときのハンドラ
const handleClose = () => {
  props.onClose()
}

// 监听showModal属性变化，自动添加动画类
watch(() => props.showModal, (newValue) => {
  if (newValue) {
    // 确保DOM更新后再添加动画类
    nextTick(() => {
      const modal = document.querySelector('.heart-modal-content')
      if (modal) {
        modal.classList.add('heart-modal-content-visible')
      }
    })
  } else {
    const modal = document.querySelector('.heart-modal-content')
    if (modal) {
      modal.classList.remove('heart-modal-content-visible')
    }
  }
})
</script>

<style scoped>
/* モデルオーバーレイ */
.heart-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  cursor: pointer;
}

/* モデルコンテンツ */
.heart-modal-content {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
  transform: scale(0.8);
  opacity: 0;
  transition: all 0.3s ease;
  cursor: default;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* モデルコンテンツが表示されたときのスタイル */
.heart-modal-content-visible {
  transform: scale(1);
  opacity: 1;
}

/* モデルタイトル */
.heart-modal-title {
  font-size: 2rem;
  color: #ff69b4;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(255, 105, 180, 0.3);
}

/* モデルテキスト */
.heart-modal-text {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* モデルカウント */
.heart-modal-count {
  margin: 1.5rem 0;
  padding: 0.8rem;
  background: rgba(255, 105, 180, 0.1);
  border-radius: 12px;
  font-size: 1.2rem;
}

.heart-modal-count-text {
  color: #666;
}

.heart-modal-count-number {
  font-weight: bold;
  color: #ff69b4;
  margin-left: 8px;
  font-size: 1.5rem;
}

/* モデルボタンコンテナ */
.heart-modal-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* モデルボタン */
.heart-modal-button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

/* シェアボタン */
.heart-modal-button-share {
  background: linear-gradient(135deg, #ff69b4, #ff85c0);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
}

.heart-modal-button-share:hover {
  background: linear-gradient(135deg, #ff5a9e, #ff74b3);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 105, 180, 0.4);
}

/* 閉じるボタン */
.heart-modal-button-close {
  background: #e0e0e0;
  color: #333;
}

.heart-modal-button-close:hover {
  background: #d0d0d0;
  transform: translateY(-2px);
}

/* モデルフェードトランジション */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* レスポンシブデザイン - タブレット用 */
@media (max-width: 768px) {
  .heart-modal-content {
    padding: 1.5rem;
  }

  .heart-modal-title {
    font-size: 1.8rem;
  }

  .heart-modal-text {
    font-size: 0.9rem;
  }

  .heart-modal-button {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
    min-width: 100px;
  }
}

/* レスポンシブデザイン - モバイル用 */
@media (max-width: 480px) {
  .heart-modal-content {
    padding: 1.2rem;
    width: 95%;
  }

  .heart-modal-title {
    font-size: 1.5rem;
  }

  .heart-modal-text {
    font-size: 0.85rem;
  }

  .heart-modal-buttons {
    flex-direction: column;
  }

  .heart-modal-button {
    width: 100%;
    padding: 0.6rem 1rem;
  }
}
</style>