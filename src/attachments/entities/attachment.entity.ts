import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  filename: string;

  @Column({
    type: 'longblob',
  })
  data: Uint8Array;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;
}
