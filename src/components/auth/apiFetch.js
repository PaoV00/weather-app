import keycloak from "./keycloak";

export async function apiFetch(url, options = {}) {
  if (!keycloak.authenticated) {
    throw new Error('User not authenticated');
  }

  // Refresh token if needed
  await keycloak.updateToken(30);

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${keycloak.token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  return response.json();
}
