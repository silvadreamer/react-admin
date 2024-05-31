// // index.type.js
//
// /**
//  * @typedef {Object} Menu
//  * @property {number} id - 菜单ID
//  * @property {string} title - 菜单标题
//  * @property {string} url - 菜单URL
//  * @property {string} icon - 菜单图标
//  * @property {number|null} parent - 父菜单ID，null 表示无父菜单
//  * @property {string} desc - 菜单描述
//  * @property {number} sorts - 排序
//  * @property {number} conditions - 状态（启用/禁用）
//  * @property {Menu[]} [children] - 子菜单
//  */
//
// /**
//  * @typedef {Object} Role
//  * @property {number} id - 角色ID
//  * @property {string} title - 角色标题
//  * @property {string} desc - 角色描述
//  * @property {number} sorts - 排序
//  * @property {number} conditions - 状态（启用/禁用）
//  * @property {MenuAndPower[]} menuAndPowers - 角色的菜单和权限
//  */
//
// /**
//  * @typedef {Object} Power
//  * @property {number} id - 权限ID
//  * @property {string} title - 权限标题
//  * @property {string} code - 权限代码
//  * @property {string} desc - 权限描述
//  * @property {number} sorts - 排序
//  * @property {number} conditions - 状态（启用/禁用）
//  */
//
// /**
//  * @typedef {Object} MenuAndPower
//  * @property {number} menuId - 菜单ID
//  * @property {number[]} powers - 权限ID数组
//  */
//
// /**
//  * @typedef {Object} UserInfo
//  * @property {Role[]} roles - 用户角色数组
//  * @property {Menu[]} menus - 用户菜单数组
//  * @property {Power[]} powers - 用户权限数组
//  * @property {any} userBasicInfo - 用户基本信息
//  */
//
// /**
//  * @typedef {Object} AppState
//  * @property {UserInfo} userinfo - 用户信息
//  * @property {string[]} powersCode - 权限代码数组
//  */
//
// /**
//  * @typedef {Object} SysState
//  * @property {Menu[]} menus - 系统菜单数组
//  * @property {Role[]} roles - 系统角色数组
//  * @property {PowerTree[]} powerTreeData - 权限树数据
//  */
//
// /**
//  * @typedef {Object} Res
//  * @property {number} status - 响应状态码
//  * @property {string} message - 响应消息
//  * @property {any} data - 响应数据
//  */
//
// /**
//  * @typedef {Object} MenuParam
//  * @property {string} title - 菜单标题
//  * @property {string} url - 菜单URL
//  * @property {string} icon - 菜单图标
//  * @property {number|null} parent - 父菜单ID，null 表示无父菜单
//  * @property {string} desc - 菜单描述
//  * @property {number} sorts - 排序
//  * @property {number} conditions - 状态（启用/禁用）
//  */
//
// /**
//  * @typedef {Object} PowerParam
//  * @property {string} title - 权限标题
//  * @property {string} code - 权限代码
//  * @property {string} desc - 权限描述
//  * @property {number} sorts - 排序
//  * @property {number} conditions - 状态（启用/禁用）
//  */
//
// /**
//  * @typedef {Object} RoleParam
//  * @property {string} title - 角色标题
//  * @property {string} desc - 角色描述
//  * @property {number} sorts - 排序
//  * @property {number} conditions - 状态（启用/禁用）
//  */
//
// /**
//  * @typedef {Object} UserBasicInfoParam
//  * @property {string} username - 用户名
//  * @property {string} password - 密码
//  * @property {string} phone - 电话
//  * @property {string} email - 电子邮件
//  * @property {string} desc - 描述
//  * @property {number} conditions - 状态（启用/禁用）
//  */
//
// /**
//  * @typedef {Object} PowerTree
//  * @property {number} id - 权限树节点ID
//  * @property {string} title - 权限树节点标题
//  * @property {number|null} parent - 父节点ID，null 表示无父节点
//  * @property {PowerTree[]} [children] - 子节点数组
//  * @property {Power[]} powers - 节点权限数组
//  */
//
