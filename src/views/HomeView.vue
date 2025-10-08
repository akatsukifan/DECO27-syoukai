<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// 画像を直接importする
import image1 from '/image/1.png'
import image2 from '/image/2.png'

// IntroductionViewで使用する画像のプリロード用URL
const introductionImages = [
  '/image/3.png',
  '/image/4.png',
  '/image/5.png',
  '/image/6.png',
  '/image/7.png',
  '/image/8.png'
]

// 状態管理
const isLoading = ref(false)
const currentImageIndex = ref(0)

const router = useRouter()

// マウスの位置に合わせて球体を動かす
const mouseX = ref(0)
const mouseY = ref(0)

// ページ遷移関数 - 2.pngへのアニメーション遷移を追加
const goToIntroduction = () => {
  if (isLoading.value) return
  
  isLoading.value = true
  
  try {
    // 2.pngに切り替えるアニメーション
    currentImageIndex.value = 1
    
    const sphereElement = document.querySelector('.transparent-sphere') as HTMLElement | null
    
    if (sphereElement) {
      // 球体にフェードアウトアニメーションを適用
      sphereElement.classList.add('fade-out')
    }
    
    // 画像切り替えと球体アニメーションの完了を待ってからページ遷移
    setTimeout(() => {
      router.push('/introduction')
      // 実際には遷移後にリセットされるが念のため
      setTimeout(() => {
        isLoading.value = false
        if (sphereElement) {
          sphereElement.classList.remove('fade-out')
        }
      }, 1000)
    }, 1000)
  } catch (error) {
    console.error('ページ遷移中にエラーが発生しました:', error)
    isLoading.value = false
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
  
  // 画像のプリロード
  const img1 = new Image()
  img1.src = image1
  
  const img2 = new Image()
  img2.src = image2
  
  // IntroductionViewの画像もあらかじめプリロードしておく
  // プリロードはバックグラウンドで非同期に行う
  introductionImages.forEach((url, index) => {
    const img = new Image()
    img.src = url
    img.onload = () => console.log(`主页预加载图片${index + 3}成功: ${url}`)
    img.onerror = () => console.error(`主页预加载图片${index + 3}失败: ${url}`)
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

    <!-- 画像コンテナ -->
    <div id="transition-container" class="image-transition-container">
      <!-- 背景画像1 -->
      <div class="image-container first-image" :class="{ 'active': currentImageIndex === 0 }">
        <img :src="image1" alt="Monitoring Best Friend Remix" class="fullscreen-image" />
        <div class="image-overlay"></div>
      </div>
      
      <!-- 背景画像2 -->
      <div class="image-container second-image" :class="{ 'active': currentImageIndex === 1 }">
        <img :src="image2" alt="DECO27 Second Image" class="fullscreen-image" />
        <div class="image-overlay"></div>
      </div>
    </div>

    <!-- 半透明な円形球体 -->
    <div
      class="transparent-sphere"
      @click="goToIntroduction"
      :style="{
        transform: `translate(${mouseX * 30}px, ${mouseY * 30}px)`,
        cursor: isLoading ? 'wait' : 'pointer'
      }"
    >
      <div class="sphere-content">
        <p class="sphere-text">DECO27</p>
        <p class="sphere-subtext">
          {{ isLoading ? '移動中...' : 'クリックして続ける' }}
        </p>
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
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

/* アクティブな画像の表示 */
.image-container.active {
  opacity: 1;
  z-index: 1;
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
