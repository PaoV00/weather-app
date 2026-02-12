import keycloak from "./keycloak";

export async function apiFetch(url, options = {}) {
  // Ensure token is fresh
  if (keycloak.authenticated) {
    await keycloak.updateToken(30);
  }

  const response = await fetch(`http://localhost:8181${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(keycloak.authenticated && {
        "Authorization": `Bearer ${keycloak.token}`,
      }),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return null;
}
