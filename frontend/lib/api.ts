const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export function saveAuthToken(token: string, persistent = true) {
  if (persistent) {
    window.localStorage.setItem("vizstruct_token", token);
    window.sessionStorage.removeItem("vizstruct_token");
  } else {
    window.sessionStorage.setItem("vizstruct_token", token);
    window.localStorage.removeItem("vizstruct_token");
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  const token =
    window.localStorage.getItem("vizstruct_token") ||
    window.sessionStorage.getItem("vizstruct_token");

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(
    `${API_BASE_URL}/${path.replace(/^\/+/, "")}`,
    { ...options, headers }
  );

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error("The backend returned an invalid response.");
  }

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : "The request failed.";
    throw new Error(message);
  }

  return payload as T;
}
