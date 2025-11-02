import AuthMethodsSeparator from "@/components/auth/auth-methods-separator";
import AuthEmailForm from "@/components/auth/email-form";
import GoogleOAuth from "@/components/auth/google-oauth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <AuthEmailForm page="signup" />
        <AuthMethodsSeparator />
        <GoogleOAuth />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-center gap-1 text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="cursor-pointer underline">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
