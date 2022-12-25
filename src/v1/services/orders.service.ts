import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "src/v1/dto/create-order.dto";
import {
  DOUGH_CHEF_PROCESSING_TIME_IN_SECONDS,
  OVEN_PROCESSING_TIME_IN_SECONDS,
  SERVING_PROCESSING_TIME_IN_SECONDS,
  TOPPING_CHEF_PROCESSING_TIME_IN_SECONDS
} from "src/v1/configs/constatns";
import { PersonnelEnum } from "src/v1/enums/personnel.enum";
import { PersonnelService } from "src/v1/services/personnel.service";
import { OrdersRepositoryService } from "src/v1/services/orders.repository.service";
import { Order } from "src/v1/entities/order.entity";
import { getPreparationTime } from "src/v1/utils/timings.utils";

@Injectable()
export class OrdersService {
  constructor(
    private readonly personnelService: PersonnelService,
    private readonly ordersRepositoryService: OrdersRepositoryService,
  ) {}

  private async processStage(
    seconds: number,
    personnelType: PersonnelEnum,
    pizzaId: number,
  ): Promise<void> {
    const startTime = new Date();
    const availableEmployeeId = await this.personnelService?.getAvailability(
      personnelType,
    );
    if (availableEmployeeId) {
      if (personnelType === PersonnelEnum.OVEN) {
        console.log(availableEmployeeId);
      }
      await this.personnelService.setPersonnelStatusBusy(availableEmployeeId);
      await new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
      await this.personnelService.setPersonnelStatusAvailable(
        availableEmployeeId,
      );
    } else {
      throw new Error("Can't find available person");
    }
    const endTime = new Date();
    console.log(`Process ${personnelType} for Pizza #${pizzaId} completed
      START TIME: ${startTime.toUTCString()}
      END TIME: ${endTime.toUTCString()}`);
  }

  private async processDoughChef(pizzaId: number): Promise<void> {
    await this.processStage(
      DOUGH_CHEF_PROCESSING_TIME_IN_SECONDS,
      PersonnelEnum.DOUGH,
      pizzaId,
    );
  }

  private async processToppingChef(pizzaId: number): Promise<void> {
    await this.processStage(
      TOPPING_CHEF_PROCESSING_TIME_IN_SECONDS,
      PersonnelEnum.TOPPING,
      pizzaId,
    );
  }

  private async processOven(pizzaId: number): Promise<void> {
    await this.processStage(
      OVEN_PROCESSING_TIME_IN_SECONDS,
      PersonnelEnum.OVEN,
      pizzaId,
    );
  }

  private async processServing(pizzaId: number): Promise<void> {
    await this.processStage(
      SERVING_PROCESSING_TIME_IN_SECONDS,
      PersonnelEnum.WAITER,
      pizzaId,
    );
  }

  private async processOrder(orderEntity: Order): Promise<number> {
    const startTime = new Date();

    await this.processDoughChef(orderEntity.id);
    await this.processToppingChef(orderEntity.id);
    await this.processOven(orderEntity.id);
    await this.processServing(orderEntity.id);

    return getPreparationTime(startTime);
  }

  async createOrders(orders: CreateOrderDto[] = []): Promise<string> {
    const startTime = new Date();
    const ordersEntity = await this.ordersRepositoryService.createOrders(orders);
    if (ordersEntity?.length) {
      const preparationTimes = await Promise.all(
        ordersEntity.map((orderEntity) => this.processOrder(orderEntity)),
      );

      const endTime = new Date();
      const report = `Orders Completed at ${endTime.toUTCString()}
        Total Preparation time is ${getPreparationTime(startTime, endTime)} s.
          ${ordersEntity.map((orderEntity, index) =>
            `\n\tPreparation time for order #${orderEntity.id} ${preparationTimes[index]} s.`
          )}
      `;
      console.log(report);
      return report;
    }

    return 'No report';
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
