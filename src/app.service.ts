import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async checkApiStatus(): Promise<string> {
    return 'Live!';
  }

  async createOrders(): Promise<string> {
    return 'Order created';
  }

  async getOrder(): Promise<string> {
    return 'Test order';
  }
}
