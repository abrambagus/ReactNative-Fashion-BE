import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/models/product.entity';
import { Cart } from './cart.entity';

@Entity()
export class ProductOnCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column()
  quantity: number;

  @Column()
  image: string;

  @JoinColumn()
  @ManyToOne(() => Cart, (cart) => cart.productOnCart)
  cart: Cart;

  @JoinColumn()
  @ManyToOne(() => Product, (product) => product.productsOnCart)
  product: Product;
}
