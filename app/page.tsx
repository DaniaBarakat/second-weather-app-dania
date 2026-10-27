import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

function SubmitButton() {
  return (
    <Button type="submit">
      <Search className="h-4 w-4" />
    </Button>
  );
}

export default function Home() {
  const handleSearch = () => {
    console.log("Search submitted");
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <form action={handleSearch} className="flex gap-2">
          <Input 
          name="city"
          type="text"
          placeholder="Enter city name"
          className="bg-white/90"
          required
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
