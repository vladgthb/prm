import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personnel } from 'src/v1/entities/personnel.entity';
import { Order } from 'src/v1/entities/order.entity';
import { Topping } from 'src/v1/entities/topping.entity';
import { OrdersService } from 'src/v1/services/orders.service';
import { PersonnelService } from 'src/v1/services/personnel.service';
import { OrdersRepositoryService } from 'src/v1/services/orders.repository.service';
import { OrdersController } from 'src/v1/controlers/orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Personnel, Order, Topping])],
  controllers: [OrdersController],
  providers: [OrdersService, PersonnelService, OrdersRepositoryService],
})
export class OrdersModule {}
