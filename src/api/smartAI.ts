import {FreeAIService, ChatMessage as FreeChatMessage} from './freeAI';

// Unified interface for all AI providers
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIGenerationRequest {
  messages: ChatMessage[];
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export class SmartAIService {
  // Use Free AI services exclusively
  static async generateChatResponse(request: AIGenerationRequest): Promise<string> {
    try {
      return await FreeAIService.generateChatResponse({
        messages: request.messages as FreeChatMessage[],
        systemPrompt: request.systemPrompt,
        maxTokens: request.maxTokens,
      });
    } catch (error) {
      console.error('Error with Free AI provider:', error);
      throw error; // Re-throw the error instead of falling back
    }
  }

  static async generateHabitSuggestions(userGoal: string): Promise<Array<{habit: string; reason: string}>> {
    try {
      return await FreeAIService.generateHabitSuggestions(userGoal);
    } catch (error) {
      console.error('Error generating habits with Free AI:', error);
      throw error; // Re-throw the error instead of falling back
    }
  }

  static async generateHabitQuittingAdvice(habit: string): Promise<string> {
    try {
      const messages = [
        {
          role: 'user' as const,
          content: `I have a habit: ${habit}.  
                  Give me one concise, practical piece of advice to help me quit this habit.  
                  The advice should be clear, realistic, and immediately actionable in daily life.`,
        },
      ];

      const response = await this.generateChatResponse({
        messages,
        systemPrompt:
          'You are a compassionate habit coach. Provide specific, actionable advice for quitting bad habits. Focus on practical strategies and emotional support. Keep responses concise but encouraging.',
        temperature: 0.7,
        maxTokens: 150,
      });
      console.log('response', response);
      return response;
    } catch (error) {
      console.error('Error generating habit quitting advice:', error);
      throw error; // Re-throw the error instead of providing fallback
    }
  }

  static async generateMotivationalQuote(context?: string): Promise<string> {
    try {
      return await FreeAIService.generateMotivationalQuote(context);
    } catch (error) {
      console.error('Error generating quote with Free AI:', error);
      throw error; // Re-throw the error instead of falling back
    }
  }

  static async generateBibleQuote(): Promise<{quote: string; reference: string; reflection: string}> {
    try {
      return await FreeAIService.generateBibleQuote();
    } catch (error) {
      console.error('Error generating Bible quote with Free AI:', error);
      throw error; // Re-throw the error instead of falling back
    }
  }

  // Get info about Free AI provider
  static getProviderInfo(): {
    name: string;
    cost: string;
    features: string[];
    setup: string;
  } {
    return {
      name: 'Free AI (Hugging Face/Gemini/Local)',
      cost: 'Completely FREE',
      features: ['Good quality responses', '30k requests/month', 'Works offline as fallback', 'No credit card needed'],
      setup: 'Optional: Free account at huggingface.co or Google AI for better responses',
    };
  }
}
