import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/app.service';

@Controller('api')
@ApiTags('orders-processing')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  async getApiStatus(): Promise<string> {
    return await this.appService.checkApiStatus();
  }
}
