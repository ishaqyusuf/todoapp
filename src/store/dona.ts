import { persist, createJSONStorage } from "zustand/middleware";
import { formatDate } from "date-fns";

import {
  Calendar,
  Car,
  CheckCircle,
  Home,
  ShoppingBag,
  MessageCircleCode,
  Info,
  CircleArrowOutUpRight,
} from "lucide-react";

import { create } from "zustand";

// data type
export type DonaState = {
  // for the side bar
  categories: {
    title: string;
    // Icon?: "home"| "completed";
    icon?: string;
    color?: string;
    id: string;
    slug: string;
  }[];
  //  for the todos
  todos: {
    id?: string | null | undefined;
    categoryId?: string | null | undefined;
    title: string;
    note?: string | null | undefined;
    // status: "pending" | "completed";
    isCompleted?: boolean;
    dueDate?: Date | null | undefined;
  }[];
  form: any;
  // menueItems: {
  //   title: string;
  //   subtitle?: string | null | undefined;
  //   icon: string;
  //   id: string;
  //   content?: string | null | undefined;
  //   contentlink?: string | null;
  //   contentend?: string | null | undefined;
  // }[];
  // LegalItemTabs: {
  //   title: string;
  //   id: string;
  //   content: string;
  // }[];
};
// action to be performed
type Actions = {
  updateTodo: (todo: DonaState["todos"][number]) => void;
  updateCategory: (category: DonaState["categories"][number]) => void;
  deleteTodo: (id: string) => void;
  removeAllTodo: (id: string) => void;
  deleteCategory: (id: string) => void;
  duplicateTodo: (id: string) => void;
  completeTodo: (id: string) => void;
  updateForm: (form: DonaState["form"][any]) => void;
  resetForm: () => void;
};

export const useDonaStore = create<DonaState & Actions>()(
  persist(
    (set) => ({
      categories: [
        {
          title: "Home",
          id: "1",
          icon: "home",
          slug: "home",
        },

        {
          title: "Completed",
          id: "2",
          icon: "completed",
          slug: "completed",
        },

        {
          title: "Today",
          id: "3",
          icon: "today",
          slug: "today",
        },
        {
          title: "Personal",
          id: "4",
          color: "purple",
          slug: "personal",
        },
        {
          title: "Work",
          id: "5",
          color: "blue",
          slug: "work",
        },
        {
          title: "Errand",
          id: "6",
          icon: "errand",
          slug: "errand",
        },
        {
          title: "Road trip List",
          id: "7",
          icon: "roadTripList",
          slug: "road-trip-list",
        },
      ],
      todos: [
        {
          title: "Wash the dishes",
          id: "1",
          categoryId: "4",
        },
        {
          title: "Cook beans",
          id: "2",
          categoryId: "4",
        },
        {
          title: "Cook",
          id: "3",
          dueDate: new Date(),
          //   categoryId: "2",
        },
        {
          title: "Buy books",
          id: "4",
          categoryId: "3",
        },
        {
          title: "Create account",
          id: "5",
          //   categoryId: "2"
          isCompleted: true,
        },
        {
          title: "Arrange",
          id: "6",
          categoryId: "6",
          dueDate: new Date(),
        },
      ],
      form: {},

      updateForm: (form) =>
        set((oldState) => ({
          ...oldState,
          form: { ...oldState.form, ...form },
        })),
      resetForm: () => set((oldState) => ({ ...oldState, form: {} })),
      updateTodo: (todo) =>
        set((oldState) => {
          // return oldState;
          // const state = { ...oldState };
          // const state = JSON.parse(JSON.stringify(oldState));
          // console.log({ state });
          if (!todo.id) {
            todo.id = formatDate(new Date(), "yMdHT");
          }
          const index = oldState.todos.findIndex((t) => t.id == todo.id);
          // if (index > -1) {
          //   // state.todos[index].title =todo.title;
          //   state.todos[index] = todo;
          // } else {
          //   console.log("saving todo", todo);
          //   state.todos.unshift(todo);
          // }

          // return state;
          const todos = [...oldState.todos];
          if (index == -1) todos.unshift(todo);
          else {
            // index match found, update todo
            //get old todo
            const oldTodo = todos[index];
            // if you are performing full update
            // todos[index] = todo;

            //when performing partial update;
            const updatedTodo = {
              ...oldTodo,
              ...todo,
            };

            // if(todo.dueDate)updatedTodo.dueDate = todo.dueDate;
            // if("isCompleted" in todo)
            //   updatedTodo.isCompleted = todo.isCompleted;

            // ['dueDate','isCompleted','categoryId','note']
            // .map(todoKey => {
            //   if(todoKey in todo)
            //     updatedTodo[todoKey] = todo[toodKey]
            // })

            todos[index] = updatedTodo;

            //   todos[index] = {
            //   ...todos[index],
            //   ...todo,
            // };
          }
          const state = {
            ...oldState,
            todos, //: [todo, ...oldState.todos],
          };
          return state;
        }),
      // update categories
      updateCategory: (category) =>
        set((oldCategoryState) => {
          if (!category.id) {
            category.id =
              formatDate(new Date(), "yMdHT") +
              Math.random().toString(36).substring(2, 9);
          }
          if (!category.slug) {
            category.slug = category.title;
          }
          const categoryIndex = oldCategoryState.categories.findIndex(
            (c) => c.id == category.id,
          );
          const categories = [...oldCategoryState.categories];
          if (categoryIndex == -1) categories.push(category);
          else {
            categories[categoryIndex] = {
              ...categories[categoryIndex],
              ...category,
            };
          }
          const state = {
            ...oldCategoryState,
            categories,
          };
          return state;
        }),
      // complete todo
      completeTodo: (id: string) =>
        set((state) => ({
          ...state,
          todos: state.todos.map((todo) =>
            todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
          ),
        })),
      // delete todo
      deleteTodo: (id: string) =>
        set((state) => ({
          ...state,
          todos: state.todos.filter((t) => t.id !== id),
        })),
      deleteCategory: (id: string) =>
        set((state) => ({
          ...state,
          categories: state.categories.filter((c) => c.id !== id),
          todos: state.todos.filter((todo) => todo.categoryId !== id),
        })),
      removeAllTodo: (id: string, slug?: string) =>
        set((state) => ({
          ...state,
          todos: state.todos.filter((todo) => {
            if (slug === "completed") {
              return !todo.isCompleted;
            }
            return todo.categoryId !== id;
          }),
        })),
      duplicateTodo: (id: string) =>
        set((state) => {
          // to locate the task that will be dupicated
          const todoToDuplicate = state.todos.find((t) => t.id === id);

          if (!todoToDuplicate) return state;

          // the duplicated task
          const duplicatedTodo = {
            ...todoToDuplicate,
            title: `${todoToDuplicate.title}`,
            id:
              formatDate(new Date(), "yMdHT") +
              Math.random().toString(36).substring(2, 9),
          };

          return {
            ...state,
            todos: [duplicatedTodo, ...state.todos],
          };
        }),
    }),
    {
      name: "donna23",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
