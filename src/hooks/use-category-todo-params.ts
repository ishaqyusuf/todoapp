import { useParams } from "next/navigation";

export function useCategoryTodoParams() {
  const paarams = useParams();
  const [categorySlug, todoId] = paarams?.categorySlugAndTodoId ?? [];
  return { categorySlug, todoId };
}
