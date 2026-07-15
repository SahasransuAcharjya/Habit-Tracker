const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "";

type RequestOptions = RequestInit & {
  token?: string | null;
};

async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Request failed.");
  }

  return result;
}

export async function apiGet<T>(endpoint: string, token?: string | null): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "GET",
    token,
  });
}

export async function apiPost<T>(
  endpoint: string,
  body?: unknown,
  token?: string | null
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
    token,
  });
}

export async function apiPatch<T>(
  endpoint: string,
  body?: unknown,
  token?: string | null
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "PATCH",
    body: body ? JSON.stringify(body) : undefined,
    token,
  });
}

export async function apiDelete<T>(endpoint: string, token?: string | null): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "DELETE",
    token,
  });
}