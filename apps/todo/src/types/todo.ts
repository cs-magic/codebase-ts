export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const initialTodos: Todo[] = [
  { id: 1, text: '创建 Todo 应用', completed: false },
  { id: 2, text: '部署应用', completed: false },
  { id: 3, text: 'XZXXX', completed: false },
];