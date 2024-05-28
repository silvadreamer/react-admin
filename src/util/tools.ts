const tools = {
  pointX(str: string | number, x = 0): string | number {
    if (str === undefined || str === null) {
      return str;
    }
    const temp = parseFloat(str as string);
    if (isNaN(temp)) {
      return str;
    }
    return temp.toFixed(x);
  },

  trim(str: string): string {
    return str.trim();
  },

  addMosaic(str: string): string {
    const s = String(str);
    const length = s.length;
    const howmuch = (() => {
      const l = length - 2;
      return l > 6 ? 6 : l;
    })();
    const start = Math.floor((length - howmuch) / 2);
    return s.split('').map((v, i) => (i >= start && i < start + howmuch ? '*' : v)).join('');
  },

  checkStr(str: string): boolean {
    return str === '' || /^[\w]+$/.test(str);
  },

  checkNumber(str: string): boolean {
    return str === '' || /^\d*$/.test(str);
  },

  checkPhone(str: string | number): boolean {
    return /^1[34578]\d{9}$/.test(String(str));
  },

  checkEmail(str: string): boolean {
    const rex = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
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
