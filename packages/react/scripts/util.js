import crypto from 'crypto';
import isObject from 'is-object';

// This function makes server rendering of asset references consistent with different webpack chunk/entry configurations
export function normalizeAssets(assets) {
  if (isObject(assets)) {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
}

export function requireFromString(src, filename) {
  var Module = module.constructor;
  // @ts-ignore
  var m = new Module();
  m._compile(src, filename);
  return m.exports;
}

export function hash(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}
