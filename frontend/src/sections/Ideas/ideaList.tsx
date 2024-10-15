import { fetchIdeas } from "@/apis";
import { useStore } from "@/store";
import { useEffect } from "react";

export function IdeaList() {
  const ideas = useStore((state) => state.ideas);
  const setIdeas = useStore((state) => state.setIdeas);

  useEffect(() => {
    (async () => {
      setIdeas(await fetchIdeas());
    })();
  }, [setIdeas]);

  return (
    <div className="flex flex-col gap-2 py-4">
      {ideas.map((idea) => (
        <div key={idea}>{idea}</div>
      ))}
    </div>
  );
}
