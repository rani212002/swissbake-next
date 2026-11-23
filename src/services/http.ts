/**
 * Single switch between local JSON and a live API.
 *
 *  - API_BASE_URL unset  -> reads the JSON file passed as `local`
 *  - API_BASE_URL set    -> GET {API_BASE_URL}{endpoint}, expects the same shape as the JSON
 *
 * To plug in your backend you normally only set the env var and, if the
 * response shape differs, adjust types/dto.ts + lib/mappers.ts.
 */
export async function fetchResource<T>(
  endpoint: string,
  local: () => Promise<{ default: unknown }>,
): Promise<T> {
  const base = process.env.API_BASE_URL;

  if (!base) {
    const mod = await local();
    return mod.default as T;
  }

  const res = await fetch(`${base.replace(/\/$/, "")}${endpoint}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`API ${endpoint} failed: ${res.status}`);
  return (await res.json()) as T;
}
