// index.type.js

/**
 * @typedef {Object} Menu
 * @property {number} id - 菜单ID
 * @property {string} title - 菜单标题
 * @property {string} url - 菜单URL
 * @property {string} icon - 菜单图标
 * @property {number|null} parent - 父菜单ID，null 表示无父菜单
 * @property {string} desc - 菜单描述
 * @property {number} sorts - 排序
 * @property {number} conditions - 状态（启用/禁用）
 * @property {Menu[]} [children] - 子菜单
 */

/**
 * @typedef {Object} MenuParam
 * @property {string} title - 菜单标题
 * @property {string} url - 菜单URL
 * @property {string} icon - 菜单图标
 * @property {number|null} parent - 父菜单ID，null 表示无父菜单
 * @property {string} desc - 菜单描述
 * @property {number} sorts - 排序
 * @property {number} conditions - 状态（启用/禁用）
 */

/**
 * @typedef {Object} TableRecordData
 * @property {number} key - 表格记录的唯一键
 * @property {number} serial - 序列号
 * @property {number} control - 控制字段
 * @property {number} id - 菜单ID
 * @property {string} title - 菜单标题
 * @property {string} url - 菜单URL
 * @property {string} icon - 菜单图标
 * @property {number|null} parent - 父菜单ID，null 表示无父菜单
 * @property {string} desc - 菜单描述
 * @property {number} sorts - 排序
 * @property {number} conditions - 状态（启用/禁用）
 * @property {Menu[]} [children] - 子菜单
 */

/**
 * @typedef {"add" | "see" | "up"} operateType
 */

/**
 * @typedef {Object} ModalType
 * @property {operateType} operateType - 操作类型
 * @property {TableRecordData|null} nowData - 当前数据
 * @property {boolean} modalShow - 模态框显示状态
 * @property {boolean} modalLoading - 模态框加载状态
 */

/**
 * @typedef {Object} TreeSourceData
 * @property {number} id - 树节点ID
 * @property {string|number} key - 树节点键
 * @property {string} title - 树节点标题
 * @property {string} icon - 树节点图标
 * @property {string} url - 树节点URL
 * @property {number|null} parent - 父节点ID，null 表示无父节点
 * @property {string} desc - 树节点描述
 * @property {number} sorts - 排序
 * @property {number} conditions - 状态（启用/禁用）
 * @property {TreeSourceData[]} [children] - 子节点
 */
