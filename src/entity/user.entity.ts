import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // ID
  // 자동으로 ID를 생성한다.
  //
  // Primary Column은 모든 테이블에서 기본적으로 존재해야한다.
  // 테이블 안에서 각가의 Row를 구분 할 수 있는 칼럼이다.
  // @PrimaryColumn()
  //
  // @PrimaryGeneratedColumn('uuid')
  // PrimaryGeneratedColumn -> 순서대로 위로 올라간다.
  // 1, 2, 3, 4, 5 -> 999999
  //
  // UUID
  // asdasdas1526fg-156a1sfdasf-123154asdsad-156asdasd
  @PrimaryGeneratedColumn()
  id: number;

  // 이메일
  @Column()
  email: string;

  // 제목
  // @Column({
  //   // 데이터베이스에서 인지하는 칼럼 타입
  //   // 자동으로 유추됨
  //   // 특정한 타입을 원하면 직접 넣어야함
  //   type: 'varchar',

  //   // 데이터베이스 칼럼 이름
  //   // 프로퍼티 이름으로 자동 유추됨
  //   name: 'title',

  //   // 값의 길이
  //   // 입력 할 수 있는 글자의 길이가 300
  //   length: 300,

  //   // null이 가능한지
  //   nullable: true,

  //   // true면 처음 저장할때만 값 지정 가능
  //   // 이후에는 값 변경 불가능,
  //   update: true,

  //   // find()를 실행할때 기본으로 값을 불러올지
  //   // 기본값이 true
  //   select: false,

  //   // 기본값
  //   // 아무것도 입력 안했을때 기본으로 입력되게 하는 값
  //   default: 'default value',

  //   // 칼럼중에서 유일무이한 값이 돼야하는지
  //   unique: false,
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: string;

  // 데이터 생성 일자
  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
  @CreateDateColumn()
  createdAt: Date;

  // 데이터 업데이트 일자
  // 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힌다.
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트 될때마다 1씩 올라간다.
  // 처음 생성되면 값은 1이다.
  // save() 함수가 몇번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additinalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user)
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel;
}
