import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/v1/dto/CreateOrderDto';
import {
  DOUGH_CHEF_PROCESSING_TIME_IN_SECONDS,
  OVEN_PROCESSING_TIME_IN_SECONDS,
  SERVING_PROCESSING_TIME_IN_SECONDS,
  TOPPING_CHEF_PROCESSING_TIME_IN_SECONDS,
} from 'src/v1/configs/constatns';
import { PersonnelEnum } from 'src/v1/enums/personnel.enum';
import { PersonnelService } from 'src/v1/services/personnel.service';

@Injectable()
export class OrdersService {
  constructor(private readonly personnelService: PersonnelService) {}

  private async processStage(
    seconds: number,
    personnelType: PersonnelEnum,
  ): Promise<void> {
    const availableEmployeeId = await this.personnelService?.getAvailability(
      personnelType,
    );
    if (availableEmployeeId) {
      return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
    } else {
      throw new Error('Check');
    }
  }

  private async processDoughChef(): Promise<void> {
    await this.processStage(
      DOUGH_CHEF_PROCESSING_TIME_IN_SECONDS,
      PersonnelEnum.DOUGH,
    );

    return null;
  }

  private async processToppingChef(): Promise<void> {
    await this.processStage(
      TOPPING_CHEF_PROCESSING_TIME_IN_SECONDS,
      PersonnelEnum.TOPPING,
    );

    return null;
  }

  private async processOven(): Promise<void> {
    await this.processStage(
      OVEN_PROCESSING_TIME_IN_SECONDS,
      PersonnelEnum.OVEN,
    );

    return null;
  }

  private async processServing(): Promise<void> {
    await this.processStage(
      SERVING_PROCESSING_TIME_IN_SECONDS,
      PersonnelEnum.WAITER,
    );

    return null;
  }

  private async test(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  private async processOrder(dto: CreateOrderDto): Promise<string> {
    const startTime = Date.now();
    console.log(
      `Order for pizza #${
        dto.tableNumber
      } processing started at ${startTime.toLocaleString()}`,
    );
    await this.processDoughChef();
    await this.processToppingChef();
    await this.processOven();
    await this.processServing();

    const endTime = Date.now();
    console.log(
      `Order for pizza #${
        dto.tableNumber
      } processing ended at ${endTime.toLocaleString()}`,
    );
    return `${dto.tableNumber}`;
  }

  // async createOrders(orders: CreateOrderDto[]): Promise<string> {
  async createOrders(): Promise<string> {
    const startTime = Date.now();
    console.log(`Orders processing started at ${startTime.toLocaleString()}`);
    const orders: CreateOrderDto[] = [{ tableNumber: 12 }];
    await Promise.all(orders.map((order) => this.processOrder(order)));
    const endTime = Date.now();
    console.log(`Orders processing end at ${endTime.toLocaleString()}`);
    return `Completed: ${endTime.toLocaleString()}`;
  }

  async getOrder(): Promise<string> {
    return 'Test order';
  }

  async updateOrder(): Promise<string> {
    return 'updated order';
  }

  async deleteOrder(): Promise<string> {
    return 'deleted order';
  }
}
