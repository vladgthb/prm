import { Injectable } from '@nestjs/common';
import { PersonnelEnum } from 'src/v1/enums/personnel.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personnel } from 'src/v1/entities/personnel.entity';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(Personnel)
    private personnelRepository: Repository<Personnel>,
  ) {}

  async getAvailability(personnelType: PersonnelEnum): Promise<string[]> {
    switch (personnelType) {
      case PersonnelEnum.DOUGH:
        return await this.getDoughChefAvailability();
      case PersonnelEnum.OVEN:
        return await this.getOvenChefAvailability();
      case PersonnelEnum.TOPPING:
        return await this.getToppingChefAvailability();
      case PersonnelEnum.WAITER:
        return await this.getWaitersAvailability();
      default:
        return [];
    }
  }

  private async getDoughChefAvailability(): Promise<string[]> {
    return await this.getAvailabilityFromRepository(PersonnelEnum.DOUGH);
  }

  private async getToppingChefAvailability(): Promise<string[]> {
    return await this.getAvailabilityFromRepository(PersonnelEnum.TOPPING);
  }

  private async getOvenChefAvailability(): Promise<string[]> {
    return await this.getAvailabilityFromRepository(PersonnelEnum.OVEN);
  }

  private async getWaitersAvailability(): Promise<string[]> {
    return await this.getAvailabilityFromRepository(PersonnelEnum.WAITER);
  }

  private async getAvailabilityFromRepository(
    personnelType: PersonnelEnum,
    attempts = 0,
  ): Promise<string[]> {
    const availablePersons = ['test'];
    if (availablePersons?.length) {
      return [''];
    } else {
      console.log(
        `No any employee available to process "${personnelType}" service. Waiting a second to check again`,
      );
      // If not available wait a second to check the status again
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      console.log(`
        Checking availability for process "${personnelType}" - attempt #${attempts}.
      `);
      return await this.getAvailabilityFromRepository(
        personnelType,
        attempts + 1,
      );
    }
  }
}
