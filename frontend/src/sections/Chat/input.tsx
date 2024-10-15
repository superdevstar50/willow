import { requestMessage } from "@/apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/store";
import { Loader2 } from "lucide-react";
import { useCallback, useState } from "react";

export function ChatInput() {
  const { toast } = useToast();

  const [text, setText] = useState("");

  const messages = useStore((state) => state.messages);
  const setMessages = useStore((state) => state.setMessages);

  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(
    async (message: string) => {
      setMessages([...messages, { sent: true, message }]);

      setLoading(true);
      try {
        setMessages([
          ...messages,
          { sent: true, message },
          { sent: false, message: await requestMessage(message) },
        ]);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Error occured while processing your message",
        });
      } finally {
        setLoading(false);
      }
    },
    [messages, setMessages, toast]
  );

  const handleSend = useCallback(() => {
    if (!text) {
      return;
    }

    sendMessage(text);
    setText("");
  }, [sendMessage, text]);

  return (
    <div className="w-full flex gap-2 p-1">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button type="submit" onClick={handleSend} disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? "Sending" : "Send"}
      </Button>
    </div>
  );
}
