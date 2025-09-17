<template>
  <div class="introduction-page">
    <!-- 淡蓝色背景 -->
    <div class="introduction-background"></div>
    
    <!-- 右侧社交媒体图标组件 -->
    <div class="social-media-container">
      <div class="social-icon-wrapper">
        <a href="https://x.com/deco27" target="_blank" rel="noopener noreferrer" class="social-icon">
          <img src="/image/twitter.png" alt="X (Twitter)" class="social-icon-inner">
        </a>
        <a href="https://space.bilibili.com/177291194?spm_id_from=333.337.0.0" target="_blank" rel="noopener noreferrer" class="social-icon">
          <img src="/image/bilibili.jpg" alt="Bilibili" class="social-icon-inner">
        </a>
        <a href="https://www.youtube.com/channel/UCGmO0S4S-AunjRdmxA6TQYg" target="_blank" rel="noopener noreferrer" class="social-icon">
          <img src="/image/youtube.jpg" alt="YouTube" class="social-icon-inner">
        </a>
      </div>
    </div>
    
    <!-- 毛ガラス効果の紹介コンテナ -->
    <div class="introduction-container">
      <h1 class="introduction-title">DECO*27（デコ・ニーナ）</h1>
      <div class="introduction-content">
        <p class="introduction-text">
          DECO*27（デコ・ニーナ）は、日本の著名な音楽プロデューサー、ボーカロイドPです。切なくもキャッチーなメロディと、現代的な恋愛観を切り取った親しみやすい歌詞が特徴的で、初音ミクをはじめとするボーカロイド楽曲で数多くのヒット作を生み出しています。
        </p>
        <p class="introduction-text">
          その活動は音楽にとどまらず、ライブやアーティストへの楽曲提供など、多岐にわたります。
        </p>
      </div>
    </div>

    <!-- タイムラインセクション -->
    <div class="timeline-section">
      <h2 class="timeline-title">代表曲</h2>
      <div class="timeline-container">
        <!-- タイムラインの縦線 -->
        <div class="timeline-line"></div>
        
        <!-- タイムラインアイテム -->
        <div class="timeline-item" v-for="(item, index) in timelineItems" :key="index" :class="{ 'timeline-item-left': index % 2 === 0, 'timeline-item-right': index % 2 !== 0 }">
          <div class="timeline-point"></div>
          <div class="timeline-image-container">
            <a :href="item.youtubeLink" target="_blank" rel="noopener noreferrer" class="timeline-image-link">
              <img :src="item.image" alt="DECO*27作品" class="timeline-image">
            </a>
          </div>
        </div>
        
        <!-- タイムラインの最後のハート -->
        <div class="timeline-heart-container">
          <div class="heart-text-container">
            <span class="heart-text-left">音楽の旅を</span>
            <span class="heart-icon" @click="showLikePopup = true">❤</span>
            <span class="heart-text-right">共に楽しもう</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- いいねポップアップ -->
    <div v-if="showLikePopup" class="like-popup-overlay" @click="closePopup">
      <div class="like-popup-content" @click.stop>
        <h3 class="like-title">いいね！</h3>
        <p class="like-text">DECO*27の音楽を気に入っていただけて嬉しいです！</p>
        <div class="like-count">
          <span class="count-number">{{ likeCount }}</span>
          <span class="count-text">人がいいねしました</span>
        </div>
        <button class="like-button" @click="addLike">
          いいねする
        </button>
        <button class="close-button" @click="closePopup">
          閉じる
        </button>
      </div>
    </div>
    
    <!-- ページナビゲーション -->
    <div class="page-nav">
      <button 
        class="back-button"
        @click="goBack"
      >
        最初に戻る
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import '../assets/introduction-styles.css'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// タイムラインアイテムデータ
import image3 from '@/../image/3.png'
import image4 from '@/../image/4.png'
import image5 from '@/../image/5.png'
import image6 from '@/../image/6.png'
import image7 from '@/../image/7.png'
import image8 from '@/../image/8.png'

const timelineItems = [
  { 
    image: image3, 
    youtubeLink: 'https://www.youtube.com/watch?v=e1xCOsgWG0M'
  },
  { 
    image: image4, 
    youtubeLink: 'https://www.youtube.com/watch?v=eSW2LVbPThw'
  },
  { 
    image: image5, 
    youtubeLink: 'https://www.youtube.com/watch?v=-H2PCK7DJsQ'
  },
  { 
    image: image6, 
    youtubeLink: 'https://www.youtube.com/watch?v=BI9Ue6JwJic'
  },
  { 
    image: image7, 
    youtubeLink: 'https://www.youtube.com/watch?v=C-CYwNz3z8w'
  },
  { 
    image: image8, 
    youtubeLink: 'https://www.youtube.com/watch?v=kbNdx0yqbZE'
  }
]

// ポップアップといいねの状態
import { ref } from 'vue'
const showLikePopup = ref(false)
const likeCount = ref(125)

// ポップアップを閉じる
const closePopup = () => {
  showLikePopup.value = false
}

// いいねを追加する
const addLike = () => {
  likeCount.value++
  // 少しのアニメーション効果
  const button = document.querySelector('.like-button')
  if (button) {
    button.classList.add('liked')
    setTimeout(() => {
      button.classList.remove('liked')
      closePopup()
    }, 1500)
  }
}
</script>