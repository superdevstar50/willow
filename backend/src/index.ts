import express, { Request, Response } from "express";
import { OpenAI } from "openai";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const ideas: string[] = [];
const messages: string[] = [];
let ideaSaved = false;

app.post("/api/chat", async (req: Request, res: Response) => {
  const { message } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "text-davinci-003",
      messages: [
        {
          content: `The user is brainstorming ideas with you. If they ask to save an idea, return "save". Here is their message: "${message}".`,
          role: "user",
        },
      ],
      max_tokens: 100,
    });
    const botMessage = completion.choices[0].message.content?.trim();

    if (botMessage === "save") {
      if (messages.length === 0) {
        res.json({ response: "Nothing to save" });
        return;
      }
      if (ideaSaved === false) {
        ideas.push(messages[messages.length - 1]);
        res.json({ response: "Idea saved to list" });
        ideaSaved = true;
        return;
      }
      res.json({ response: "Idea was already saved" });

      return;
    }
    messages.push(botMessage ?? "");
    ideaSaved = false;

    res.json({ response: botMessage });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/api/ideas", (_, res) => {
  res.json({ ideas });
});

app.delete("/api/reset", (req, res) => {
  ideas.splice(0, ideas.length);
  messages.splice(0, messages.length);

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
