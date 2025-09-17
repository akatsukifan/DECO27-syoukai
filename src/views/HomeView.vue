<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// 画像の状態管理
const showFirstImage = ref(true)
const isTransitioning = ref(false)
const isSecondImageLoaded = ref(false)
const image1 = ref('/image/1.png')
const image2 = ref('/image/2.png')

const router = useRouter()

// 画像のプリロード関数
const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// 画像切り替えアニメーション
const switchImage = async () => {
  if (isTransitioning.value) return
  
  // 1.png -> 2.png -> 紹介ページ の一連の流れ
  isTransitioning.value = true
  
  // 2.pngのプリロードを開始
  if (!isSecondImageLoaded.value) {
    try {
      await preloadImage(image2.value)
      isSecondImageLoaded.value = true
    } catch (error) {
      console.error('画像のプリロードに失敗しました:', error)
    }
  }
  
  // フェードアウト - より明確なアニメーション
  const transitionElement = document.getElementById('transition-container')
  if (transitionElement) {
    transitionElement.style.transition = 'opacity 1s ease-out, transform 1s ease-out'
    transitionElement.style.opacity = '0'
    transitionElement.style.transform = 'scale(1.1)'
  }
  
  // 球体を即座に消失させる
  const sphereElement = document.querySelector('.transparent-sphere')
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
  
  isTransitioning.value = false
}

// 紹介ページに切り替える
const goToIntroduction = async () => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  
  // フェードアウト
  const transitionElement = document.getElementById('transition-container')
  if (transitionElement) {
    transitionElement.style.opacity = '0'
  }
  
  const sphereElement = document.querySelector('.transparent-sphere')
  if (sphereElement) {
    sphereElement.classList.add('fade-out')
  }
  
  // アニメーションの完了を待つ
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 紹介ページにルーティング
  router.push('/introduction')
  
  isTransitioning.value = false
}

// マウスの位置に合わせて球体を動かす
const mouseX = ref(0)
const mouseY = ref(0)

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
  
  // ページを離れるときにイベントリスナーを削除
  return () => {
    window.removeEventListener('mousemove', handleMouseMove)
  }
})
</script>

<template>
  <div class="deco27-intro">
    <!-- 背景グラデーション -->
    <div class="background-gradient"></div>
    
    <!-- 画像切り替えコンテナ -->
    <div 
      id="transition-container" 
      class="image-transition-container"
    >
      <!-- 最初の画像：Monitoring Best Friend Remix -->
    <div 
      v-if="showFirstImage" 
      class="image-container first-image"
    >
      <img 
        :src="image1" 
        alt="Monitoring Best Friend Remix" 
        class="fullscreen-image" 
        loading="eager"
      />
      <div class="image-overlay"></div>
    </div>
    
    <!-- 次の画像：モニタリング -->
    <div 
      v-else 
      class="image-container second-image"
      @click="switchImage"
      style="cursor: pointer;"
    >
      <img 
        :src="image2" 
        alt="モニタリング" 
        class="fullscreen-image"
        loading="lazy"
      />
      <div class="image-overlay"></div>
    </div>
    </div>
    
    <!-- 半透明な円形球体 -->
    <div 
      class="transparent-sphere" 
      @click="switchImage"
      :style="{
        transform: `translate(${mouseX * 30}px, ${mouseY * 30}px)`,
        cursor: isTransitioning ? 'wait' : 'pointer'
      }"
    >
      <div class="sphere-content">
        <p class="sphere-text">DECO27</p>
        <p class="sphere-subtext" v-if="showFirstImage">クリックして続ける</p>
        <p class="sphere-subtext" v-else>クリックして紹介を見る</p>
      </div>
    </div>
    
    <!-- パーティクルエフェクト -->
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle" :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 10 + 10}s`
      }"></div>
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

html, body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
}

/* ベースコンテナ - 重複スタイルを整理 */
.deco27-intro,
.image-transition-container,
.introduction-page {
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
.image-container,
.introduction-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}

/* 強化された画像の自動調整 - 重複定義を削除し、完全なカバレッジを確保 */
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

.image-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0 0 1rem 0;
}

.click-hint {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.9;
  }
}

/* 半透明な円形球体 */
.transparent-sphere {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 50px rgba(255, 255, 255, 0.3),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 10;
  transition: 
    transform 0.5s ease-out,
    box-shadow 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.transparent-sphere:hover {
  box-shadow: 
    0 0 70px rgba(255, 255, 255, 0.4),
    inset 0 0 40px rgba(255, 255, 255, 0.3);
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



/* ページナビゲーション */
.page-nav {
  position: absolute;
  bottom: 2rem;
  z-index: 20;
}

.back-button {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.back-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.back-button:disabled {
  opacity: 0.5;
  cursor: wait;
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
  
  .image-title {
    font-size: 1.5rem;
  }
}
</style>
