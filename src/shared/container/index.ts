import { IRoleRepository } from '@roles/repositories/IRoleRepository'
import { RoleRepository } from '@roles/repositories/RolesRepository'
import { container } from 'tsyringe'

container.registerSingleton<IRoleRepository>('RolesRepository', RoleRepository)
