import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/models/product.entity';
import { User } from '../../user/models/user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  size: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @JoinColumn()
  @ManyToOne(() => Product, (product) => product.carts)
  product: Product;
}
