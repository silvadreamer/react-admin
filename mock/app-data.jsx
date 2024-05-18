
let id_sequence = 1000;

// 所有的用户数据
let users = [
  {
    id: 1,
    username: "admin",
    password: "123456",
    phone: "13531242134",
    email: "admin@bjtu.edu.com",
    desc: "超级管理员",
    conditions: 1,
    roles: [1, 2, 3],
  },
  {
    id: 2,
    username: "user",
    password: "123456",
    phone: "13531242134",
    email: "user@bjtu.edu.com",
    desc: "普通管理员",
    conditions: 1,
    roles: [3],
  },
  {
    id: 3,
    username: "user2",
    password: "123456",
    phone: "13531242135",
    email: "user3@bjtu.edu.com",
    desc: "普通管理员3",
    conditions: 1,
    roles: [2],
  },
  {
    id: 4,
    username: "user",
    password: "$2a$10$zt6dUMTjNSyzINTGyiAgluna3mPm7qdgl26vj4tFpsFO6WlK5lXNm",
    phone: "13600000001",
    email: "user4@bjtu.edu.com",
    desc: "普通管理员4",
    conditions: 1,
    roles: [2],
  },
  {
    id: 5,
    username: "user",
    password: "$2a$10$zt6dUMTjNSyzINTGyiAgluna3mPm7qdgl26vj4tFpsFO6WlK5lXNm",
    phone: "13600000001",
    email: "user@react.com",
    desc: "普通管理员5",
    conditions: 1,
    roles: [2],
  },
];

// 所有的菜单数据
let menus = [
  {
    id: 1,
    title: "首页",
    icon: "icon-home",
    url: "/home",
    parent: null,
    desc: "首页",
    sorts: 0,
    conditions: 1,
  },
  {
    id: 2,
    title: "商品",
    icon: "icon-goods",
    url: "/goods",
    parent: null,
    desc: "商品目录分支",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 3,
    title: "订单",
    icon: "icon-order",
    url: "/order",
    parent: null,
    desc: "订单目录分支",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 4,
    title: "营销",
    icon: "icon-marketing",
    url: "/marketing",
    parent: null,
    desc: "营销目录分支",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 5,
    title: "系统管理",
    icon: "icon-setting",
    url: "/system",
    parent: null,
    desc: "系统管理目录分支",
    sorts: 4,
    conditions: 1,
  },
  {
    id: 6,
    title: "用户管理",
    icon: "icon-user",
    url: "/system/useradmin",
    parent: 5,
    desc: "系统管理/用户管理",
    sorts: 0,
    conditions: 1,
  },
  {
    id: 7,
    title: "角色管理",
    icon: "icon-team",
    url: "/system/roleadmin",
    parent: 5,
    desc: "系统管理/角色管理",
    sorts: 1,
    conditions: 1,
  },
  // {
  //   id: 8,
  //   title: "权限管理",
  //   icon: "icon-safetycertificate",
  //   url: "/system/poweradmin",
  //   parent: 5,
  //   desc: "系统管理/权限管理",
  //   sorts: 2,
  //   conditions: 1,
  // },
  {
    id: 8,
    title: "菜单管理",
    icon: "icon-appstore",
    url: "/system/menuadmin",
    parent: 5,
    desc: "系统管理/菜单管理",
    sorts: 3,
    conditions: 1,
  },
];

