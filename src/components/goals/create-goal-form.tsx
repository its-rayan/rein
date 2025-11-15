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

export default function CreateGoalForm({
  form,
  onSubmit
}: {
  form: UseFormReturn<CreateGoalType>;
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
              <FieldLabel htmlFor="name">Description</FieldLabel>

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
              <FieldLabel htmlFor="name">Deadline</FieldLabel>

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
      </FieldGroup>
    </form>
  );
}
