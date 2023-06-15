import create, { State, SetState } from 'zustand';

interface Task {
  id: number;
  title: string;
}

interface TaskStore  {
  tasks: Task[];
  searchTask: (title: string) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: number, newTitle: string) => void;
  deleteTask: (taskId: number) => void;
}

type TaskStoreSetter = SetState<TaskStore>;

const useTaskStore = create<TaskStore>((set: TaskStoreSetter) => ({
  tasks: [],

  searchTask: (title: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.title.includes(title)),
    }));
  },

  addTask: (task: Task) => {
    set((state) => ({
      tasks: [...state.tasks, task],
    }));
  },

  updateTask: (taskId: number, newTitle: string) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      ),
    }));
  },

  deleteTask: (taskId: number) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));

const useTaskManager = (): TaskStore => {
  const { tasks, searchTask, addTask, updateTask, deleteTask } = useTaskStore();

  return {
    tasks,
    searchTask,
    addTask,
    updateTask,
    deleteTask,
  };
};

export { useTaskManager };
