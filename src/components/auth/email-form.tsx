"use client";

import { checkAccountExists } from "@/actions/auth/check-account-exists";
import VerifyEmail from "@/components/auth/verify-email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SUCCESS_AUTH_REDIRECT_URL } from "@/utils/constants/auth";
import { signIn } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  page: "signin" | "signup";
};

export default function AuthEmailForm({ page }: Props) {
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const { executeAsync, isPending } = useAction(checkAccountExists, {
    onError: ({ error }) => {
      console.error("Error checking account existence:", error);
      toast.error(error.serverError);
    }
  });

  const { register, getValues } = useForm<{ email: string }>({
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = getValues();

    const result = await executeAsync({ email });
    if (!result?.data) return;

    // check if account exists before sending magic link
    const { accountExists } = result.data;
    if (page === "signup" && accountExists) {
      toast.error(
        "An account already exists with that email address. Please login."
      );
      return;
    }

    if (page === "signin" && !accountExists) {
      toast.error("No account found with that email address. Please sign up.");
      return;
    }

    setIsVerifyingEmail(true);

    const provider =
      process.env.NODE_ENV === "production" ? "resend" : "nodemailer";

    await signIn(provider, {
      email,
      redirectTo: SUCCESS_AUTH_REDIRECT_URL,
      redirect: false
    });
  };

  const submitButtonText = page === "signin" ? "Login" : "Create an account";

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register("email")}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Submitting..." : submitButtonText}
        </Button>
      </div>
      {isVerifyingEmail && <VerifyEmail />}
    </form>
  );
}
