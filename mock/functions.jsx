let id_sequence = 1000;

let users = [
  {
    id: 1,
    username: "admin",
    password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    email: "admin@bjtu.edu.com",
    desc: "超级管理员",
    conditions: 1,
    roles: [1, 2, 3],
  },
  {
    id: 2,
    username: "user",
    password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    email: "user@bjtu.edu.com",
    desc: "普通管理员",
    conditions: 1,
    roles: [3],
  },
  {
    id: 3,
    username: "user2",
    password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    email: "user3@bjtu.edu.com",
    desc: "普通管理员3",
    conditions: 1,
    roles: [2],
  },
];

let powers = [
  {
    id: 1,
    menu: 3,
    title: "新增",
    code: "user:add",
    desc: "用户添加权限",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 2,
    menu: 3,
    title: "修改",
    code: "user:up",
    desc: "用户修改权限",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 3,
    menu: 3,
    title: "查看",
    code: "user:query",
    desc: "用户查看权限",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 4,
    menu: 3,
    title: "删除",
    code: "user:del",
    desc: "用户删除权限",
    sorts: 4,
    conditions: 1,
  },
  {
    id: 5,
    menu: 3,
    title: "分配角色",
    code: "user:role",
    desc: "用户分配角色权限",
    sorts: 5,
    conditions: 1,
  },

  {
    id: 6,
    menu: 4,
    title: "新增",
    code: "role:add",
    desc: "角色添加权限",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 7,
    menu: 4,
    title: "修改",
    code: "role:up",
    desc: "角色修改权限",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 8,
    menu: 4,
    title: "查看",
    code: "role:query",
    desc: "角色查看权限",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 18,
    menu: 4,
    title: "分配权限",
    code: "role:power",
    desc: "角色分配权限",
    sorts: 4,
    conditions: 1,
  },
  {
    id: 9,
    menu: 4,
    title: "删除",
    code: "role:del",
    desc: "角色删除权限",
    sorts: 5,
    conditions: 1,
  },
  {
    id: 14,
    menu: 6,
    title: "新增",
    code: "menu:add",
    desc: "菜单添加权限",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 15,
    menu: 6,
    title: "修改",
    code: "menu:up",
    desc: "菜单修改权限",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 16,
    menu: 6,
    title: "查看",
    code: "menu:query",
    desc: "菜单查看权限",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 17,
    menu: 6,
    title: "删除",
    code: "menu:del",
    desc: "菜单删除权限",
    sorts: 2,
    conditions: 1,
  },
];

let menus = [
  {
    id: 1,
    title: "首页",
    url: "/home",
    parent: null,
    desc: "首页",
    sorts: 0,
    conditions: 1,
  },
  {
    id: 2,
    title: "商品",
    url: "/goods",
    parent: null,
    desc: "商品目录分支",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 3,
    title: "订单",
    url: "/order",
    parent: null,
    desc: "订单目录分支",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 4,
    title: "营销",
    url: "/marketing",
    parent: null,
    desc: "营销目录分支",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 5,
    title: "系统管理",
    url: "/system",
    parent: null,
    desc: "系统管理目录分支",
    sorts: 4,
    conditions: 1,
  },
  {
    id: 6,
    title: "用户管理",
    url: "/system/useradmin",
    parent: 5,
    desc: "系统管理/用户管理",
    sorts: 0,
    conditions: 1,
  },
  {
    id: 7,
    title: "角色管理",
    url: "/system/roleadmin",
    parent: 5,
    desc: "系统管理/角色管理",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 8,
    title: "菜单管理",
    url: "/system/menuadmin",
    parent: 5,
    desc: "系统管理/菜单管理",
    sorts: 3,
    conditions: 1,
  },
];

