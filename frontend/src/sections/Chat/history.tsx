import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { useStore } from "@/store";
import { useEffect, useRef } from "react";

export function ChatHistory() {
  const messages = useStore((state) => state.messages);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatMessageList className="w-full border rounded-lg overflow-auto h-full">
      {messages.map((message, index) => (
        <ChatBubble variant={message.sent ? "sent" : "received"} key={index}>
          <ChatBubbleAvatar fallback={message.sent ? "You" : "AI"} />
          <ChatBubbleMessage variant={message.sent ? "sent" : "received"}>
            {message.message}
          </ChatBubbleMessage>
        </ChatBubble>
      ))}
      <div ref={messageEndRef}></div>
    </ChatMessageList>
  );
}
