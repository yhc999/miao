var yyangfly = {
  identity: function (x) {
    return x;
  },

  eq: function (value, other) {
    if (typeof value != typeof other) {
      return false;
    } else if (typeof value === "number") {
      if (Number.isNaN(value) && Number.isNaN(other)) {
        return true;
      } else if (value === +0 && other === -0) {
        return true;
      } else if (value === -0 && other === +0) {
        return true;
      } else if (value === other) {
        return true;
      } else {
        return false;
      }
    } else {
      if (typeof value === "undefined") {
        return true;
      } else if (value === null) {
        return true;
      } else if (typeof value === "string") {
        if (value.length != other.length) {
          return false;
        }
        for (let i = 0; i < value.length; i++) {
          if (value[i] != other[i]) {
            return false;
          }
        }
        return true;
      } else if (typeof value === "boolean") {
        return value === other;
      } else if (typeof value === "symbol") {
        return value === other;
      } else {
        return value === other;
      }
    }
  },

  isMatch: function (object, source) {
    for (let key in source) {
      if (!(key in object) || !_.eq(object[key], source[key])) {
        return false;
      }
    }
    return true;
  },

  matches: function (source) {
    return (object) => {
      return _.isMatch(object, source);
    };
  },

  matchesProperty: function (path, srcValue) {
    return (object) => {
      return _.eq(object[path], srcValue);
    }
  },

  property: function (path) {
    return (object) => {
      if (typeof path === "string") {
        path = path.split('.');
      }
      let res = object;
      for (let p of path) {
        res = res[p];
      }
      return res;
    };
  },

  iteratee: function (func = _.identity) {
    if (typeof func === "function") {
      return func;
    } else if (typeof func === "string") {
      return _.property(func);
    } else if (Array.isArray(func)) {
      return _.matchesProperty(func[0], func[1]);
    } else {
      return _.matches(func);
    }
  },

  compact: function (array) {
    let newArr = [];
    array.forEach(element => {
      if (element != false && element != null && element != 0 && element != -0 && element != 0n && element != "" && element != undefined && !Number.isNaN(element)) {
        newArr.push(element);
      }
    });
    return newArr;
  },

  chunk: function (array, number = 1) {
    if (number === 1) {
      return array;
    } else {
      const res = [];
      let cnt = 0;
      let subArr = [];
      array.forEach(element => {
        if (cnt === number) {
          res.push(subArr);
          subArr = [];
          cnt = 0;
        }
        subArr.push(element);
        cnt += 1;
      });
      res.push(subArr);
      return res;
    }
  },

  fill: function (arr, val, start = 0, end = arr.length) {
    for (let i = start; i < end; i++) {
      arr[i] = val;
    }
  },

  drop: function (arr, num = 1) {
    if (num >= arr.length) {
      return [];
    } else {
      let res = [];
      for (let i = num; i < arr.length; i += 1) {
        res.push(arr[i]);
      }
      return res;
    }
  },

  flatten: function (arr) {
    let res = [];
    for (let item of arr) {
      if (Array.isArray(item)) {
        for (let val of item) {
          res.push(val);
        }
      } else {
        res.push(item);
      }
    }
    return res;
  },

  flattenDeep: function (arr) {
    let res = [];
    function flattenDfs(arr, res) {
      for (let item of arr) {
        if (Array.isArray(item)) {
          flattenDfs(item, res);
        } else {
          res.push(item);
        }
      }
    }
    flattenDfs(arr, res);
    return res;
  },

  flattenDepth: function (array, depth = 1) {
    let res = [];
    function flattenDfs(arr, res, cnt) {
      if (cnt === depth) {
        for (let val of arr) {
          res.push(val);
        }
        return;
      }
      for (let item of arr) {
        if (Array.isArray(item)) {
          cnt += 1;
          flattenDfs(item, res, cnt);
          cnt -= 1;
        } else {
          res.push(item);
        }
      }
    }
    flattenDfs(array, res, 0);
    return res;
  },

  fromPairs: function (pairs) {
    const map = {};
    for (let pair of pairs) {
      map[pair[0]] = pair[1];
    }
    return map;
  },

  toPairs: function (object) {
    const pairs = [];
    for (let key of Object.keys(object)) {
      let pair = [key, object[key]];
      pairs.push(pair);
    }
    return pairs;
  },

  head: function (array) {
    return array[0];
  },

  indexOf: function (array, value, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value)
        return i;
    }
    return -1;
  },

  lastIndexOf: function (array, value, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value)
        return i;
    }
    return -1;
  },

  initial: function (array) {
    let res = [];
    for (let i = 0; i < array.length - 1; i++) {
      res.push(array[i]);
    }
    return res;
  },

  join: function (array, separator = ',') {
    let joined = "";
    for (let i = 0; i < array.length - 1; i++) {
      joined = joined + array[i] + separator;
    }
    joined = joined + array[array.length - 1];
    return joined;
  },

  last: function (array) {
    if (array.length === 0) {
      return null;
    } else {
      return array[array.length - 1];
    }
  },

  pull: function (array, ...args) {
    let s = "";
    for (let arg of args) {
      s += arg;
    }
    for (let i = array.length - 1; i >= 0; i--) {
      if (s.includes(array[i])) {
        array.splice(i, 1);
      }
    }
  },

  reverse: function (array) {
    let n = array.length;
    for (let i = 0; i < Math.trunc(n / 2); i++) {
      let val = array[i];
      array[i] = array[n - 1 - i];
      array[n - 1 - i] = val;
    }
  },

  countBy: function (collection, iteratee = _.identity) {
    let res = {};
    if (typeof iteratee === "function") {
      for (let item of collection) {
        let val = iteratee(item);
        if (val in res) {
          res[val] = res[val] + 1;
        } else {
          res[val] = 1;
        }
      }
    } else if (typeof iteratee === "string") {
      for (let item of collection) {
        let val = item[iteratee];
        if (val in res) {
          res[val] = res[val] + 1;
        } else {
          res[val] = 1;
        }
      }
    }
    return res;
  },

  groupBy: function (collection, iteratee = _.identity) {
    let res = {};
    if (typeof iteratee === "function") {
      for (let item of collection) {
        let key = iteratee(item);
        if (!(key in res)) {
          res[key] = [];
        }
        res[key].push(item);
      }
    } else if (typeof iteratee === "string") {
      for (let item of collection) {
        let key = item[iteratee];
        if (!(key in res)) {
          res[key] = [];
        }
        res[key].push(item);
      }
    }
    return res;
  },

  keyBy: function (collection, iteratee = _.identity) {
    let res = {};
    if (typeof iteratee === "function") {
      for (let item of collection) {
        let key = iteratee(item);
        res[key] = item;
      }
    } else if (typeof iteratee === "string") {
      for (let item of collection) {
        let key = item[iteratee];
        res[key] = item;
      }
    }
    return res;
  },

  forEach: function (collection, iteratee = _.identity) {
    const params = iteratee.toString()
      .match(/\(([^)]*)\)/)[1]
      .split(',')
      .map(s => s.trim());
    if (params.length === 1) {
      for (let val of collection) {
        iteratee(val);
      }
    } else if (params.length === 2) {
      for (let key in collection) {
        iteratee(collection[key], key);
      }
    }
  },

  map: function (collection, iteratee = _.identity) {
    let res = [];
    if (typeof iteratee === "function") {
      for (let key in collection) {
        res.push(iteratee(collection[key]));
      }
    } else if (typeof iteratee === "string") {
      for (let item of collection) {
        res.push(item[iteratee]);
      }
    }
    return res;
  },

  filter: function (collection, predicate = _.identity) {
    let res = [];
    if (typeof predicate === "function") {
      for (let key in collection) {
        if (predicate(collection[key])) {
          res.push(collection[key]);
        }
      }
    } else if (Array.isArray(predicate)) {
      let check = _.matchesProperty(predicate[0], predicate[1]);
      for (let item of collection) {
        if (check(item)) {
          res.push(item);
        }
      }
    } else if (typeof predicate === "string") {
      let check = _.property(predicate);
      for (let item of collection) {
        if (check(item)) {
          res.push(item);
        }
      }
    } else {
      let check = _.matches(predicate);
      for (let item of collection) {
        if (check(item)) {
          res.push(item);
        }
      }
    }
    return res;
  },

  reduce: function (collection, iteratee = _.identity, accumulator) {
    const n = iteratee.toString()
      .match(/\(([^)]*)\)/)[1]
      .split(',')
      .map(s => s.trim()).length;
    if (n === 2) {
      for (let val of collection) {
        accumulator = iteratee(accumulator, val);
      }
      return accumulator;
    } else if (n === 3) {
      for (let key in collection) {
        let val = collection[key];
        accumulator = iteratee(accumulator, val, key);
      }
      return accumulator;
    }
  },

  reduceRight: function (collection, iteratee = _.identity, accumulator) {
    const n = iteratee.toString()
      .match(/\(([^)]*)\)/)[1]
      .split(',')
      .map(s => s.trim()).length;
    if (n === 2) {
      for (let i = collection.length - 1; i >= 0; i--) {
        let val = collection[i];
        accumulator = iteratee(accumulator, val);
      }
      return accumulator;
    } else if (n === 3) {
      for (let key = collection.length - 1; i >= 0; i--) {
        let val = collection[key];
        accumulator = iteratee(accumulator, val, key);
      }
      return accumulator;
    }
  },

  size: function (collection) {
    if (Array.isArray(collection)) {
      return collection.length;
    } else if (typeof collection === "string") {
      return collection.length;
    } else {
      let cnt = 0;
      for (let key in collection)
        cnt += 1;
      return cnt;
    }
  },

  sample: function (collection) {
    let randIndex = Math.trunc(Math.random() * collection.length);
    return collection[randIndex];
  },

  isUndefined: function (value) {
    if (typeof value === "undefined") {
      return true;
    } else {
      return false;
    }
  },

  isNull: function (value) {
    return value === null;
  },

  isNil: function (value) {
    return _.isUndefined(value) || _.isNull(value);
  },

  max: function (array) {
    if (_.isNil(array) || array.length === 0) {
      return undefined;
    } else {
      let max = array[0];
      for (let i = 0; i < array.length; i++) {
        if (array[i] > max)
          max = array[i];
      }
      return max;
    }
  },

  min: function (array) {
    if (_.isNil(array) || array.length === 0) {
      return undefined;
    } else {
      let min = array[0];
      for (let i = 0; i < array.length; i++) {
        if (array[i] < min)
          min = array[i];
      }
      return min;
    }
  },

  maxBy: function (array, iteratee = _.identity) {
    if (_.isNil(array) || array.length === 0) {
      return undefined;
    }
    let func = _.iteratee(iteratee);
    let max = array[0];
    for (let item of array) {
      if (func(item) > func(max)) {
        max = item;
      }
    }
    return max;
  },

  minBy: function (array, iteratee = _.identity) {
    if (_.isNil(array) || array.length === 0) {
      return undefined;
    }
    let func = _.iteratee(iteratee);
    let min = array[0];
    for (let item of array) {
      if (func(item) < func(min)) {
        min = item;
      }
    }
    return min;
  },

  round: function (number, precision = 0) {
    let integer = Math.trunc(number);
    let float = number - Math.trunc(number);
    if (precision < 0) {
      let count = -precision;
      while (count > 1) {
        integer = Math.trunc(integer / 10);
        count -= 1;
      }
      let digit = integer % 10;
      let left = Math.trunc(integer / 10);
      if (digit >= 5) {
        left += 1;
      }
      count = -precision;
      while (count > 0) {
        left *= 10;
        count -= 1;
      }
      return left;
    } else if (precision > 0) {
      let count = precision;
      while (count > 0) {
        float *= 10;
        count -= 1;
      }
      float = Math.trunc(float * 10);
      let digit = float % 10;
      if (digit >= 5) {
        float = (Math.trunc(float / 10) + 1) * 10;
      } else {
        float = Math.trunc(float / 10) * 10;
      }
      count = precision + 1;
      while (count > 0) {
        float /= 10;
        count -= 1;
      }
      return integer + float;
    } else {
      let digit = Math.trunc(float * 10);
      if (digit >= 5) {
        return integer + 1;
      } else {
        return integer;
      }
    }
  },

  sumBy: function (array, iteratee = _.identity) {
    let func = _.iteratee(iteratee);
    let sum = 0;
    for (let item of array) {
      sum += func(item);
    }
    return sum;
  },

  flatMap: function (collection, iteratee = _.identity) {
    let func = _.iteratee(iteratee);
    let res = [];
    for (let item of collection) {
      res.push(func(item));
    }
    return res;
  },

  get: function (object, path, defaultValue) {
    if (typeof path === "string") {
      path = path.split(".");
    }
    let res = object;
    for (let p of path) {
      for (let i = 0; i < p.length; i++) {
        if (_.eq(p[i], '[')) {
          let key = "";
          i += 1;
          while (!_.eq(p[i], ']')) {
            key = key + p[i];
            i += 1;
          }
          res = res[key];
        } else {
          let key = p[i];
          while (i + 1 < p.length && p[i + 1] != '[') {
            i += 1;
            key += p[i];
          }
          res = res[key];
        }
        if (_.isUndefined(res))
          return defaultValue;
      }
    }
    return res;
  },

  has: function (object, path) {
    if (_.eq(_.get(object, path, 'default'), 'default')) {
      return false;
    } else {
      return true;
    }
  },

  mapKeys: function (object, iteratee = _.identity) {
    let maped = {};
    let func = _.iteratee(iteratee);
    for (let key in object) {
      let newKey = func(object[key], key);
      maped[newKey] = object[key];
    }
    return maped;
  },

  mapValues: function (object, iteratee = _.identity) {
    let maped = {};
    let func = _.iteratee(iteratee);
    for (let key in object) {
      let newValue = func(object[key], key);
      maped[key] = newValue;
    }
    return maped;
  },

  concat: function (array, ...values) {
    let res = [];
    for (let val of array) {
      res.push(val);
    }
    for (let value of values) {
      if (Array.isArray(value)) {
        for (let item of value) {
          res.push(item);
        }
      } else {
        res.push(value);
      }
    }
    return res;
  },

  repeat: function (string = '', n = 1) {
    let res = "";
    for (let i = 0; i < n; i++) {
      res += string;
    }
    return res;
  },

  padStart: function (string = '', length = 0, chars = ' ') {
    let padString = "";
    while (string.length + padString.length < length) {
      padString += chars;
    }
    if (string.length + padString.length > length) {
      let count = string.length + padString.length - length;
      padString = padString.slice(0, padString.length - count);
    }
    return padString + string;
  },

  padEnd: function (string = '', length = 0, chars = ' ') {
    let padString = "";
    while (string.length + padString.length < length) {
      padString += chars;
    }
    if (string.length + padString.length > length) {
      let count = string.length + padString.length - length;
      padString = padString.slice(0, padString.length - count);
    }
    return string + padString;
  },

  keys: function (object) {
    let keys = [];
    for (let key in object) {
      if (Object.hasOwn(object, key))
        keys.push(key);
    }
    return keys;
  },

  ceil: function (number, precision = 0) {
    if (precision > 0) {
      let count = precision;
      while (count > 0) {
        number *= 10;
        count -= 1;
      }
      let integer = Math.trunc(number);
      let float = number - integer;
      if (float > 0) {
        number = integer + 1;
      } else {
        number = integer;
      }
      while (precision > 0) {
        number /= 10;
        precision -= 1;
      }
      return number;
    } else if (precision < 0) {
      let count = precision;
      while (count < 0) {
        number /= 10;
        count += 1;
      }
      let integer = Math.trunc(number);
      let float = number - integer;
      if (float > 0) {
        number = integer + 1;
      } else {
        number = integer;
      }
      while (precision < 0) {
        number *= 10;
        precision += 1;
      }
      return number;
    } else {
      let integer = Math.trunc(number);
      let float = number - integer;
      if (float > 0) {
        return integer + 1;
      } else {
        return integer;
      }
    }
  },

  floor: function (number, precision = 0) {
    if (precision > 0) {
      let count = precision;
      while (count > 0) {
        number *= 10;
        count -= 1;
      }
      let integer = Math.trunc(number);
      while (precision > 0) {
        integer /= 10;
        precision -= 1;
      }
      return integer;
    } else if (precision < 0) {
      let count = precision;
      while (count < 0) {
        number /= 10;
        count += 1;
      }
      let integer = Math.trunc(number);
      while (precision < 0) {
        integer *= 10;
        precision += 1;
      }
      return integer;
    } else {
      return Math.trunc(number);
    }
  },
}
