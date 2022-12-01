import { Role } from '@roles/entities/role'
import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
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
  @Exclude()
  password: string
  @Column({ nullable: true })
  avatar?: string
  @ManyToOne(() => Role, {
    cascade: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  role: Role
  @Column({ default: false })
  isAdmin: boolean
  @CreateDateColumn()
  created_at: Date
}
