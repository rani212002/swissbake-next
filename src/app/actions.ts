"use server";

/** POST {API_BASE_URL}/newsletter. Falls back to a no-op success while on JSON data. */
export async function subscribeToNewsletter(email: string): Promise<{ ok: boolean }> {
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false };

  const base = process.env.API_BASE_URL;
  if (!base) return { ok: true };

  const res = await fetch(`${base.replace(/\/$/, "")}/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return { ok: res.ok };
}

/* ------------------------------------------------------------------ forms */
export type FormResult = { ok: boolean; message: string };

async function post(endpoint: string, payload: Record<string, unknown>, okMessage: string): Promise<FormResult> {
  const base = process.env.API_BASE_URL;
  // JSON mode: nothing to send to yet, so just confirm receipt.
  if (!base) return { ok: true, message: okMessage };
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok ? { ok: true, message: okMessage } : { ok: false, message: "Something went wrong. Please try again." };
  } catch {
    return { ok: false, message: "Could not reach the server. Please try again." };
  }
}

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const emailOk = (e: string) => /^\S+@\S+\.\S+$/.test(e);

export async function submitContact(_prev: FormResult | null, f: FormData): Promise<FormResult> {
  const payload = { name: str(f, "name"), email: str(f, "email"), phone: str(f, "phone"), state: str(f, "state"), message: str(f, "message") };
  if (!payload.name || !emailOk(payload.email) || !payload.message) {
    return { ok: false, message: "Enter your name, a valid email and a message." };
  }
  return post("/contact", payload, "Thank you. Our team will get back to you shortly.");
}

export async function submitBakerSupport(_prev: FormResult | null, f: FormData): Promise<FormResult> {
  const payload = Object.fromEntries([...f.entries()].map(([k, v]) => [k, String(v).trim()]));
  if (!payload.name || !payload.company || !emailOk(String(payload.email ?? ""))) {
    return { ok: false, message: "Enter your name, company and a valid email." };
  }
  return post("/baker-support", payload, "Thank you. Our baking experts will contact you soon.");
}

export async function loginAction(_prev: FormResult | null, f: FormData): Promise<FormResult> {
  const email = str(f, "email");
  const password = String(f.get("password") ?? "");
  if (!emailOk(email) || !password) return { ok: false, message: "Enter your email and password." };
  if (!process.env.API_BASE_URL) {
    return { ok: false, message: "Sign-in is not connected yet. Set API_BASE_URL to enable it." };
  }
  return post("/auth/login", { email, password }, "Signed in.");
}

export async function registerAction(_prev: FormResult | null, f: FormData): Promise<FormResult> {
  const payload = Object.fromEntries([...f.entries()].map(([k, v]) => [k, String(v)]));
  if (!payload.name || !emailOk(String(payload.email ?? "")) || String(payload.password ?? "").length < 6) {
    return { ok: false, message: "Enter your name, a valid email and a password of at least 6 characters." };
  }
  if (!process.env.API_BASE_URL) {
    return { ok: false, message: "Registration is not connected yet. Set API_BASE_URL to enable it." };
  }
  return post("/auth/register", payload, "Account created. Please check your email.");
}
