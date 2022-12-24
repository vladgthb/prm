import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personnel } from 'src/v1/entities/personnel.entity';
import { OrdersService } from 'src/v1/services/orders.service';
import { PersonnelService } from 'src/v1/services/personnel.service';
import { OrdersController } from 'src/v1/controlers/orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Personnel])],
  controllers: [OrdersController],
  providers: [OrdersService, PersonnelService],
})
export class OrdersModule {}
