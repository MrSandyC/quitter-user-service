import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  fetchUserByUsername(username: string) {
    const user = this.userRepository
      .findOneOrFail({
        where: {
          username: username,
        },
      })
      .catch(() => {
        return false;
      });

    return user;
  }

  fetchUserByAuth0token(auth0id: string) {
    return this.userRepository
      .findOneOrFail({
        where: {
          auth0id: auth0id,
        },
      })
      .catch(() => {
        return false;
      });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findIfUserExists(auth0id) {
    return this.userRepository
      .findOneOrFail({
        where: {
          auth0id: auth0id,
        },
      })
      .catch(() => {
        return false;
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save(updateUserDto);
  }

  remove(id: number) {
    this.userRepository.delete(id);
  }
}
