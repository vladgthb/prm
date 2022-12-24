import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  async getApiStatus(): Promise<string> {
    return await this.appService.checkApiStatus();
  }

  @Post('orders')
  async createOrders(): Promise<string> {
    return await this.appService.createOrders();
  }

  @Post('orders/:orderId')
  async getOrder(): Promise<string> {
    return await this.appService.getOrder();
  }
}
