import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductOnCart } from '../../cart/models/productOnCart.entity';
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

  @OneToMany(() => ProductOnCart, (productOnCart) => productOnCart.product, {
    cascade: true,
  })
  productsOnCart: ProductOnCart[];
}
