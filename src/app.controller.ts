import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAIResponse(@Query('question') question: string) {
    if (!question) {
      return { result: '질문을 입력해주세요.' };
    }
    return this.appService.getAIResponse(question);
  }
}
