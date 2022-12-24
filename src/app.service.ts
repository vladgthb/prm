import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async checkApiStatus(): Promise<string> {
    return 'Live!';
  }
}
