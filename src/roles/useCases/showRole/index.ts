import { RoleRepository } from '@roles/repositories/RolesRepository'
import { ShowRoleController } from './ShowRoleController'
import { ShowRoleUseCase } from './ShowRoleUseCase'

const rolesRepository = RoleRepository.getInstance()
const showRoleUseCase = new ShowRoleUseCase(rolesRepository)
export const showRoleController = new ShowRoleController(showRoleUseCase)
