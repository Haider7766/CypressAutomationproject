export function generateUniqueEmail(prefix = "demo") {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${random}@gmail.com`;
}