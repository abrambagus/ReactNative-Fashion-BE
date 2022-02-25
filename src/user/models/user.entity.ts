import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from '../../cart/models/cart.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Cart, (cart: Cart) => cart.user, {
    cascade: true,
  })
  carts: Cart[];
}