let roles = [
  {
    id: 1,
    title: "超级管理员",
    desc: "所有权限都拥有",
    sorts: 1,
    conditions: 1,
    menuAndPowers: [
      { menuId: 1, powers: [] },
      { menuId: 2, powers: [] },
      { menuId: 3, powers: [] },
      { menuId: 4, powers: [] },
      { menuId: 5, powers: [] },
      { menuId: 6, powers: [1, 2, 3, 4, 5] },
      { menuId: 7, powers: [6, 7, 8, 9, 18] },
      { menuId: 8, powers: [14, 15, 16, 17] },
    ],
  },
  {
    id: 2,
    title: "普通管理员",
    desc: "仅可查看敏感内容",
    sorts: 2,
    conditions: 1,
    menuAndPowers: [
      { menuId: 1, powers: [] },
      { menuId: 2, powers: [] },
      { menuId: 3, powers: [] },
      { menuId: 4, powers: [] },
      { menuId: 5, powers: [] },
      { menuId: 6, powers: [3] },
    ],
  },
  {
    id: 3,
    title: "普通用户",
    desc: "正常完成购物等场景",
    sorts: 3,
    conditions: 1,
    menuAndPowers: [
      { menuId: 1, powers: [] },
      { menuId: 2, powers: [] },
      { menuId: 3, powers: [] },
      { menuId: 4, powers: [] },
    ],
  },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
} else {
  users = JSON.parse(localStorage.getItem("users"));
}
if (!localStorage.getItem("menus")) {
  localStorage.setItem("menus", JSON.stringify(menus));
} else {
  menus = JSON.parse(localStorage.getItem("menus"));
}
if (!localStorage.getItem("powers")) {
  localStorage.setItem("powers", JSON.stringify(powers));
} else {
  powers = JSON.parse(localStorage.getItem("powers"));
}
if (!localStorage.getItem("roles")) {
  localStorage.setItem("roles", JSON.stringify(roles));
} else {
  roles = JSON.parse(localStorage.getItem("roles"));
}

const decode = function (str) {
  if (!str) {
    return str;
  }
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
};

const onLogin = function (p) {
  const local_users = JSON.parse(localStorage.getItem("users")) || [];
  const u = local_users.find(function (item) {
    return item.username === p.username;
  });
  if (!u) {
    return { status: 204, data: null, message: "该用户不存在" };
  } else if (u.password !== p.password) {
    return { status: 204, data: null, message: "密码错误" };
  }

  return { status: 200, data: u, message: "登录成功" };
};

const getMenus = (p) => ({
  status: 200,
  data: JSON.parse(localStorage.getItem("menus")),
  message: "success",
});

const getMenusById = (p) => {
  const local_menus = JSON.parse(localStorage.getItem("menus"));
  const res = Array.isArray(p.id)
    ? local_menus.filter((item) => p.id.includes(item.id))
    : local_menus.filter((item) => item.id === p.id);
  return { status: 200, data: res, message: "success" };
};

const addMenu = (p) => {
  p.id = ++id_sequence;
  const menus = JSON.parse(localStorage.getItem("menus")) || [];
  menus.push(p);
  localStorage.setItem("menus", JSON.stringify(menus));
  return {
    status: 200,
    data: menus,
    message: "添加成功",
  };
};

