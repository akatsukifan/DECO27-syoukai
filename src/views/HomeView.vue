<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { preloadImage } from '../utils/imageLoader'
import { detectNetworkQuality, detectBatteryStatus } from '../utils/performanceOptimizer'
import type { ImageLoadingStatus } from '../types'

// 画像を直接importする
import image1 from '/image/1.png'
import image2 from '/image/2.png'

// 画像の状態管理
const showFirstImage = ref(true)
const isTransitioning = ref(false)
const isSecondImageLoaded = ref(false)
const isImageLoading = ref(false)
const loadingProgress = ref(0)

const router = useRouter()

// マウスの位置に合わせて球体を動かす
const mouseX = ref(0)
const mouseY = ref(0)

// 画像のプリロード処理
const handleImagePreload = async (imageSrc: string) => {
  try {
    isImageLoading.value = true
    loadingProgress.value = 0
    
    // ネットワーク品質の検出
    const networkQuality = detectNetworkQuality()
    if (networkQuality === 'slow-2g' || networkQuality === '2g') {
      console.warn('⚠️ 低速ネットワーク環境が検出されました。画像の読み込みが遅くなる可能性があります。')
    }
    
    // バッテリー状態の検出（省エネモードの判断に使用）
    const batteryLevel = await detectBatteryStatus()
    if (batteryLevel && batteryLevel < 0.2) {
      console.warn('⚠️ バッテリー残量が少ないため、画像の読み込みが制限される場合があります。')
    }
    
    // 画像のプリロード（ユーティリティ関数を使用）
    await preloadImage(imageSrc, (progress) => {
      loadingProgress.value = progress
    })
    
    isImageLoading.value = false
    loadingProgress.value = 100
    
  } catch (error) {
    console.error('画像の読み込みエラー:', error)
    isImageLoading.value = false
    loadingProgress.value = 0
    throw error
  }
}

// 画像切り替えアニメーション
const switchImage = async () => {
  // トランジション中または読み込み中は操作を無視
  if (isTransitioning.value || isImageLoading.value) {
    console.info('画像の切り替え操作がキャンセルされました（トランジション中または読み込み中）')
    return
  }

  try {
    // 1.png -> 2.png -> 紹介ページ の一連の流れ
    isTransitioning.value = true

    // 2.pngのプリロードを開始 - 実際に画像が読み込まれるまで待つ
    if (!isSecondImageLoaded.value) {
      try {
        await handleImagePreload(image2)
        isSecondImageLoaded.value = true
      } catch (error) {
        console.error('画像の処理に失敗しました:', error)
        isTransitioning.value = false
        return
      }
    }

    // DOM要素の取得
    const transitionElement = document.getElementById('transition-container')
    const sphereElement = document.querySelector('.transparent-sphere')

    // フェードアウト - より明確なアニメーション
    if (transitionElement) {
      transitionElement.style.transition = 'opacity 1s ease-out, transform 1s ease-out'
      transitionElement.style.opacity = '0'
      transitionElement.style.transform = 'scale(1.1)'
    }

    // 球体を即座に消失させる
    if (sphereElement) {
      sphereElement.classList.add('fade-out')
    }

    // アニメーションの完了を待つ
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 画像を切り替える
    showFirstImage.value = false

    // フェードイン - 2.pngを表示
    if (transitionElement) {
      transitionElement.style.transition = 'opacity 0.5s ease-in'
      transitionElement.style.opacity = '1'
      transitionElement.style.transform = 'scale(1)'
    }

    // 2.pngを短時間表示
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 300))

    // 2.pngから紹介ページへの切り替えアニメーション
    if (transitionElement) {
      transitionElement.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
      transitionElement.style.opacity = '0'
      transitionElement.style.transform = 'scale(1.1)'
    }

    // アニメーションの完了を待つ
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 800))

    // 紹介ページにルーティング
    router.push('/introduction')

  } catch (error) {
    console.error('画像切り替えプロセス中にエラーが発生しました:', error)
  } finally {
    isTransitioning.value = false
  }
}

// マウスの位置に合わせて球体を動かす
const handleMouseMove = (e: MouseEvent) => {
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // マウスの位置を-1から1の範囲に正規化する
  mouseX.value = (e.clientX / windowWidth - 0.5) * 2
  mouseY.value = (e.clientY / windowHeight - 0.5) * 2
}

