import { RoleRepository } from '@roles/repositories/RolesRepository'
import { DeleteRoleController } from './DeleteRoleController'
import { DeleteRoleUseCase } from './DeleteRoleUseCase'

const rolesRepository = RoleRepository.getInstance()
const deleteRoleUseCase = new DeleteRoleUseCase(rolesRepository)
export const deleteRoleController = new DeleteRoleController(deleteRoleUseCase)
