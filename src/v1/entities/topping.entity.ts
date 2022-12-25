import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from 'src/v1/entities/order.entity';

@Entity({ name: 'toppings' })
export class Topping {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Order, order => order.toppings)
  order: Order;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    default: false,
  })
  processed: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}
