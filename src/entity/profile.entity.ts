import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UserModel, (user) => user.profile)
  @JoinColumn()
  user: UserModel;

  @Column()
  profileImg: string;
}
