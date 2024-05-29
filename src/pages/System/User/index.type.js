/**
 * @typedef {Object} Role
 * @property {number} id - 角色ID
 * @property {string} title - 角色标题
 * @property {string} desc - 角色描述
 * @property {number} sorts - 排序
 * @property {number} conditions - 状态（启用/禁用）
 * @property {Array<MenuAndPower>} menuAndPowers - 角色的菜单和权限
 */

/**
 * @typedef {Object} UserBasicInfoParam
 * @property {string} username - 用户名
 * @property {string} password - 密码
 * @property {string} phone - 电话
 * @property {string} email - 电子邮件
 * @property {string} desc - 描述
 * @property {number} conditions - 状态（启用/禁用）
 */

/**
 * @typedef {Object} TableRecordData
 * @property {number} [key] - 可选的键
 * @property {number} id - 用户ID
 * @property {number} serial - 序列号
 * @property {string} username - 用户名
 * @property {string} password - 密码
 * @property {string|number} phone - 电话
 * @property {string} email - 电子邮件
 * @property {string} desc - 描述
 * @property {number} conditions - 状态（启用/禁用）
 * @property {number} [control] - 可选的控制字段
 * @property {Array<number>} [roles] - 可选的角色ID数组
 */

/**
 * @typedef {Object} Page
 * @property {number} pageNum - 当前页码
 * @property {number} pageSize - 每页显示的条目数
 * @property {number} total - 总条目数
 */

/**
 * @typedef {"add" | "see" | "up"} operateType
 */

/**
 * @typedef {Object} ModalType
 * @property {operateType} operateType - 操作类型
 * @property {UserBasicInfoParam|null} nowData - 当前数据
 * @property {boolean} modalShow - 模态框显示状态
 * @property {boolean} modalLoading - 模态框加载状态
 */

/**
 * @typedef {Object} SearchInfo
 * @property {string|undefined} username - 用户名
 * @property {number|undefined} conditions - 状态（启用/禁用）
 */

/**
 * @typedef {Object} RoleTreeInfo
 * @property {Array<Role>} roleData - 角色数据
 * @property {boolean} roleTreeLoading - 角色树加载状态
 * @property {boolean} roleTreeShow - 角色树显示状态
 * @property {Array<number>} roleTreeDefault - 角色树默认选中的角色ID
 */

// 导出类型
export {
  UserBasicInfoParam,
  Res,
  TableRecordData,
  Page,
  operateType,
  ModalType,
  SearchInfo,
  RoleTreeInfo
};
