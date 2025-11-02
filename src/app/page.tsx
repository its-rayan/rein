import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="bg-black">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Rein logomark"
          width={64}
          height={64}
        />
        <h1>hello world</h1>
        <Button>Click me</Button>
      </main>
    </div>
  );
}
