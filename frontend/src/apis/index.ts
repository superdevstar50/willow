const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const fetchIdeas = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/api/ideas`, {
      method: "GET",
    });
    const data = await response.json();
    return data.ideas;
  } catch {
    return [];
  }
};

export const resetData = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/api/reset`, {
      method: "DELETE",
    });

    const res = await response.json();
    return res.success;
  } catch {
    return false;
  }
};

export const requestMessage = async (message: string): Promise<string> => {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (response.status !== 200) {
    throw new Error();
  }

  const data = await response.json();
  return data.response;
};
