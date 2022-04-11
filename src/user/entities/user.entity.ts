import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  auth0id: string;

  @Column()
  nickname: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column()
  username: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  profileUri: string;

  @CreateDateColumn()
  created_at: Date;
}
