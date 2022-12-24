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

  async getAvailability(personnelType: PersonnelEnum): Promise<number> {
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
        return null;
    }
  }

  private async getDoughChefAvailability(): Promise<number> {
    return await this.getAvailabilityFromRepository(PersonnelEnum.DOUGH);
  }

  private async getToppingChefAvailability(): Promise<number> {
    return await this.getAvailabilityFromRepository(PersonnelEnum.TOPPING);
  }

  private async getOvenChefAvailability(): Promise<number> {
    return await this.getAvailabilityFromRepository(PersonnelEnum.OVEN);
  }

  private async getWaitersAvailability(): Promise<number> {
    return await this.getAvailabilityFromRepository(PersonnelEnum.WAITER);
  }

  private async getAvailabilityFromRepository(
    personnelType: PersonnelEnum,
    attempts = 0,
  ): Promise<number> {
    const availablePersons = await this.personnelRepository.findOne({
      where: {
        type: personnelType,
        available: true,
      }
    })
    if (!availablePersons?.id) {
      return availablePersons.id;
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
