<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";

const props = withDefaults(
  defineProps<{
    isOPen: boolean;
    time?: number;
  }>(),
  {
    isOPen: false,
  }
);

const emit = defineEmits<{
  (e: "update", isOpen: boolean): void;
}>();

const isOpen = ref<boolean>(props.isOPen);

onMounted(() => {

});

const resetProgressBar = async () => {
  const progress = document.querySelector(".progress") as HTMLElement;
  if (progress) {
    progress.classList.remove("active");
    await nextTick();
    progress.classList.add("active");
  }
};

const onCloseAlert = async (): Promise<void> => {
  const progress = document.querySelector(".progress") as HTMLElement;
  if (progress) {
    progress.classList.remove("active");
  }

  emit("update", false);
  await resetProgressBar();
};
</script>
<template>
  <div :class="['toast z-20']">
    <div class="toast-content">
      <i class="fas fa-solid fa-check check"> </i>

      <div class="message">
        <div class="text text-1">Success</div>
        <div class="text text-2">Your Changes ahs been saved</div>
      </div>
    </div>
    <i class="fa-solid fa-xmark close" @click.stop="onCloseAlert"></i>

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
  overflow: hidden;
  /* transform: translateX(calc(100% + 30px)); */
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
}

.toast .toast-content {
  display: flex;
  align-items: center;
}

.toast.active {
  transform: translateX(0%);
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
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

.message {
  font-size: 20px;
  font-weight: 400;
  color: #66666666;
}

.message .text.text-1 {
  font-weight: 600;
  color: #3333;
}

.toast .close {
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 5px;
  cursor: pointer;
  opacity: 0.7;
}

.toast .close:hover {
  opacity: 1;
  scale: 1.1;
}

.toast .progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: #ddd;
}

.toast .progress::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 50px;
  height: 100%;
  width: 100%;
  background-color: #4070f4;
  transition: none;
}

.progress.active::before {
  animation: progress 5s linear forwards;
}

@keyframes progress {
  0% {
    right: 0;
  }
  100% {
    right: 100%;
  }
}
</style>
