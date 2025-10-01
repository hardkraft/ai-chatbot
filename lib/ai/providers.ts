import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { groq } from '@ai-sdk/groq';
import { google } from '@ai-sdk/google';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

export const myProvider = (() => {
  const aiEngine = isTestEnvironment ? 'test' : process.env.AI_ENGINE;

  switch (aiEngine) {
    case 'test':
      return customProvider({
        languageModels: {
          'chat-model': chatModel,
          'chat-model-reasoning': reasoningModel,
          'title-model': titleModel,
          'artifact-model': artifactModel,
        },
      })
    case 'xAi':
      return customProvider({
        languageModels: {
          'chat-model': xai('grok-2-vision-1212'),
          'chat-model-reasoning': wrapLanguageModel({
            model: xai('grok-3-mini'),
            middleware: extractReasoningMiddleware({ tagName: 'think' }),
          }),
          'title-model': xai('grok-2-1212'),
          'artifact-model': xai('grok-2-1212'),
        },
        imageModels: {
          'small-model': xai.image('grok-2-image-1212'),
        }
      });
    case 'groq':
      return customProvider({
        languageModels: {
          'chat-model': groq('llama-3.3-70b-versatile'),// groq('deepseek-r1-distill-llama-70b'),
          'chat-model-reasoning': groq('groq/compound'),
          'title-model': groq('llama-3.1-8b-instant'),
          'artifact-model': groq('llama-3.3-70b-versatile'),
        },
        imageModels: {
          // Groq does not natively support image models in the same way xAI does.
        }
      });
    case 'google':
      return customProvider({
        languageModels: {
          'chat-model': google.chat('models/gemini-2.0-flash-lite'),
          'chat-model-reasoning': google.chat('gemini-2.0-flash'),
          'title-model': google.chat('models/gemini-2.0-flash-lite'),
          'artifact-model': google.chat('models/gemini-2.0-flash-lite'),
        },
        // imageModels: {
        //   'small-model': google.image('imagen-3.0-generate-002'),
        // }
      });
    default:
      return customProvider({
        languageModels: {
          'chat-model': chatModel,
          'chat-model-reasoning': reasoningModel,
          'title-model': titleModel,
          'artifact-model': artifactModel,
        },
      });
  }
})();
