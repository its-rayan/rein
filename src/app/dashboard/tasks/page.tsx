/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { getFormattedCurrentDate } from "@/utils/datetime/get-current-date";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ProgressBar = ({ todos, length }: any) => {
  const percentage = Math.floor((todos.length / length) * 100);

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-1">
        <div
          className={cn("h-5 w-5 rounded-sm bg-neutral-300", {
            "bg-green-600": percentage >= 10
          })}
        ></div>
        <div
          className={cn("h-5 w-5 rounded-sm bg-neutral-300", {
            "bg-green-600": percentage >= 20
          })}
        ></div>
        <div
          className={cn("h-5 w-5 rounded-sm bg-neutral-300", {
            "bg-green-600": percentage >= 30
          })}
        ></div>
        <div
          className={cn("h-5 w-5 rounded-sm bg-neutral-300", {
            "bg-green-600": percentage >= 40
          })}
        ></div>
        <div
          className={cn("h-5 w-5 rounded-sm bg-neutral-300", {
            "bg-green-600": percentage >= 50
          })}
        ></div>
        <div
          className={cn("h-5 w-5 rounded-sm bg-neutral-300", {
            "bg-green-600": percentage >= 60
          })}
        ></div>
        <div
          className={cn("h-5 w-5 rounded-sm bg-neutral-300", {
            "bg-green-600": percentage >= 70
          })}
        ></div>
        <div
          className={cn("h-5 w-5 rounded-sm bg-neutral-300", {
            "bg-green-600": percentage >= 80
          })}
        ></div>
        <div
          className={cn("h-5 w-5 rounded-sm bg-neutral-300", {
            "bg-green-600": percentage >= 90
          })}
        ></div>
        <div
          className={cn("h-5 w-5 rounded-sm bg-neutral-300", {
            "bg-green-600": percentage >= 100
          })}
        ></div>
      </div>

      <div className="text-muted-foreground text-sm">
        <span>{`${todos.length} / ${length} Tasks Completed`}</span>
      </div>
    </div>
  );
};

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

  const completedTodo = todos.filter((todo) => todo.completed);

  const toggleTask = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto flex w-3xl flex-col gap-6">
        {/* header */}
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col">
            <p className="text-muted-foreground text-sm">
              {getFormattedCurrentDate()}
            </p>
            <h1 className="text-xl font-medium">Today&apos;s Todos</h1>
          </div>

          <ProgressBar todos={completedTodo} length={todos.length} />
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
