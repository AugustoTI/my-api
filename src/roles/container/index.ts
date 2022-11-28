import { container } from 'tsyringe'
import { IRoleRepository } from '@roles/repositories/IRoleRepository'
import { RoleRepository } from '@roles/repositories/RolesRepository'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRolerController'
import { DeleteRoleController } from '@roles/useCases/deleteRole/DeleteRoleController'
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController'
import { ShowRoleController } from '@roles/useCases/showRole/ShowRoleController'
import { UpdateRoleController } from '@roles/useCases/updateRole/UpdateRoleController'

container.registerSingleton<IRoleRepository>('RolesRepository', RoleRepository)

container.registerSingleton('CreateRoleController', CreateRoleController)
container.registerSingleton('ListRolesController', ListRolesController)
container.registerSingleton('ShowRoleController', ShowRoleController)
container.registerSingleton('DeleteRoleController', DeleteRoleController)
container.registerSingleton('UpdateRoleController', UpdateRoleController)
