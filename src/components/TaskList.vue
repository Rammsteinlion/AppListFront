<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    dataValue: { [key: string]: any };
    valueIndex:number
  }>(),
  {}
);

const emits = defineEmits<{
  (e: "onDelete", valueIndex: number): void;
  (e: "onCheck", onCheckTask: boolean): void;
}>();

const data = reactive<{data:{}}>({data:{}})


const taskCompleted = ref<boolean>(false);

const completeTask = (): void => {
  taskCompleted.value = !taskCompleted.value
  emits('onCheck', taskCompleted.value);
};

const onDelete = (valueIndex: number) => {
  emits("onDelete", valueIndex);
};

onMounted(()=>{
  console.log(props.dataValue);
  
})

</script>
<template>
  <div
    class="flex items-center gap-4 bg-[#F2F3F4] shadow-[0_4px_4px_0px_rgba(0,0,0,0.10)] rounded-lg h-[4em] px-3"
  >
    <input type="checkbox" name="" id="" @click="completeTask" :key="valueIndex"/>
    <div class="flex flex-col gap-1">
      <span :class="['font-medium truncate', { 'line-through': taskCompleted }]"
        >{{ dataValue['description'] }}</span
      >
      <small><strong>Fecha de creación:</strong> {{ dataValue['created_at'] }} </small>
    </div>
    <div
      class="ml-auto hover:scale-[1.1] cursor-pointer"
      @click="onDelete(11)"
    >
      <i class="fa-solid fa-trash-can"></i>
    </div>
  </div>
</template>
<style scoped>
/**TASK */
.line-through {
  text-decoration: line-through;
}
</style>
