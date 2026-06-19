/** Server-only helper to post to the Google Apps Script Web App. */

export async function postToSheet(
  payload: Record<string, unknown>,
  urlEnv: string = "APPS_SCRIPT_URL"
): Promise<{ ok: boolean; [key: string]: unknown }> {
  const url = process.env[urlEnv];
  const token = process.env.APPS_SCRIPT_TOKEN;

  if (!url || !token || url.includes("XXXXXXXX")) {
    throw new Error("APPS_SCRIPT_URL / APPS_SCRIPT_TOKEN not configured");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, token }),
    redirect: "follow",
  });

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { ok: res.ok, raw: text };
  }
}
