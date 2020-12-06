import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import  UserEntity  from '../entities/user.entity'
 
export default class CreateUsers implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    // await connection
    //   .createQueryBuilder()
    //   .insert()
    //   .into(UserEntity)
    //   .values([
    //     { name: 'John Wick', birthYear: 1960 },
    //   ])
    //   .execute();

    await connection
      .createEntityManager()
      .query(
        'INSERT INTO `users` (`name`, `birth_year`, `is_admin`) VALUES (?, ?, ?)',
        ['John Wick', 1960, true],
      );
  }
}