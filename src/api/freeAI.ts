// FREE AI Integration using Hugging Face Inference API
// Completely free with 30,000 requests per month!

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface FreeAIRequest {
  messages: ChatMessage[];
  systemPrompt?: string;
  maxTokens?: number;
}

export class FreeAIService {
  // Using Google Gemini API (FREE tier)
  private static readonly GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  private static readonly DEFAULT_SYSTEM_PROMPT =
    'You are a compassionate AI coach helping people break free from unwanted habits and pursue their spiritual calling. ' +
    'Respond with exactly ONE clear, actionable sentence that provides practical advice or encouragement.';

  // Google Gemini (FREE tier)
  static async generateChatResponseGemini({
    messages,
    systemPrompt = this.DEFAULT_SYSTEM_PROMPT,
  }: FreeAIRequest): Promise<string> {
    try {
      const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';
      const fullPrompt = `${systemPrompt}\n\nUser: ${lastUserMessage}\n\nProvide exactly ONE sentence of advice:`;

      const response = await fetch(this.GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': process.env.GOOGLE_API_KEY || '',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text.trim();
      }

      throw new Error('No response generated from Gemini');
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }

  // Main method - uses Gemini only
  static async generateChatResponse(request: FreeAIRequest): Promise<string> {
    // Check if Gemini API key is configured
    if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY.length < 10) {
      const errorMessage = 'No valid GOOGLE_API_KEY configured. Please set up your Gemini API key.';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      return await this.generateChatResponseGemini(request);
    } catch (error) {
      console.error('Gemini API failed:', error);
      throw error;
    }
  }

  // AI-generated habit suggestions
  static async generateHabitSuggestions(userGoal: string): Promise<Array<{habit: string; reason: string}>> {
    let response = '';
    try {
      response = await this.generateChatResponse({
        messages: [
          {
            role: 'user',
            content: `Based on this goal: "${userGoal}", suggest 4 specific bad habits I should quit to achieve this goal. 
                     Return ONLY a JSON array with objects containing "habit" and "reason" fields.
                     Each "reason" should be exactly ONE sentence explaining why to quit this habit.
                     Example format: [{"habit": "Social Media Scrolling", "reason": "Reduce distractions to focus on your goal."}]`,
          },
        ],
        systemPrompt:
          'You are a habit coach. Provide 4 specific bad habits to quit based on the user goal. ' +
          'Each reason must be exactly ONE clear sentence. Return only valid JSON array format.',
        maxTokens: 300,
      });

      // Try to parse the JSON response
      let cleanResponse = response.replace(/```json|```/g, '').trim();

      // Try to extract JSON from the response if it contains extra text
      const jsonMatch = cleanResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        [cleanResponse] = jsonMatch;
      }

      const suggestions = JSON.parse(cleanResponse);

      if (Array.isArray(suggestions) && suggestions.length > 0) {
        return suggestions.slice(0, 4); // Ensure max 4 suggestions
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error generating habit suggestions:', error);
      console.error('Raw response that failed to parse:', response);
      throw new Error('Failed to generate habit suggestions. Please ensure AI service is properly configured.');
    }
  }

  // AI-generated motivational quotes
  static async generateMotivationalQuote(context?: string): Promise<string> {
    try {
      const contextPrompt = context ? `Context: ${context}\n\n` : '';
      const response = await this.generateChatResponse({
        messages: [
          {
            role: 'user',
            content: `${contextPrompt}Generate exactly ONE inspiring sentence about spiritual growth, breaking bad habits, and pursuing one's calling. 
                     Make it encouraging and faith-based. Return only the quote in quotation marks.`,
          },
        ],
        systemPrompt:
          'You are a spiritual motivational speaker. Create exactly ONE inspiring sentence that helps people break free from bad habits and pursue their divine calling. ' +
          'Focus on themes of growth, faith, transformation, and purpose. Make it concise but powerful.',
        maxTokens: 50,
      });

      // Clean up the response and ensure it's properly quoted
      let quote = response.trim();
      if (!quote.startsWith('"')) {
        quote = `"${quote}`;
      }
      if (!quote.endsWith('"')) {
        quote = `${quote}"`;
      }

      return quote;
    } catch (error) {
      console.error('Error generating motivational quote:', error);
      throw new Error('Failed to generate motivational quote. Please ensure AI service is properly configured.');
    }
  }

  // AI-generated Bible quote of the day
  static async generateBibleQuote(): Promise<{quote: string; reference: string; reflection: string}> {
    let response = '';
    try {
      response = await this.generateChatResponse({
        messages: [
          {
            role: 'user',
            content: `Generate a Bible quote of the day with the following format:
                     {
                       "quote": "The actual Bible verse text",
                       "reference": "Book Chapter:Verse (e.g., John 3:16)",
                       "reflection": "A brief 1-2 sentence reflection on how this verse applies to breaking bad habits and spiritual growth"
                     }
                     
                     Choose a verse that relates to themes of transformation, strength, perseverance, or overcoming challenges.
                     Return only valid JSON format.`,
          },
        ],
        systemPrompt:
          'You are a spiritual guide who provides daily Bible verses for people seeking to break free from bad habits and grow spiritually. ' +
          'Select appropriate verses that encourage transformation and spiritual strength. Provide accurate biblical references and meaningful reflections.',
        maxTokens: 200,
      });

      // Clean up the response and parse JSON
      let cleanResponse = response.replace(/```json|```/g, '').trim();

      // Try to extract JSON from the response if it contains extra text
      const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        [cleanResponse] = jsonMatch;
      }

      const quoteData = JSON.parse(cleanResponse);

      if (quoteData.quote && quoteData.reference && quoteData.reflection) {
        return {
          quote: quoteData.quote.trim(),
          reference: quoteData.reference.trim(),
          reflection: quoteData.reflection.trim(),
        };
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error generating Bible quote:', error);
      console.error('Raw response that failed to parse:', response);
      // Fallback with a default quote
      return {
        quote: 'I can do all things through Christ who strengthens me.',
        reference: 'Philippians 4:13',
        reflection:
          'This verse reminds us that with faith, we have the strength to overcome any habit or challenge we face.',
      };
    }
  }
}
