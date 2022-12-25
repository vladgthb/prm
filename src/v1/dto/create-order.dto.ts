import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  table_number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pizza_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  toppings: CreateToppingsDto[];
}

export class CreateToppingsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  topping_name: string;
}
