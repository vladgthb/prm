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
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderDto } from 'src/v1/dto/CreateOrderDto';
import { ResponseData } from 'src/interfaces/standard-response.interface';
import { OrdersService } from 'src/v1/services/orders.service';

@Controller('api/v1')
@ApiTags('orders-processing')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // @ApiOperation({
  //   description: 'Creates and returns the resource details.',
  //   requestBody: {
  //     content: {
  //       orders: { schema: CreateOrderDto },
  //     },
  //   },
  // })
  @Post('orders')
  async createOrders(
    // @Body() { orders }: { orders: Array<CreateOrderDto> },
  ): Promise<ResponseData<'status', string>> {
    return {
      data: {
        status: await this.ordersService.createOrders(),
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
