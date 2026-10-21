export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function getPublicAssetPath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${BASE_PATH}${normalizedPath}`;
}
