const EGS_GRAPHQL_ENDPOINT = "https://launcher.store.epicgames.com/graphql";

async function proxyFetch(request: Request): Promise<Response> {
  const patchedRequest = new Request(EGS_GRAPHQL_ENDPOINT, {
    body: request.body,
    method: request.method,
    headers: new Headers({
      "Content-type": "application/json",
      "User-Agent": "EpicGamesLauncher/18.9.0-45233261+++Portal+Release-Live",
    }),
  });

  const response = await fetch(patchedRequest.url, patchedRequest);
  const headers = new Headers(response.headers);

  const origin = request.headers.get("Origin") ?? "";
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return new Response(response.body, {
    ...response,
    headers,
  });
}

// noinspection JSUnusedGlobalSymbols
export default { fetch: proxyFetch };
