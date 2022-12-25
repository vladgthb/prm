import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from 'src/v1/modules/orders.module';
import { Personnel } from 'src/v1/entities/personnel.entity';
import { Order } from 'src/v1/entities/order.entity';
import { Topping } from 'src/v1/entities/topping.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'root',
      database: 'prm',
      entities: [Personnel, Order, Topping],
      synchronize: false,
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
