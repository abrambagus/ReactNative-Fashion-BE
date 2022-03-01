import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/models/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  currentDate: string;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn()
  user: User;
}
