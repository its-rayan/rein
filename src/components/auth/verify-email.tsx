import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

export default function VerifyEmail() {
  return (
    <Alert className="mt-4 border-2 border-green-200 bg-green-100">
      <CheckCircle2Icon color="green" />
      <AlertTitle>Check your email</AlertTitle>
      <AlertDescription>
        A sign in link has been sent to your email address.
      </AlertDescription>
    </Alert>
  );
}
