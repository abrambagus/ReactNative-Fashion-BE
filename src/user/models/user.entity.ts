import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from '../../cart/models/cart.entity';
import { Favourite } from '../../favourite/models/favourite.entity';
import { Transaction } from '../../transaction/models/transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'User' })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: '' })
  profilePicture: string;

  @Column({ default: '' })
  address: string;

  @OneToMany(() => Cart, (cart: Cart) => cart.user, {
    cascade: true,
  })
  carts: Cart[];

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
  })
  transactions: Transaction[];

  @OneToMany(() => Favourite, (favourite) => favourite.user, {
    cascade: true,
  })
  favourites: Favourite[];
}
