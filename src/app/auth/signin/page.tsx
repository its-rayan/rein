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

export default function SignInPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <AuthEmailForm page="signin" />
        <AuthMethodsSeparator />
        <GoogleOAuth />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-center gap-1 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="cursor-pointer underline">
            Sign Up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