const upMenu = (p) => {
  let menus = JSON.parse(localStorage.getItem("menus"));
  const index = menus.findIndex((item) => item.id === p.id);
  if (index !== -1) {
    menus[index] = { ...menus[index], ...p };
    localStorage.setItem("menus", JSON.stringify(menus));
    return {
      status: 200,
      data: menus,
      message: "success",
    };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};

const delMenu = (p) => {
  let menus = JSON.parse(localStorage.getItem("menus"));
  const index = menus.findIndex((item) => item.id === p.id);
  if (index !== -1) {
    const hasChild = menus.some((item) => item.parent === menus[index].id);
    if (!hasChild) {
      menus = menus.filter((item) => item.id !== p.id);
      localStorage.setItem("menus", JSON.stringify(menus));
      return {
        status: 200,
        data: menus,
        message: "success",
      };
    } else {
      return { status: 204, data: null, message: "无法删除" };
    }
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};

const getPowerByMenuId = (p) => {
  const menuId = Number(p.menuId);
  const res = menuId
    ? powers.filter((item) => item.menu === menuId).sort((a, b) => a.sorts - b.sorts)
    : [];
  return { status: 200, data: res, message: "success" };
};

const getPowerById = (p) => {
  const res = Array.isArray(p.id)
    ? powers.filter((item) => p.id.includes(item.id))
    : powers.filter((item) => item.id === p.id);
  return { status: 200, data: res, message: "success" };
};

const setPowersByRoleIds = (ps) => {
  const roles = JSON.parse(localStorage.getItem("roles"));

  ps.forEach((p) => {
    const roleIndex = roles.findIndex((item) => item.id === p.id);
    if (roleIndex !== -1) {
      const pow = p.menus.map((item) => ({ menuId: item, powers: [] }));
      p.powers.forEach((ppItem) => {
        const powerData = powers.find((pItem) => pItem.id === ppItem);
        if (powerData) {
          const menuId = powerData.menu;
          const powItem = pow.find((item) => item.menuId === menuId);
          if (powItem) {
            powItem.powers.push(ppItem);
          }
        }
      });
      roles[roleIndex].menuAndPowers = pow;
    }
  });

  localStorage.setItem("roles", JSON.stringify(roles));
  return { status: 200, data: null, message: "success" };
};

const getUserList = (p) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const username = decode(p.username);
  const conditions = Number(p.conditions);

  const filteredUsers = users.filter((item) => {
    return (!username || item.username.includes(username)) &&
           (!conditions || item.conditions === conditions);
  });

  const pageNum = Number(p.pageNum);
  const pageSize = Number(p.pageSize);
  const paginatedUsers = filteredUsers.slice((pageNum - 1) * pageSize, pageNum * pageSize);

  return {
    status: 200,
    data: { list: paginatedUsers, total: filteredUsers.length },
    message: "success",
  };
};

const addUser = (p) => {
  p.id = ++id_sequence;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(p);
  localStorage.setItem("users", JSON.stringify(users));
  return { status: 200, data: null, message: "success" };
};

const upUser = (p) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const index = users.findIndex((item) => item.id === p.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...p };
    localStorage.setItem("users", JSON.stringify(users));
    return { status: 200, data: null, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};

const addPower = (p) => {
  p.id = ++id_sequence;
  powers.push(p);
  return { status: 200, data: { id: p.id }, message: "success" };
};

const upPower = (p) => {
  const index = powers.findIndex((item) => item.id === p.id);
  if (index !== -1) {
    powers[index] = { ...powers[index], ...p };
    return { status: 200, data: { id: p.id }, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};

const delPower = (p) => {
  const powers = JSON.parse(localStorage.getItem("powers"));
  const index = powers.findIndex((item) => item.id === p.id);
  if (index !== -1) {
    powers.splice(index, 1);
    localStorage.setItem("powers", JSON.stringify(powers));
    return { status: 200, data: null, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};

const getRoles = (p) => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const filteredRoles = roles.filter((item) => {
    const title = decode(p.title);
    const conditions = Number(p.conditions);
    return (!title || item.title.includes(title)) && (!conditions || item.conditions === conditions);
  });
  const sortedRoles = filteredRoles.sort((a, b) => a.sorts - b.sorts);
  const paginatedRoles = sortedRoles.slice((p.pageNum - 1) * p.pageSize, p.pageNum * p.pageSize);
  return {
    status: 200,
    data: { list: paginatedRoles, total: filteredRoles.length },
    message: "success",
  };
};


const setPowersByRoleId = (p) => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const roleIndex = roles.findIndex((item) => item.id === p.id);

  if (roleIndex === -1) {
    return { status: 204, data: null, message: "未找到该条数据" };
  }

  const pow = p.menus.map((item) => ({ menuId: item, powers: [] }));
  p.powers.forEach((ppItem) => {
    const powerData = powers.find((pItem) => pItem.id === ppItem);
    if (powerData) {
      const menuId = powerData.menu;
      const powItem = pow.find((item) => item.menuId === menuId);
      if (powItem) {
        powItem.powers.push(ppItem);
      }
    }
  });

  roles[roleIndex].menuAndPowers = pow;
  localStorage.setItem("roles", JSON.stringify(roles));
  return { status: 200, data: null, message: "success" };
};



const delUser = (p) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const index = users.findIndex((item) => item.id === p.id);
  if (index !== -1) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    return { status: 200, data: null, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};

const getAllRoles = (p) => ({
  status: 200,
  data: JSON.parse(localStorage.getItem("roles")),
  message: "success",
});

const getRoleById = (p) => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const res = Array.isArray(p.id)
    ? roles.filter((item) => p.id.includes(item.id))
    : roles.filter((item) => item.id === p.id);
  return { status: 200, data: res, message: "success" };
};

const addRole = (p) => {
  p.id = ++id_sequence;
  p.menuAndPowers = p.menuAndPowers || [];
  roles.push(p);
  return { status: 200, data: null, message: "success" };
};

const upRole = (p) => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const index = roles.findIndex((item) => item.id === p.id);
  if (index !== -1) {
    roles[index] = { ...roles[index], ...p };
    localStorage.setItem("roles", JSON.stringify(roles));
    return { status: 200, data: null, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};

const delRole = (p) => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const index = roles.findIndex((item) => item.id === p.id);
  if (index !== -1) {
    roles.splice(index, 1);
    localStorage.setItem("roles", JSON.stringify(roles));
    return { status: 200, data: null, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};

const findAllPowerByRoleId = (p) => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const role = roles.find((item) => item.id === p.id);
  if (!role) {
    return { status: 204, data: null, message: "未找到该角色" };
  }

  const menus = JSON.parse(localStorage.getItem("menus"));
  const res = role.powers.map((item) => {
    const menu = menus.find((v) => v.id === item.menuId);
    const powersList = item.powers
      .map((v) => powers.find((p) => p.id === v))
      .filter((power) => power.conditions === 1);
    return { ...menu, powers: powersList };
  });

  return { status: 200, data: res, message: "success" };
};

const getAllMenusAndPowers = (p) => {
  const res = menus.map((item) => {
    const powersList = powers.filter((v) => v.menu === item.id && v.conditions === 1);
    return { ...item, powers: powersList };
  });
  return { status: 200, data: res, message: "success" };
};

export default function (obj) {
  const { url, body } = obj;
  let params = typeof body === "string" ? JSON.parse(body) : body;
  let path = url.split("?")[0];

  if (url.includes("?")) {
    const query = new URLSearchParams(url.split("?")[1]);
    params = Object.fromEntries(query.entries());
  }

  if (path.includes("http")) {
    path = path.replace(`${globalThis.location.protocol}//${globalThis.location.host}`, "");
  }

  switch (path) {
    case "/api/login":
      return onLogin(params);
    case "/api/getmenus":
      return getMenus(params);
    case "/api/getMenusById":
      return getMenusById(params);
    case "/api/addmenu":
      return addMenu(params);
    case "/api/upmenu":
      return upMenu(params);
    case "/api/delmenu":
      return delMenu(params);
    case "/api/getpowerbymenuid":
      return getPowerByMenuId(params);
    case "/api/getPowerById":
      return getPowerById(params);
    case "/api/addpower":
      return addPower(params);
    case "/api/uppower":
      return upPower(params);
    case "/api/delpower":
      return delPower(params);
    case "/api/getroles":
      return getRoles(params);
    case "/api/getAllRoles":
      return getAllRoles(params);
    case "/api/getRoleById":
      return getRoleById(params);
    case "/api/addrole":
      return addRole(params);
    case "/api/uprole":
      return upRole(params);
    case "/api/delrole":
      return delRole(params);
    case "/api/findAllPowerByRoleId":
      return findAllPowerByRoleId(params);
    case "/api/getAllMenusAndPowers":
      return getAllMenusAndPowers(params);
    case "/api/setPowersByRoleId":
      return setPowersByRoleId(params);
    case "/api/setPowersByRoleIds":
      return setPowersByRoleIds(params);
    case "/api/getUserList":
      return getUserList(params);
    case "/api/addUser":
      return addUser(params);
    case "/api/upUser":
      return upUser(params);
    case "/api/delUser":
      return delUser(params);
    default:
      return { status: 404, data: null, message: "api not found" };
  }
}
