import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../../cart/models/cart.entity';
import { Favourite } from '../../favourite/models/favourite.entity';
import { Size } from './size.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: 'no-image-product.png' })
  image: string;

  @JoinTable()
  @ManyToMany(() => Size, (size: Size) => size.id, {
    cascade: true,
    eager: true,
  })
  sizes: Size[];

  @OneToMany(() => Cart, (cart: Cart) => cart.product, {
    cascade: true,
  })
  carts: Cart[];

  @OneToMany(() => Favourite, (favourite) => favourite.product, {
    cascade: true,
  })
  favourites: Favourite[];
}
