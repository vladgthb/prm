import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'personnel_availability' })
export class Personnel {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    default: true,
  })
  available: boolean;

  @Column({
    nullable: false,
  })
  type: string;
}
