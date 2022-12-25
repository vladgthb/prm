import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Req,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBodyOptions,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderDto } from 'src/v1/dto/create-order.dto';
import { ResponseData } from 'src/interfaces/standard-response.interface';
import { OrdersService } from 'src/v1/services/orders.service';

@Controller('api/v1')
@ApiTags('orders-processing')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBody({
    description: 'List of orders',
    type: CreateOrderDto,
    isArray: true,
  })
  @Post('orders')
  async createOrders(
    @Body() orders: CreateOrderDto[],
  ): Promise<ResponseData<'report', string>> {
    return {
      data: {
        report: await this.ordersService.createOrders(orders),
      },
    };
  }

  @Get('orders/:orderId')
  async getOrder(): Promise<string> {
    return await this.ordersService.getOrder();
  }

  @Patch('orders/:orderId')
  async updateOrder(): Promise<string> {
    return await this.ordersService.updateOrder();
  }

  @Delete('orders/:orderId')
  async deleteOrder(): Promise<string> {
    return await this.ordersService.deleteOrder();
  }
}
