import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1607193682500 implements MigrationInterface {
    private tableName = 'users'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
          name: this.tableName,
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'birth_year',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'is_admin',
              type: 'tinyint',
              isNullable: false,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              isNullable: false,
              default: 'now()'
            }
          ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName);
    }

}
