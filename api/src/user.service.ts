import { Injectable } from '@nestjs/common';
import UserDto from 'dtos/user.dto';
import UserEntity from 'entities/user.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class UserService {
  
  public async getAll(): Promise<UserEntity[]> {
    return getConnection()
      .createEntityManager()
      .find(UserEntity);
  }

  public async findById(id: number): Promise<UserEntity> {
    return getConnection()
      .createEntityManager()
      .findOneOrFail(UserEntity, id);
  }

  public async update(id: number, userData: UserDto): Promise<UserEntity> {
    let user:UserEntity = await this.findById(id);
    user.name = userData.name;
    user.birthYear = userData.birthYear;
    user.isAdmin = user.isAdmin;

    return getConnection()
      .createEntityManager()
      .save(user);
  }

  public async create(userData: UserDto): Promise<UserEntity> {
    const manager = getConnection().createEntityManager();
    const insertResult = await manager.insert(UserEntity, userData);
    return this.findById(insertResult.identifiers[0].id);
  }

  public async delete(id: number): Promise<void> {
    const user: UserEntity = await this.findById(id);

    getConnection()
      .createEntityManager()
      .remove(user);
  }
}
