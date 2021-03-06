(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var isPlainObject = nx.isPlainObject || require('@jswork/next-is-plain-object');
  var OBJECT_UNDEF = '[object Undefined]';
  var toString = Object.prototype.toString;

  // https://github.com/jonschlinkert/is-plain-object

  function assign(inTarget, inSrc) {
    nx.forIn(inSrc, function (key, value) {
      var type = toString.call(value);
      switch (true) {
        case isPlainObject(value) && !isPrototypePolluted(key):
          inTarget[key] = inTarget[key] || {};
          assign(inTarget[key], value);
          break;
        case type === OBJECT_UNDEF:
          break;
        default:
          inTarget[key] = value;
          break;
      }
    });
  }

  function isPrototypePolluted(key) {
    return /__proto__|constructor|prototype/.test(key);
  }

  nx.deepAssign = function (inTarget) {
    var args = nx.slice(arguments, 1);
    var target = inTarget || {};
    args.forEach(function (arg) {
      assign(target, arg);
    });
    return target;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.deepAssign;
  }
})();
