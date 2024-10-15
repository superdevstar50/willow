import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCallback } from "react";
import { IdeaList } from "./ideaList";
import { resetData } from "@/apis";
import { useStore } from "@/store";
import { useToast } from "@/hooks/use-toast";

export function Ideas() {
  const { toast } = useToast();

  const setIdeas = useStore((state) => state.setIdeas);
  const setMessages = useStore((state) => state.setMessages);

  const handleReset = useCallback(async () => {
    if (await resetData()) {
      setIdeas([]);
      setMessages([]);
    } else {
      toast({
        title: "Error",
        description: "Error occured while reseting data",
      });
    }
  }, [setIdeas, setMessages, toast]);

  return (
    <Sheet>
      <SheetTrigger className="fixed right-0 top-1/3">
        <Button>Ideas</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ideas</SheetTitle>
          <SheetDescription>
            <Button className="w-full" onClick={handleReset}>
              Reset
            </Button>
            <IdeaList />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
