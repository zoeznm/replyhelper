import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AppService {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async getAIResponse(question: string) {
    const response = await this.openai.completions.create({
      model: 'text-davinci-003',
      prompt: `나는 인공지능 AI Chatbot이야. 질문을 하면 내가 답변을 해줄께. 만약 모른다면 "모름"이라고 할께.\n\nQ: ${question}\nA:`,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['\n'],
    });

    return { result: response.choices[0].text.trim() };
  }
}
