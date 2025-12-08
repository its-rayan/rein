/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CreateGoalType } from "@/data/goal/goal.dto";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

export const CREATE_GOAL_FORM_ID = "form-create-goal";

const GOAL_COLORS = [
  { name: "gray", value: "#6B7280", class: "bg-gray-500" },
  {
    name: "white",
    value: "#FFFFFF",
    class: "bg-white border-2 border-gray-300"
  },
  { name: "beige", value: "#F5DEB3", class: "bg-[#F5DEB3]" },
  { name: "blue", value: "#3B82F6", class: "bg-blue-500" },
  { name: "red", value: "#EF4444", class: "bg-red-500" },
  { name: "green", value: "#16A34A", class: "bg-green-600" },
  { name: "magenta", value: "#D946EF", class: "bg-fuchsia-500" },
  { name: "orange", value: "#F97316", class: "bg-orange-500" },
  { name: "yellow", value: "#EAB308", class: "bg-yellow-500" },
  { name: "lime", value: "#84CC16", class: "bg-lime-500" }
];

export default function CreateGoalForm({
  form,
  onSubmit
}: {
  form: UseFormReturn<any>;
  onSubmit: (data: CreateGoalType) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <form id={CREATE_GOAL_FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                defaultValue="Get Fit and Healthy"
                required
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Description</FieldLabel>

              <Textarea
                {...field}
                id="description"
                aria-invalid={fieldState.invalid}
                placeholder="Describe what you want to achieve"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="deadline"
          control={form.control}
          defaultValue={date}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="deadline">Deadline</FieldLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    id="deadline"
                    mode="single"
                    captionLayout="dropdown"
                    selected={date}
                    onSelect={(date) => {
                      setDate(date);
                      form.setValue("deadline", date);
                    }}
                  />
                </PopoverContent>
              </Popover>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="color"
          control={form.control}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="deadline">Color</FieldLabel>
              <div className="grid grid-cols-7 gap-3">
                {GOAL_COLORS.map((color) => (
                  <label
                    key={color.name}
                    className="cursor-pointer"
                    title={color.name}
                  >
                    <input
                      type="radio"
                      {...form.register("selectedColor")}
                      value={color.value}
                      className="peer sr-only"
                    />
                    <div
                      className={`size-8 rounded-full transition-all duration-200 ${color.class} peer-checked:scale-110 peer-checked:ring-4 peer-checked:ring-blue-400 peer-checked:ring-offset-2 peer-focus:ring-4 peer-focus:ring-blue-400 peer-focus:ring-offset-2 hover:scale-105 hover:shadow-lg`}
                      aria-label={`Select ${color.name} color`}
                    />
                  </label>
                ))}
              </div>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
