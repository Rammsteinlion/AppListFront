<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import store from "@/store/store";
import TaskList from "@/components/TaskList.vue";
import { getTaskService, onGetDataTask, onAddSaveTask } from "@/services";

interface Params {
  created_at?: string;
  category?: number;
  state?: number;
  priority?: number;
  description?: string;
}

const params = reactive<Params>({
  created_at: undefined,
  category: undefined,
  state: undefined,
  priority: undefined,
  description: '',
});

const dataTask = reactive<{ data: Params[] }>({ data: [] });

const descriptionTask = ref<string>("");

onMounted(() => {
  // onGetTask();
});

const onAddTask = async (): Promise<void> => {
  
  if (Object.entries(params).length > 0 && params['description'] !="") {
    const date = getCurrentDateTime();
    params.created_at = date;
    params.category = 3;
    params.state = 1;
    params.priority = 1;

    const newTask = { ...params };

    dataTask.data.push(newTask);
    // const response = await onAddSaveTask(newTask);
    // console.log(response, 'RESPUESTA');

    // Clear the input fields
    params.description = '';
    descriptionTask.value = '';
    
    // const response = await onAddSaveTask(params);
    // console.log(response, 'RESPUESTA');
  }
};

const oninputField = (key: keyof Params, event: Event): void => {
  const target = event.target as HTMLInputElement;
  params.description! = target.value;
}


const getDataTask = async (): Promise<void> => {
  const getTask = await onGetDataTask();
  console.log(getTask.config.data);
};

const getCurrentDateTime = (): string => {
  const now = new Date();

  // Extract date components
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  // Extract time components
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Format date and time
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate} ${formattedTime}`;
};

const onDelete = (valueIndex: number) => {};
</script>

<template>
  <div class="home-background bg-[#E3F2FD]">
    <div class="wrapper">
      <header>Todo App</header>
      <div class="flex flex-col gap-[1em] w-full h-full">
        <!-----INPUT ADD-->
        <div class="inputField flex gap-1">
          <input
            type="text"
            placeholder="Add your new todo"
            v-model="descriptionTask"
            @keyup.enter="onAddTask()"
            @input="oninputField('description', $event)"
          />
          <button
            class="w-[50px] h-[100%] bg-[#721ce3] hover:bg-[#8e49e8] hover:scale-[1.1] rounded-md text-white"
            @click.stop="onAddTask()"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <!----BUTTONS--->
        <div class="flex justify-center items-center">
          <input
            type="button"
            class="text-white bg-green-400 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            value="Iniciadas"
          />
          <input
            type="button"
            class="text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            value="Terminadas"
          />
          <input
            type="button"
            class="text-white bg-orange-300 hover:bg-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            value="Eliminadas"
          />
        </div>
        <!----BUTTONS-->

        <!----TASK-->
        <div class="containerList h-[270px] overflow-y-scroll">
          <ul class="todoList flex flex-col gap-[0.65em]">
            <li class="flex flex-col gap-2">
              <task-list @on-delete="onDelete"  
              v-for="(item, index) in dataTask.data" :key="index"
              :data-value="item"
              :value-index="index"
              />
            </li>
          </ul>
        </div>
        <!----TASK-->

        <div class="footer">
          <span>You have <span class="pendingTasks"></span> pending tasks</span>
          <button @click.stop="getDataTask">Clear All</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-background {
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  background: #fff;
  max-width: 400px;
  width: 100%;
  height: 36em;
  padding: 25px;
  border-radius: 5px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  margin: 20px;
  display: flex;
  flex-direction: column; /* Para que los elementos dentro del wrapper se apilen verticalmente */
  justify-content: center; /* Para centrar verticalmente el contenido */
}

.wrapper header {
  font-size: 30px;
  font-weight: 600;
}

.wrapper .inputField {
  margin: 20px 0;
  width: 100%;
  display: flex;
  height: 45px;
}

.inputField input {
  width: 85%;
  height: 100%;
  outline: none;
  border-radius: 3px;
  border: 1px solid #ccc;
  font-size: 17px;
  padding-left: 15px;
  transition: all 0.3s ease;
}

.inputField input:focus {
  border-color: #8e49e8;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
}

.footer button {
  background: #8e49e8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.todoList li .icon {
  position: absolute;
  right: -45px;
  top: 50%;
  transform: translateY(-50%);
  background: #e74c3c;
  width: 45px;
  text-align: center;
  color: #fff;
  padding: 10px 15px;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.containerList {
  position: relative;
}

.containerList::-webkit-scrollbar {
  height: 8px;
}

.containerList::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.containerList::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

.containerList::-webkit-scrollbar-thumb:active {
  background-color: #999999;
}

.containerList::-webkit-scrollbar-track {
  background: #e1e1e1;
  border-radius: 4px;
}

.containerList::-webkit-scrollbar-track:hover,
.containerList::-webkit-scrollbar-track:active {
  background: #d4d4d4;
}

.todoList {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
