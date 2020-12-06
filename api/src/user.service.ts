import { Injectable } from '@nestjs/common';
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
}
