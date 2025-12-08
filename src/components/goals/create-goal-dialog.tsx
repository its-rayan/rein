"use client";

import { createGoalAction } from "@/actions/goals/create-goal";
import CreateGoalForm, {
  CREATE_GOAL_FORM_ID
} from "@/components/goals/create-goal-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { createGoalSchema, CreateGoalType } from "@/data/goal/goal.dto";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateGoalDialog() {
  const queryClient = getQueryClient();

  const [open, setOpen] = useState(false);

  const { executeAsync, isPending } = useAction(createGoalAction, {
    onError: ({ error }) => {
      console.error("Error checking account existence:", error);
      toast.error(error.serverError);
    }
  });

  const form = useForm<CreateGoalType>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      name: "",
      description: "",
      deadline: undefined
    }
  });

  const resetForm = () => {
    form.reset();
  };

  const toggleDialog = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetForm();
    }
  };

  const onSubmit = async (data: CreateGoalType) => {
    const result = await executeAsync(data);
    if (!result?.data) return;

    const { goal } = result.data;

    console.log("goal: ", goal);
    queryClient.invalidateQueries({ queryKey: ["goals"] });
    toast.success(`Successfully created ${goal.name} goal`);
    toggleDialog(false);
  };

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="cursor-pointer rounded-full capitalize"
        >
          <Plus />
          New goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Goal</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <CreateGoalForm form={form} onSubmit={onSubmit} />

        <DialogFooter>
          <Field orientation="horizontal">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => resetForm()}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              form={CREATE_GOAL_FORM_ID}
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
