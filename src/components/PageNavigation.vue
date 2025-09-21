<template>
  <div class="page-navigation">
    <button
      v-if="canGoBack"
      class="navigation-button navigation-button-back button"
      @click="handleGoBack"
    >
      <span class="button-icon">←</span>
      <span class="button-label">前へ</span>
    </button>
    
    <button
      v-if="canGoNext"
      class="navigation-button navigation-button-next button"
      @click="handleGoNext"
    >
      <span class="button-icon">→</span>
      <span class="button-label">次へ</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  canGoBack?: boolean
  canGoNext?: boolean
  onBackClick?: () => void
  onNextClick?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  canGoBack: false,
  canGoNext: false
})

const router = useRouter()

// 戻るボタンのハンドラ
const handleGoBack = () => {
  if (props.onBackClick) {
    props.onBackClick()
  } else {
    // デフォルトの戻る動作
    router.back()
  }
}

// 次へボタンのハンドラ
const handleGoNext = () => {
  if (props.onNextClick) {
    props.onNextClick()
  } else {
    // デフォルトの次へ動作
    router.forward()
  }
}
</script>

<style scoped>
.page-navigation {
  position: fixed;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 20;
}

.navigation-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 120px;
}

.navigation-button-back {
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.navigation-button-back:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.navigation-button-next {
  background: linear-gradient(135deg, #ff69b4, #ff85c0);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
}

.navigation-button-next:hover {
  background: linear-gradient(135deg, #ff5a9e, #ff74b3);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 105, 180, 0.4);
}

.button-icon {
  font-size: 1.2rem;
}

.button-label {
  font-size: 1rem;
}

/* レスポンシブデザイン - タブレット用 */
@media (max-width: 768px) {
  .page-navigation {
    bottom: 1.5rem;
    padding: 0 1.5rem;
  }

  .navigation-button {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
    min-width: 100px;
  }
}

/* レスポンシブデザイン - モバイル用 */
@media (max-width: 480px) {
  .page-navigation {
    bottom: 1rem;
    padding: 0 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .navigation-button {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    width: 100%;
    justify-content: center;
  }

  .navigation-button-back,
  .navigation-button-next {
    width: 80%;
  }
}
</style>