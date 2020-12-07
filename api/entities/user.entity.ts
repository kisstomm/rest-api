import {
  BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'users' })
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'birth_year', nullable: false })
  birthYear: number;

  @Column({ name: 'is_admin', nullable: false, default: false })
  isAdmin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}