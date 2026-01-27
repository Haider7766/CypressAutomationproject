export function generateUniqueEmail(prefix = "demo") {
  const timestamp = Date.now();
  return `${prefix}_${timestamp}@gmail.com`;
}
