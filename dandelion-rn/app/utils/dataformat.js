export function toString(v, df = "") {
  return v ? v.toString() : df;
}

export function toInt(v, df = 0) {
  return v ? parseInt(v) : df;
}

export function toFloat(v, df = 0) {
  return v ? parseFloat(v) : df;
}

export function toBoolean(v, df = false) {
  return v != null ? !!v : df;
}

export function toArray(v, df = []) {
  return v ? (isArray(v) ? v : [v]) : df;
}

export function toFunc(v) {
  return typeof v === "function" ? v : () => {};
}
