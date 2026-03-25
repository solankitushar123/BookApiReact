export async function get<TResult>(url: string) {
  return await request<TResult>('GET', url);
}

export async function post<TResult>(url: string, body: unknown) {
  return await request<TResult>('POST', url, body);
}

export async function put<TResult>(url: string, body: unknown) {
  return await request<TResult>('PUT', url, body);
}

export async function patch<TResult>(url: string, body: unknown) {
  return await request<TResult>('PATCH', url, body);
}

export async function del<TResult>(url: string) {
  return await request<TResult>('DELETE', url);
}

async function request<TResult>(method: string, url: string, body?: unknown) {
  const response = await fetch('https://localhost:7036/api/' + url, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Origin: window.location.host,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  if (!response.ok) {

    if (response.status === 404) {
      console.warn("Record not found");
      return {} as TResult;
    }

    throw new Error("API error " + response.status);
  }

  // handle empty response (DELETE)
  if (response.status === 204) {
    return {} as TResult;
  }
  const json = await response.json();

  return json as TResult;
}