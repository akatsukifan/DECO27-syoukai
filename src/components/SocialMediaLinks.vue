<template>
  <div class="social-media-container">
    <div class="social-icon-wrapper">
      <a href="https://x.com/deco27" target="_blank" rel="noopener noreferrer" class="social-icon">
        <img src="/image/twitter.png" alt="X (Twitter)" class="social-icon-inner" />
      </a>
      <a
        href="https://space.bilibili.com/177291194?spm_id_from=333.337.0.0"
        target="_blank"
        rel="noopener noreferrer"
        class="social-icon"
      >
        <img src="/image/bilibili.jpg" alt="Bilibili" class="social-icon-inner" />
      </a>
      <a
        href="https://www.youtube.com/channel/UCGmO0S4S-AunjRdmxA6TQYg"
        target="_blank"
        rel="noopener noreferrer"
        class="social-icon"
      >
        <img src="/image/youtube.jpg" alt="YouTube" class="social-icon-inner" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.social-media-container {
  position: fixed !important;
  right: 2rem !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  z-index: 9999 !important;
  display: flex !important;
  justify-content: center !important;
  padding: 0.5rem !important;
  border-radius: 8px !important;
}

.social-icon-wrapper {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border-radius: 40px !important;
  padding: 1.5rem 0.8rem !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 1.5rem !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.social-icon {
  width: 45px !important;
  height: 45px !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.3s ease !important;
  text-decoration: none !important;

  pointer-events: auto !important;
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.1) !important;
}

.social-icon-inner {
  width: 70% !important;
  height: 70% !important;
  object-fit: contain !important;

  opacity: 1 !important;
  display: block !important;
}

@media (max-width: 768px) {
  .social-media-container {
    right: 1rem !important;
    display: flex !important;
  }

  .social-icon-wrapper {
    padding: 1rem 0.5rem !important;
    gap: 1rem !important;
  }

  .social-icon {
    width: 35px !important;
    height: 35px !important;
  }
}
</style>
