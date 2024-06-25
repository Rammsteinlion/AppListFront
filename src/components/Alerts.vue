<script setup lang="ts"></script>
<template>
  <div class="toast">
    <div class="toast-content">
      <i class="fas fa-solid fa-check check"> </i>

      <div class="message">
        <div class="text text-1">Success</div>
        <div class="text text-2">Your Changes ahs been saved</div>
      </div>
    </div>
    <i class="fa-solid fa-xmark close"></i>

    <div class="progress"></div>
  </div>
</template>

<style scoped>
.toast {
  position: absolute;
  top: 25px;
  right: 30px;
  border-radius: 12px;
  background: #fff;
  padding: 20px 35px 20px 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  border-left: 6px solid #4070f4;
}

.toast .toast-content {
  display: flex;
  align-items: center;
}

.toast-content .check {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  background: #4070f4;
  color: #fff;
  border-radius: 50%;
}

.toast-content .message {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
}

.message{
    font-size: 20px;
    font-weight: 400;
    color: #66666666;
}

.message .text.text-1{
    font-weight: 600;
    color: #3333;
}

.toast .close{
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
}

.close:hover{
    opacity: 1;
    scale: 1.1;
}

</style>
