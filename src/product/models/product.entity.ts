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

  @ManyToMany(() => Size, (size) => size.products, { cascade: true })
  @JoinTable()
  sizes: Size[];
}
