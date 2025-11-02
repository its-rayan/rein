import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-accent flex min-h-screen flex-col">
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="dark:invert"
            src="/logo.svg"
            alt="Rein logomark"
            width={48}
            height={48}
          />
          <span className="text-xl font-semibold">Rein</span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </div>
  );
}
