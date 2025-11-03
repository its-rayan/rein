import { auth } from "@/auth";
import SignOutButton from "@/components/auth/signout-button";
import UserAvatar from "@/components/auth/user-avatar";

export default async function TasksPage() {
  const session = await auth();

  console.log("TasksPage session:", session);

  return (
    <div className="flex max-w-md flex-col gap-6">
      <div>
        <h1>Tasks Page</h1>
        <p>Name: {session?.user?.name}</p>
        <p>Email: {session?.user?.email}</p>
        <p>Image: {session?.user?.image}</p>

        <UserAvatar url={session?.user?.image} name={session?.user?.name} />
      </div>
      <div>
        <SignOutButton />
      </div>
    </div>
  );
}