// 所有的权限数据
let powers = [
  {
    id: 1,
    menu: 3,
    title: "新增",
    code: "user:add",
    desc: "用户管理 - 添加权限",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 2,
    menu: 3,
    title: "修改",
    code: "user:up",
    desc: "用户管理 - 修改权限",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 3,
    menu: 3,
    title: "查看",
    code: "user:query",
    desc: "用户管理 - 查看权限",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 4,
    menu: 3,
    title: "删除",
    code: "user:del",
    desc: "用户管理 - 删除权限",
    sorts: 4,
    conditions: 1,
  },
  {
    id: 5,
    menu: 3,
    title: "分配角色",
    code: "user:role",
    desc: "用户管理 - 分配角色权限",
    sorts: 5,
    conditions: 1,
  },

  {
    id: 6,
    menu: 4,
    title: "新增",
    code: "role:add",
    desc: "角色管理 - 添加权限",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 7,
    menu: 4,
    title: "修改",
    code: "role:up",
    desc: "角色管理 - 修改权限",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 8,
    menu: 4,
    title: "查看",
    code: "role:query",
    desc: "角色管理 - 查看权限",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 18,
    menu: 4,
    title: "分配权限",
    code: "role:power",
    desc: "角色管理 - 分配权限",
    sorts: 4,
    conditions: 1,
  },
  {
    id: 9,
    menu: 4,
    title: "删除",
    code: "role:del",
    desc: "角色管理 - 删除权限",
    sorts: 5,
    conditions: 1,
  },

  {
    id: 10,
    menu: 5,
    title: "新增",
    code: "power:add",
    desc: "权限管理 - 添加权限",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 11,
    menu: 5,
    title: "修改",
    code: "power:up",
    desc: "权限管理 - 修改权限",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 12,
    menu: 5,
    title: "查看",
    code: "power:query",
    desc: "权限管理 - 查看权限",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 13,
    menu: 5,
    title: "删除",
    code: "power:del",
    desc: "权限管理 - 删除权限",
    sorts: 2,
    conditions: 1,
  },

  {
    id: 14,
    menu: 6,
    title: "新增",
    code: "menu:add",
    desc: "菜单管理 - 添加权限",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 15,
    menu: 6,
    title: "修改",
    code: "menu:up",
    desc: "菜单管理 - 修改权限",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 16,
    menu: 6,
    title: "查看",
    code: "menu:query",
    desc: "菜单管理 - 查看权限",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 17,
    menu: 6,
    title: "删除",
    code: "menu:del",
    desc: "菜单管理 - 删除权限",
    sorts: 2,
    conditions: 1,
  },
];
// 所有的角色数据
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
      // { menuId: 8, powers: [10, 11, 12, 13] },
      { menuId: 8, powers: [14, 15, 16, 17] },
    ],
  },
  {
    id: 2,
    title: "普通管理员",
    desc: "仅可查看",
    sorts: 2,
    conditions: 1,
    menuAndPowers: [
      { menuId: 1, powers: [] },
      { menuId: 2, powers: [] },
      { menuId: 3, powers: [] },
      { menuId: 4, powers: [] },
      { menuId: 5, powers: [] },
      { menuId: 6, powers: [3] },
      { menuId: 7, powers: [6, 7, 8, 18] },
      // { menuId: 5, powers: [10, 11, 12] },
      // { menuId: 6, powers: [14, 15, 16] },
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

if(!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}
else
{
  users = JSON.parse(localStorage.getItem("users"));
}
if(!localStorage.getItem("menus")) {
  localStorage.setItem("menus", JSON.stringify(menus));
}
else
{
  menus = JSON.parse(localStorage.getItem("menus"));
}
if(!localStorage.getItem("powers")) {
  localStorage.setItem("powers", JSON.stringify(powers));
}
else
{
  powers = JSON.parse(localStorage.getItem("powers"));

}
if(!localStorage.getItem("roles")) {
  localStorage.setItem("roles", JSON.stringify(roles));
}
else
{
  roles = JSON.parse(localStorage.getItem("roles"));
}

// localStorage.setItem("users", JSON.stringify(users));
// localStorage.setItem("menus", JSON.stringify(menus));
// localStorage.setItem("powers", JSON.stringify(powers));
// localStorage.setItem("roles", JSON.stringify(roles));


// export { AppDataContext, AppDataProvider };


/**
 * 工具 - decode
 * **/
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

// 登录
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
// const onLogin = function (p) {
//   const u = users.find(function (item) {
//     return item.username === p.username;
//   });
//   if (!u) {
//     return { status: 204, data: null, message: "该用户不存在" };
//   } 
  
//   console.log(p.password, u.password);
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(p.password, u.password, function(err, result) {
//       if (err) {
//         reject(err);
//       } else if (result) {
//         resolve({ status: 200, data: u, message: "登录成功" });
//       } else {
//         resolve({ status: 204, data: null, message: "密码错误" });
//       }
//     });
//   });
// };

// 获取所有菜单
const getMenus = function (p) {
  console.log(p)
  return { status: 200, data: JSON.parse(localStorage.getItem("menus")), message: "success" };
  // return { status: 200, data: menus, message: "success" };
};


// 获取菜单（根据ID）
const getMenusById = function (p) {
  let res = [];
  console.info(p)
  if (p.id instanceof Array) {
    const local_menus = JSON.parse(localStorage.getItem("menus"));
    res = local_menus.filter(function (item) {
      return p.id.includes(item.id);
    });
  } else {
    const local_menus = JSON.parse(localStorage.getItem("menus"));
    const t = local_menus.find(function (item) {
      return item.id === p.id;
    });
    res.push(t);
  }
  return { status: 200, data: res, message: "success" };
};

// 添加新菜单
const addMenu = function (p) {
  // const p = JSON.parse(request.body);
  p.id = ++id_sequence;
  localStorage.setItem("menus", JSON.stringify([...menus, p]));
  //menus.push(p);
  return { status: 200, data: JSON.parse(localStorage.getItem("menus")), message: "添加成功" };
  // return { status: 200, data: menus, message: "添加成功" };
};

// 修改菜单
const upMenu = function (p) {
  const local_menus = JSON.parse(localStorage.getItem("menus"));
  const oldIndex = local_menus.findIndex(function (item) {
    return item.id === p.id;
  });
  if (oldIndex !== -1) {
    const news = Object.assign({}, localStorage.getItem("menus")[oldIndex], p);
    localStorage.setItem("menus", JSON.stringify([...menus.slice(0, oldIndex), news, ...menus.slice(oldIndex + 1)]));
    
    // const news = Object.assign({}, menus[oldIndex], p);
    // menus.splice(oldIndex, 1, news);
    return { status: 200, data: JSON.parse(localStorage.getItem("menus")), message: "success" };
    // return { status: 200, data: menus, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};
// 删除菜单
const delMenu = function (p) {
  // const p = JSON.parse(request.body);
  const local_menus = JSON.parse(localStorage.getItem("menus"));
  const oldIndex = local_menus.findIndex(function (item) {
    return item.id === p.id;
  });

  if (oldIndex !== -1) {
    const local_menus = JSON.parse(localStorage.getItem("menus"));
    const haveChild = local_menus.findIndex(function (item) {
      return item.parent === local_menus[oldIndex].id;
    });
    if (haveChild === -1) {
      localStorage.setItem("menus", JSON.stringify([...menus.slice(0, oldIndex), ...menus.slice(oldIndex + 1)]));

      // menus.splice(oldIndex, 1);
      return { status: 200, data: JSON.parse(localStorage.getItem("menus")), message: "success" };
    } else {
      return { status: 204, data: null, message: "该菜单下有子菜单，无法删除" };
    }
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};
// 根据菜单ID查询其下权限
const getPowerByMenuId = function (p) {
  // const p = JSON.parse(request.body);
  const menuId = Number(p.menuId);

  if (menuId) {
    return {
      status: 200,
      data: powers
        .filter(function (item) {
          return item.menu === menuId;
        })
        .sort(function (a, b) {
          return a.sorts - b.sorts;
        }),
      message: "success",
    };
  } else {
    return { status: 200, data: [], message: "success" };
  }
};
// 根据权限ID查询对应的权限
const getPowerById = function (p) {
  // const p = JSON.parse(request.body);
  let res = [];
  if (p.id instanceof Array) {
    res = powers.filter(function (item) {
      return p.id.includes(item.id);
    });
  } else {
    const t = powers.find(function (item) {
      return item.id === p.id;
    });
    res.push(t);
  }
  return { status: 200, data: res, message: "success" };
};
// 添加权限
const addPower = function (p) {
  // const p = JSON.parse(request.body);
  p.id = ++id_sequence;
  powers.push(p);
  return { status: 200, data: { id: p.id }, message: "success" };
};
// 修改权限
const upPower = function (p) {
  // const p = JSON.parse(request.body);

  const oldIndex = powers.findIndex(function (item) {
    return item.id === p.id;
  });
  if (oldIndex !== -1) {
    const news = Object.assign({}, powers[oldIndex], p);
    powers.splice(oldIndex, 1, news);
    return { status: 200, data: { id: p.id }, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};
// 删除权限
const delPower = function (p) {
  const local_powers = JSON.parse(localStorage.getItem("powers"));
  const oldIndex = local_powers.findIndex(function (item) {
    return item.id === p.id;
  });

  if (oldIndex !== -1) {
    localStorage.setItem("powers", JSON.stringify([...powers.slice(0, oldIndex), ...powers.slice(oldIndex + 1)]));
//    powers.splice(oldIndex, 1);
    return { status: 200, data: null, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};
// 查询角色（分页,条件筛选）
const getRoles = function (p) {
  const local_roles = JSON.parse(localStorage.getItem("roles"));
  const map = local_roles.filter(function (item) {
    let yeah = true;
    const title = decode(p.title);
    const conditions = Number(p.conditions);
    if (title && !item.title.includes(title)) {
      yeah = false;
    }
    if (conditions && item.conditions !== conditions) {
      yeah = false;
    }
    return yeah;
  });
  const r = map.sort(function (a, b) {
    return a.sorts - b.sorts;
  });
  const res = r.slice((p.pageNum - 1) * p.pageSize, p.pageNum * p.pageSize);
  return {
    status: 200,
    data: { list: res, total: map.length },
    message: "success",
  };
};
// 查询角色（所有）
const getAllRoles = function (p) {
  const local_roles = JSON.parse(localStorage.getItem("roles"));
  return { status: 200, data: local_roles, message: "success" };
};
// 查询角色（通过角色ID）
const getRoleById = function (p) {
  // const p = JSON.parse(request.body);
  let res = [];
  const local_roles = JSON.parse(localStorage.getItem("roles"));
  if (p.id instanceof Array) {
    res = local_roles.filter(function (item) {
      return p.id.includes(item.id);
    });
  } else {
    const t = local_roles.find(function (item) {
      return item.id === p.id;
    });
    res.push(t);
  }
  return { status: 200, data: res, message: "success" };
};
// 添加角色
const addRole = function (p) {
  // const p = JSON.parse(request.body);
  p.id = ++id_sequence;
  if (!p.menuAndPowers) {
    p.menuAndPowers = [];
  }
  roles.push(p);
  return { status: 200, data: null, message: "success" };
};
// 修改角色
const upRole = function (p) {
  // const p = JSON.parse(request.body);
  const local_roles = JSON.parse(localStorage.getItem("roles"));
  const oldIndex = local_roles.findIndex(function (item) {
    return item.id === p.id;
  });
  if (oldIndex !== -1) {
    const news = Object.assign({}, local_roles[oldIndex], p);
    localStorage.setItem("roles", JSON.stringify([...roles.slice(0, oldIndex), news, ...roles.slice(oldIndex + 1)]));
//    roles.splice(oldIndex, 1, news);
    return { status: 200, data: null, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};
// 删除角色
const delRole = function (p) {
  // const p = JSON.parse(request.body);
  const local_roles = JSON.parse(localStorage.getItem("roles"));
  const oldIndex = local_roles.findIndex(function (item) {
    return item.id === p.id;
  });
  if (oldIndex !== -1) {
    localStorage.setItem("roles", JSON.stringify([...roles.slice(0, oldIndex), ...roles.slice(oldIndex + 1)]));
//    roles.splice(oldIndex, 1);
    return { status: 200, data: null, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};

// 根据角色ID查询该角色所拥有的菜单和权限详细信息
const findAllPowerByRoleId = function (p) {
  // const p = JSON.parse(request.body);
  const local_roles = JSON.parse(localStorage.getItem("roles"));
  const t = local_roles.find(function (item) {
    return item.id === p.id;
  });
  if (t) {
    const res = t.powers.map(function (item, index) {
      const local_menus = JSON.parse(localStorage.getItem("menus"));
      const _menu = local_menus.find(function (v) {
        return v.id === item.menuId;
      });
      const _powers = item.powers.map(function (v) {
        return powers.find(function (p) {
          return p.id === v;
        });
      });
      _menu.powers = _powers.filter(function (item) {
        return item.conditions === 1;
      });
      return _menu;
    });
    return { status: 200, data: res, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该角色" };
  }
};
// 获取所有的菜单及权限数据 - 为了构建PowerTree组件
const getAllMenusAndPowers = function (p) {
  const res = menus.map(function (item) {
    const _menu = item;
    const _powers = powers.filter(function (v) {
      return v.menu === item.id && v.conditions === 1;
    });
    _menu.powers = _powers;
    return _menu;
  });
  return { status: 200, data: res, message: "success" };
};
// 给指定角色分配菜单和权限
const setPowersByRoleId = function (p) {
  // const p = JSON.parse(request.body);
  const local_roles = JSON.parse(localStorage.getItem("roles"));
  console.info(local_roles)
  const oldIndex = local_roles.findIndex(function (item) {
    return item.id === p.id;
  });

  if (oldIndex !== -1) {
    const pow = p.menus.map(function (item) {
      return { menuId: item, powers: [] };
    });
    // 将每一个权限id归类到对应的菜单里
    p.powers.forEach(function (ppItem) {
      // 通过权限id查询该权限对象
      const thePowerData = powers.find(function (pItem) {
        return pItem.id === ppItem;
      });
      if (thePowerData) {
        const theMenuId = thePowerData.menu;
        if (theMenuId) {
          const thePow = pow.find(function (powItem) {
            return powItem.menuId === theMenuId;
          });
          if (thePow) {
            thePow.powers.push(ppItem);
          }
        }
      }
    });

    local_roles[oldIndex].menuAndPowers = pow;
    localStorage.setItem("roles", JSON.stringify(local_roles));
    return { status: 200, data: null, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};

// 给指定角色分配菜单和权限
const setPowersByRoleIds = function (ps) {
  ps.forEach(function (p) {
    const local_roles = JSON.parse(localStorage.getItem("roles"));
    const oldIndex = local_roles.findIndex(function (item) {
      return item.id === p.id;
    });
    if (oldIndex !== -1) {
      const pow = p.menus.map(function (item) {
        return { menuId: item, powers: [] };
      });
      // 将每一个权限id归类到对应的菜单里
      p.powers.forEach(function (ppItem) {
        // 通过权限id查询该权限对象
        const thePowerData = powers.find(function (pItem) {
          return pItem.id === ppItem;
        });
        if (thePowerData) {
          const theMenuId = thePowerData.menu;
          if (theMenuId) {
            const thePow = pow.find(function (powItem) {
              return powItem.menuId === theMenuId;
            });
            if (thePow) {
              thePow.powers.push(ppItem);
            }
          }
        }
      });
      local_roles[oldIndex].menuAndPowers = pow;
      localStorage.setItem("roles", JSON.stringify(local_roles));
    }
  });
  return { status: 200, data: null, message: "success" };
};

// 条件分页查询用户列表
const getUserList = function (p) {
  const local_users = JSON.parse(localStorage.getItem("users"));
  const map = local_users.filter(function (item) {
    let yeah = true;
    const username = decode(p.username);
    const conditions = Number(p.conditions);
    if (username && !item.username.includes(username)) {
      yeah = false;
    }
    if (conditions && item.conditions != conditions) {
      yeah = false;
    }
    return yeah;
  });
  const pageNum = Number(p.pageNum); // 从第1页开始
  const pageSize = Number(p.pageSize);
  const res = map.slice((pageNum - 1) * pageSize, pageNum * pageSize);
  return {
    status: 200,
    data: { list: res, total: map.length },
    message: "success",
  };
};
// 添加用户
const addUser = function (p) {
  // const p = JSON.parse(request.body);
  p.id = ++id_sequence;
  localStorage.setItem("users", JSON.stringify([...users, p]));
  //users.push(p);
  return { status: 200, data: null, message: "success" };
};
// 修改用户
const upUser = function (p) {
  // const p = JSON.parse(request.body);
  const local_users = JSON.parse(localStorage.getItem("users"));
  const oldIndex = local_users.findIndex(function (item) {
    return item.id === p.id;
  });
  if (oldIndex !== -1) {
    const news = Object.assign({}, local_users[oldIndex], p);
    local_users.splice(oldIndex, 1, news);
    return { status: 200, data: null, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};
// 删除用户
const delUser = function (p) {
  // const p = JSON.parse(request.body);
  const local_users = JSON.parse(localStorage.getItem("users"));
  const oldIndex = local_users.findIndex(function (item) {
    return item.id === p.id;
  });
  if (oldIndex !== -1) {
    local_users.splice(oldIndex, 1);
    return { status: 200, data: null, message: "success" };
  } else {
    return { status: 204, data: null, message: "未找到该条数据" };
  }
};

export default function (obj) {
  const url = obj.url;
  const body = obj.body;
  let params = typeof body === "string" ? JSON.parse(body) : body;
  let path = url;

  // 是get请求 解析参数
  if (url.includes("?")) {
    path = url.split("?")[0];
    const s = url.split("?")[1].split("&"); // ['a=1','b=2']
    params = {};

    for (let i = 0; i < s.length; i++) {
      if (s[i]) {
        const ss = s[i].split("=");
        params[ss[0]] = ss[1];
      }
    }
  }
  if (path.includes("http")) {
    path = path.replace(
      globalThis.location.protocol + "//" + globalThis.location.host,
      ""
    );
  }
  console.info("请求接口：", path, params);
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
