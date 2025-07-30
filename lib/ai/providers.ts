import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { groq } from '@ai-sdk/groq';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': groq('llama-3.1-8b-instant'),
        'chat-model-reasoning': wrapLanguageModel({
          model: groq('llama-3.1-8b-instant'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': groq('llama-3.1-8b-instant'),
        'artifact-model': groq('llama-3.1-8b-instant'),
      },
      imageModels: {
        // 'small-model': xai.image('grok-2-image'),
      },
    });
