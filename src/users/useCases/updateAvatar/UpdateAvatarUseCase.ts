import upload from '@config/upload'
import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from '@users/repositories/UserRepository'
import { stat, unlink } from 'fs/promises'
import path from 'path'
import { inject, injectable } from 'tsyringe'

interface UpdateAvatarDTO {
  userId: string
  avatarFilename: string
}

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute({ userId, avatarFilename }: UpdateAvatarDTO) {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new AppError('Only authenticated user can change avatar', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(upload.directory, user.avatar)
      const userAvatarFileExists = await stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename
    return this.usersRepository.save(user)
  }
}
