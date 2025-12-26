
export const streamGeminiResponse = async (
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string,
  onChunk: (text: string) => void
) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || '/api';
    const response = await fetch(`${baseUrl}/gemini/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, message: newMessage })
    });

    if (!response.ok) throw new Error('Network response was not ok');
    if (!response.body) throw new Error('No response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value, { stream: true });
      onChunk(text);
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("I'm sorry, I'm having trouble connecting right now. Please try again later.");
  }
};