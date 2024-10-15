import { ChatHistory } from "./history";
import { ChatInput } from "./input";

export function Chat() {
  return (
    <div className="flex flex-col gap-2 min-w-[960px] min-h-full h-full">
      <ChatHistory />
      <ChatInput />
    </div>
  );
}
