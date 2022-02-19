import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @ManyToMany(() => Product, (product) => product.sizes)
  products: Product[];
}