// ページの読み込みが完了したらイベントリスナーを追加
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  
  // 初期画像のプリロード（バックグラウンドで実行）
  handleImagePreload(image1).catch(error => {
    console.error('初期画像のプリロードに失敗しました:', error)
  })
})

// コンポーネントがアンマウントされる際にイベントリスナーを削除
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="deco27-intro">
    <!-- 背景グラデーション -->
    <div class="background-gradient"></div>

    <!-- 画像切り替えコンテナ -->
    <div id="transition-container" class="image-transition-container">
      <!-- 最初の画像：Monitoring Best Friend Remix -->
      <div v-if="showFirstImage" class="image-container first-image">
        <img :src="image1" alt="Monitoring Best Friend Remix" class="fullscreen-image" />
        <div class="image-overlay"></div>
      </div>

      <!-- 次の画像：モニタリング -->
      <div v-else class="image-container second-image" @click="switchImage" style="cursor: pointer">
        <img :src="image2" alt="モニタリング" class="fullscreen-image" />
        <div class="image-overlay"></div>
      </div>
    </div>

    <!-- 半透明な円形球体 -->
    <div
      class="transparent-sphere"
      @click="switchImage"
      :style="{
        transform: `translate(${mouseX * 30}px, ${mouseY * 30}px)`,
        cursor: isTransitioning || isImageLoading ? 'wait' : 'pointer'
      }"
    >
      <div class="sphere-content">
        <p class="sphere-text">DECO27</p>
        <p class="sphere-subtext" v-if="showFirstImage">
          {{ isImageLoading ? `画像を読み込んでいます...${loadingProgress}%` : 'クリックして続ける' }}
        </p>
        <p class="sphere-subtext" v-else>クリックして紹介を見る</p>
      </div>
    </div>

    <!-- パーティクルエフェクト -->
    <div class="particles">
      <div
        v-for="i in 20"
        :key="i"
        class="particle"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 10 + 10}s`
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* ベーススタイル */
.deco27-intro {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 背景グラデーション */
.background-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #1a1a2e, #16213e, #0f3460);
  z-index: 0;
}

/* 画像切り替えコンテナ */
.image-transition-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 1s ease-in-out;
  z-index: 1;
}

/* ページ全体のマージンとパディングを完全にリセット */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
}

/* ベースコンテナ - 重複スタイルを整理 */
.deco27-intro,
.image-transition-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* 画像コンテナ */
.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}

/* 強化された画像の自動調整 - 完全なカバレッジを確保 */
.fullscreen-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  max-width: none;
  max-height: none;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.7);
  transform: scale(1.01); /* わずかに拡大して端を完全に覆う */
  transform-origin: center center;
  backface-visibility: hidden;
  will-change: transform;
}

/* 画像オーバーレイ */
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  text-align: center;
}

/* 半透明な円形球体 */
.transparent-sphere {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(10px);
  box-shadow: 0 0 50px rgba(255, 255, 255, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 10;
  transition: transform 0.5s ease-out, box-shadow 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.transparent-sphere:hover {
  box-shadow: 0 0 70px rgba(255, 255, 255, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.3);
  transform: scale(1.05) translate(var(--mouse-x, 0)px, var(--mouse-y, 0)px);
}

/* 球体の内容 */
.sphere-content {
  text-align: center;
  color: white;
}

.sphere-text {
  font-size: 3rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.sphere-subtext {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.8;
}

/* パーティクルエフェクト */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  opacity: 0.5;
  animation: float 15s infinite linear;
}

/* パーティクルのアニメーション */
@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-1000px) translateX(100px);
    opacity: 0;
  }
}

/* 球体のフェードアウトアニメーション */
.fade-out {
  animation: fadeOut 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}

/* 画像のパン効果 - 視覚的な動きを追加 */
.first-image .fullscreen-image {
  animation: panImage 20s linear infinite alternate;
}

.second-image .fullscreen-image {
  animation: panImage 25s linear infinite alternate;
}

@keyframes panImage {
  0% {
    transform: scale(1.01) translate(0, 0);
  }
  100% {
    transform: scale(1.01) translate(2%, 2%);
  }
}

/* モバイル対応 */
@media (max-width: 768px) {
  .transparent-sphere {
    width: 200px;
    height: 200px;
  }

  .sphere-text {
    font-size: 2rem;
  }

  .sphere-subtext {
    font-size: 1rem;
  }
}
</style>
