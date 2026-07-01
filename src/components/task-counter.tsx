"use client";
import { useDonaStore } from "@/store/dona";

export default function TaskCounter() {
  const task = useDonaStore((state) => state.todos).filter(
    (todo) => !todo.isCompleted,
  ).length;
  return <span>{task}</span>;
}
