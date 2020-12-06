import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import UserEntity from 'entities/user.entity';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.findById(id);
  }
}
