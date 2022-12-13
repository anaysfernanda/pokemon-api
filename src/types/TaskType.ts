interface TaskType {
  title: string;
  description: number;
  id: number;
}

interface TaskSaveType {
  title: string;
  description: number;
}

export type { TaskType, TaskSaveType };
