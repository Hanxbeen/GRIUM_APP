<template>
  <div class="load-wrapp">
    CI/CD TEst
    <div class="load-9">
      <div class="spinner">
        <div class="bubble-1"></div>
        <div class="bubble-2"></div>
      </div>
    </div>
  </div>
</template>
<style>
.load-wrapp {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  float: left;
  width: 500px;
  height: 500px;
  /* margin: 0 10px 10px 0;
  padding: 20px 20px 20px; */
  border-radius: 5px;
  text-align: center;
  background-color: #ebe6e6;
}

.load-wrapp:last-child {
  margin-right: 0;
}

/* 회전 반경 */
.spinner {
  position: relative;
  left: 40%;
  bottom: 10%;
  width: 100px;
  height: 100px;
}

/* 원 크기 */
.bubble-1,
.bubble-2 {
  position: absolute;
  top: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: #33bdaf;
}

.bubble-2 {
  top: auto;
  bottom: 0;
}

/* =Animate the stuff
------------------------ */

.load-9 .spinner {
  animation: loadingI 2s linear infinite;
}
.load-9 .bubble-1,
.load-9 .bubble-2 {
  animation: bounce 2s ease-in-out infinite;
}
.load-9 .bubble-2 {
  animation-delay: -1s;
}

@keyframes loadingI {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
