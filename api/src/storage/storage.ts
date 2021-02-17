export interface Item {
  data: any
  type: string
}

export interface Storage<T extends Item> {
  push(item: T): T;
  pop(): T | null;
  getAll(): T[];
}
