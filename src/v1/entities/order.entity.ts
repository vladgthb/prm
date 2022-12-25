import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Topping } from 'src/v1/entities/topping.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Topping, toppings => toppings.order, { cascade: true })
  toppings: Topping[];

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  table_number: number;

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
