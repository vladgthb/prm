import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/v1/entities/order.entity';
import { Topping } from 'src/v1/entities/topping.entity';
import { CreateOrderDto } from 'src/v1/dto/create-order.dto';

@Injectable()
export class OrdersRepositoryService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(Topping)
    private toppingRepository: Repository<Topping>,
  ) {}

  public async createOrders(createOrdersDto: CreateOrderDto[]): Promise<Order[]> {
    return await this.ordersRepository.save(createOrdersDto.map((orderDto) => {
      const orderEntity = new Order();
      orderEntity.table_number = orderDto.table_number;
      orderEntity.name = orderDto.pizza_name;
      orderEntity.toppings = orderDto.toppings.map((topping) => {
        const toppingEntity = new Topping();
        toppingEntity.order = orderEntity;
        toppingEntity.name = topping.topping_name;

        return toppingEntity;
      })

      return orderEntity;
    }));
  }
}
