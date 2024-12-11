import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/chat')
  async handlePostChat(@Body() body: { question: string }) {
    const { question } = body;
    if (!question) {
      return { result: '질문을 입력해주세요.' };
    }
    return this.appService.getAIResponse(question);
  }

  @Get()
  async handleGetChat(@Query('question') question: string) {
    if (!question) {
      return { result: '질문을 입력해주세요.' };
    }
    return this.appService.getAIResponse(question);
  }
}
