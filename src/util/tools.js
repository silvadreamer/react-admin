const tools = {
  pointX(str, x = 0) {
    if (str === undefined || str === null) {
      return str;
    }
    const temp = parseFloat(str);
    if (isNaN(temp)) {
      return str;
    }
    return temp.toFixed(x);
  },

  trim(str) {
    return str.trim();
  },

  addMosaic(str) {
    const s = String(str);
    const length = s.length;
    const howmuch = (() => {
      const l = length - 2;
      return l > 6 ? 6 : l;
    })();
    const start = Math.floor((length - howmuch) / 2);
    return s
      .split("")
      .map((v, i) => (i >= start && i < start + howmuch ? "*" : v))
      .join("");
  },

  checkStr(str) {
    return str === "" || /^[\w]+$/.test(str);
  },

  checkNumber(str) {
    return str === "" || /^\d*$/.test(str);
  },

  checkPhone(str) {
    return /^1[34578]\d{9}$/.test(String(str));
  },

  checkEmail(str) {
    const rex = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
    return rex.test(str);
  },

  compile(code) {
    let c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return c;
  },

  uncompile(code) {
    let c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
  },

  clearNull(obj) {
    const temp = { ...obj };
    for (const key in temp) {
      if (temp.hasOwnProperty(key)) {
        const value = temp[key];
        if (value === null || value === undefined) {
          delete temp[key];
        }
      }
    }
    return temp;
  },
};

export default tools;
