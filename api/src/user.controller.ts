import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import UserDto from 'dtos/user.dto';
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

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() userData: UserDto): Promise<UserEntity> {
    return this.userService.update(id, userData);
  }

  @Post('')
  async create(@Body() userData: UserDto): Promise<UserEntity> {
    return this.userService.create(userData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
