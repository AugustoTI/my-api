import { RoleRepository } from '@roles/repositories/RolesRepository'
import { CreateRoleController } from './CreateRolerController'
import { CreateRoleUseCase } from './CreateRolerUseCase'

const rolesRepository = new RoleRepository()
const createRoleUseCase = new CreateRoleUseCase(rolesRepository)
export const createRoleController = new CreateRoleController(createRoleUseCase)
