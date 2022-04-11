import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user:register')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('user:fetch-by-username')
  fetchUserByUsername(@Payload() username: string) {
    return this.userService.fetchUserByUsername(username);
  }

  @MessagePattern('user:check-if-exists')
  findIfUserExistsInDatabase(auth0id: string) {
    console.log(auth0id);
    const user = this.userService.findIfUserExists(auth0id);
    return user;
  }

  @MessagePattern('user:fetch-by-auth0')
  fetchUserByAuth0token(auth0id: string) {
    return this.userService.fetchUserByAuth0token(auth0id);
  }

  @MessagePattern('findAllUser')
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern('user:update')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
