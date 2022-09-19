import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date?: Date;

  @Column({ nullable: true })
  notes: string;
}
