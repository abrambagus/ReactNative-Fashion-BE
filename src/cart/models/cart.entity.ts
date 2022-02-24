import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/models/user.entity';
import { ProductOnCart } from './productOnCart.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @OneToOne(() => User, (user: User) => user.cart)
  user: User;

  @OneToMany(() => ProductOnCart, (cartToProduct) => cartToProduct.cart, {
    cascade: true,
  })
  productOnCart: ProductOnCart[];
}
