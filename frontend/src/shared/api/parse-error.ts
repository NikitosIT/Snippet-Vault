export async function parseError(response: Response): Promise<string> {
  const data: unknown = await response.json().catch(() => null);

  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message;
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    Array.isArray(data.message)
  ) {
    return data.message.filter((item): item is string => typeof item === "string").join(" ");
  }

  return "Request failed";
}
