"use client";

import { cn } from "@/lib/utils";
import { getFormattedCurrentDate } from "@/utils/datetime/get-current-date";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TasksPage() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      tasks: "10 min run time",
      completed: false,
      goal: {
        id: "001",
        name: "👟 Run a 5K Race",
        bgColor: "00A6F4"
      }
    },
    {
      id: 2,
      tasks: "Create wireframes in Figma",
      completed: false,
      goal: {
        id: "002",
        name: "📱 Build a mobile app",
        bgColor: "615FFF"
      }
    },
    {
      id: 3,
      tasks: "Find and optimize 3 images for blog post",
      completed: false,
      goal: {
        id: "003",
        name: "Launch personal blog",
        bgColor: "00C950"
      }
    }
  ]);

  const toggleTask = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-6">
        {/* header */}
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col">
            <p className="text-muted-foreground text-sm">
              {getFormattedCurrentDate()}
            </p>
            <h1 className="text-xl font-medium">Today&apos;s Todos</h1>
          </div>

          <h1>Progress bar</h1>
        </div>

        {/* Todos */}
        <div className="flex flex-col gap-2">
          {todos?.map((todo) => {
            return (
              <div
                onClick={() => toggleTask(todo.id)}
                key={todo.id}
                className={"flex items-center justify-between"}
              >
                <div
                  className={cn("flex items-center gap-2", {
                    "text-muted-foreground line-through": todo.completed
                  })}
                >
                  <div
                    className={cn("relative h-6 w-6 rounded-sm border", {
                      "flex items-center justify-center bg-green-600 text-white":
                        todo.completed
                    })}
                  >
                    {todo.completed && <Check size={16} />}
                  </div>
                  <p className="text-lg">{todo.tasks}</p>
                </div>

                <Link
                  href={`/goals/${todo.goal.id}`}
                  style={{ backgroundColor: `#${todo.goal.bgColor}` }}
                  className="rounded-full px-2 py-1 text-sm text-white"
                >
                  {todo.goal.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
