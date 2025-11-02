import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  page: "signin" | "signup";
};

export default function AuthEmailForm({ page }: Props) {
  const submitButtonText = page === "signin" ? "Login" : "Create an account";
  return (
    <form>
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        <Button type="submit" className="w-full">
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
}
