import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  token: string

  @Column()
  user_id: string

  @Column({ default: true })
  valid: boolean

  @Column()
  expires: Date

  @CreateDateColumn()
  created_at: Date
}
