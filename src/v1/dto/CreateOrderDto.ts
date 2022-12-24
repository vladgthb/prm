import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  tableNumber: number;
}
