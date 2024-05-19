const tools = {
  pointX(str: string | number, x = 0): string | number {
    if (!str && str !== 0) {
      return str;
    }
    const temp = Number(str);
    if (temp === 0) {
      return temp.toFixed(x);
    }
    return temp ? temp.toFixed(x) : str;
  },

  trim(str: string): string {
    const reg = /^\s*|\s*$/g;
    return str.replace(reg, "");
  },

  addMosaic(str: string): string {
    const s = String(str);
    const lenth = s.length;
    const howmuch = ((): number => {
      if (s.length <= 2) {
        return 0;
      }
      const l = s.length - 2;
      if (l <= 6) {
        return l;
      }
      return 6;
    })();
    const start = Math.floor((lenth - howmuch) / 2);
    const ret = s.split("").map((v, i) => {
      if (i >= start && i < start + howmuch) {
        return "*";
      }
      return v;
    });
    return ret.join("");
  },

  checkStr(str: string): boolean {
    if (str === "") {
      return true;
    }
    const rex = /^[_a-zA-Z0-9]+$/;
    return rex.test(str);
  },

  checkNumber(str: string): boolean {
    if (!str) {
      return true;
    }
    const rex = /^\d*$/;
    return rex.test(str);
  },

  checkPhone(str: string | number): boolean {
    const rex = /^1[34578]\d{9}$/;
    return rex.test(String(str));
  },

  checkEmail(str: string): boolean {
    const rex =
      /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
    return rex.test(str);
  },

  compile(code: string): string {
    let c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return c;
  },

  uncompile(code: string): string {
    let c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
  },

  clearNull<T>(obj: T): T {
    const temp: any = { ...obj };
    for (const key in temp) {
      if (temp.hasOwnProperty(key)) {
        const value = temp[key];
        if (value === null || value === undefined) {
          delete temp[key];
        }
      }
    }
    return temp as T;
  },
};

export default tools;
