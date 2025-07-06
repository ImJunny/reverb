import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateTrackSummary(
  trackTitle: string,
  artistName: string
) {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `What is the song ${trackTitle} by ${artistName} about? Give me a 2 sentence summary. 
        If not enough information is found or you feel it is not 100% accurate, respond with one word only: null.`,
      },
    ],
    model: "gemma2-9b-it",
  });

  if (chatCompletion.choices[0]?.message.content === "null") return null;
  return chatCompletion.choices[0]?.message.content;
}

export async function generateArtistSummary(
  trackName: string,
  artistName: string
) {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `What is the artist ${artistName} (who made the song ${trackName}) known for?. 
        Give me a 2-3 sentence summary about their background, style of music, and more. 
        If not enough information is found or you feel it is not 100% accurate, respond with one word only: null.`,
      },
    ],
    model: "gemma2-9b-it",
  });
  if (chatCompletion.choices[0]?.message.content?.trim() === "null")
    return null;
  return chatCompletion.choices[0]?.message.content;
}
