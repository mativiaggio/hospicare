import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <>
      <Input />
      <div className="flex flex-col gap-1">
        <Button variant={"primary"}>Default</Button>
        <Button variant={"destructive"}>Destructive</Button>
        <Button variant={"ghost"}>Ghost</Button>
        <Button variant={"link"}>Link</Button>
        <Button variant={"outline"}>Outline</Button>
        <Button variant={"secondary"}>Secondary</Button>
        <Button variant={"muted"}>Muted</Button>
        <Button variant={"teritary"}>Teritary</Button>
      </div>
    </>
  );
}
