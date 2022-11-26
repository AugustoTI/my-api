import { RoleRepository } from '@roles/repositories/RolesRepository'
import { UpdateRoleController } from './UpdateRoleController'
import { UpdateRoleUseCase } from './UpdateRoleUseCase'

const rolesRepository = RoleRepository.getInstance()
const updateRoleUseCase = new UpdateRoleUseCase(rolesRepository)
export const updateRoleController = new UpdateRoleController(updateRoleUseCase)
