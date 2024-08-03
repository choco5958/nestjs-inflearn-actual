import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,

    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,

    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,

    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  async postUser() {
    // return this.userRepository.save({
    //   // email: '1234@gmail.com',
    //   // title: 'test title',
    //   // role: Role.ADMIN,
    //   // role: 'another role',
    // });
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@gmail.com`,
      });
    }
  }

  @Post('sample')
  async sample() {
    // 모델의 해당되는 객체 생성 - 저장은 안함
    // const user1 = this.userRepository.create({
    //   email: 'test@codefactory.ai',
    // });

    // 저장
    // const user2 = await this.userRepository.save({
    //   email: 'test@codefactory.ai',
    // });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함
    // 저장하지는 않음
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'codefactory@codefactory.ai',
    // });

    // 삭제하기
    // await this.userRepository.delete(101);

    // 값을 증가시킴
    // await this.userRepository.increment(
    //   {
    //     id: 3,
    //   },
    //   'count',
    //   100,
    // );

    // 값을 감소시킴
    // await this.userRepository.decrement({ id: 1 }, 'count', 1);

    // 갯수 카운팅하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // 값을 더함 -> sum
    // const sum = await this.userRepository.sum('count', {
    //   id: LessThan(4),
    // });

    // 값의 평균 -> average
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });

    // 최소값
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });

    // 최대값
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });

    // 모든값 가져오기, {} 안에 옵션 사용 가능
    // const users = await this.userRepository.find({});

    // 해당하는 값 하나를 가져온다
    // const userOne = await this.userRepository.findOne({
    //   where: {
    //     id: 3,
    //   },
    // });

    // 해당하는 값과 필터를 하기전의 데이터 갯수를 가져온다.
    // const usersAndCount = await this.userRepository.findAndCount({
    //   take: 3,
    // });

    return true;
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      order: { id: 'ASC' },
      where: {
        // 아닌경우 가져오기
        // id: Not(1),
        // 적은경우 가져오기
        // id: LessThan(30),
        // 적은경우 or 같은경우
        // id: LessThanOrEqual(30),
        // 많은경우
        // id: MoreThan(30),
        // 많은경우 or 같은경우
        // id: MoreThanOrEqual(30),
        // 같은경우
        // id: Equal(30),
        // 유사값
        // email: Like('%GMAIL%'),
        // 대문자 소문자 구분안하는 유사값
        // email: ILike('%GMAIL%'),
        // 사이값
        // id: Between(10, 15),
        // 해당되는 여러개의 값
        // id: In([1, 3, 5, 7, 99]),
        // null인 경우 가져오기
        // id: IsNull(),
      },

      // 엔티티 컬럼 옵션에서 eager를 true로 하면 relations 설정을 안해도 자동으로 가져옴
      // relations: {
      //   profile: true,
      //   posts: true,
      // },
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다
      // 만약에 select를 정의하지 않으면
      // select를 정의함녀 정의된 프로퍼티들만 가져오게된다.
      // select: {
      //   id: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   version: true,
      //   profile: {
      //     id: true,
      //   },
      // },
      //필터링할 조건을 입력하게된다.
      // AND 조건
      // where: {
      //   version: 1,
      //   id: 3,
      // },
      // OR 조건
      // where: [{ version: 1 }, { id: 3 }],
      // relations에서 가져온 프로퍼티를 조건으로 사용할수 있다.
      // where: {
      //   profile: {
      //     id: 3,
      //   },
      // },
      // 관계를 가져오는법
      // relations: {
      //   profile: true,
      // },
      // 오름차, 내림차
      // ASC -> 오름차
      // DESC -> 내림차
      // order: {
      //   id: 'DESC',
      // },
      // 처음 몇개를 제외할지
      // skip: 0,
      // 몇개를 가져올지
      // take: 2,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return this.userRepository.save({
      ...user,
      email: user.email + '0',
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@codefactory.ai',
      profile: {
        profileImg: 'asdf.jpg',
      },
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user,
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postuser@codefactory.ai',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'Programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
