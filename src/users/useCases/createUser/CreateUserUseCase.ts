import { RoleRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from '@users/repositories/UserRepository'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  isAdmin: boolean
  roleId: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('RolesRepository') private rolesRepository: RoleRepository,
  ) {}

  async execute({ email, isAdmin, name, password, roleId }: CreateUserDTO) {
    const emailExists = await this.usersRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email address already used')
    }

    const role = await this.rolesRepository.findById(roleId)
    if (!role) {
      throw new AppError('Role not found', 404)
    }

    const hashedPassword = await hash(password, 10)
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      role,
    })

    return user
  }
}
