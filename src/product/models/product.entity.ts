import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @Column({ default: 'product-image.png' })
  image: string;

  @JoinTable()
  @ManyToMany(() => Size, (size: Size) => size.name, {
    cascade: true,
    eager: true,
  })
  sizes: Size[];
}
