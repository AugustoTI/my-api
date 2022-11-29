import { Role } from '@roles/entities/role'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  name: string
  @Column({ unique: true })
  email: string
  @Column()
  password: string
  @Column({ nullable: true })
  avatar: string
  @ManyToOne(() => Role, {
    cascade: true,
  })
  role: Repository<Role>
  @Column({ default: false })
  isAdmin: boolean
  @CreateDateColumn()
  created_at: Date
}
