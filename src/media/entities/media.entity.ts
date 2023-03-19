import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MediaEnum, StatusEnum } from '../enums';

@Entity({ name: 'media' })
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: MediaEnum,
    default: MediaEnum.AUDIO,
  })
  type: MediaEnum;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'text',
  })
  url: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;

  @Column({
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
