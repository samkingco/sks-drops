export class ResponseError extends Error {
  status?: number;
  code?: "NO_ADDRESS" | "NOT_AVAILABLE_FOR_ADDRESS" | "ALREADY_OWNED";
}

export async function fetchGetJSON(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const error: ResponseError = new Error("Something went wrong");
      const json = await response.json();
      error.message = json.message || undefined;
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

export async function fetchPostJSON(url: string, data?: {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data || {}),
    });

    if (response.status !== 200 || !response.ok) {
      const error = new ResponseError("Something went wrong");
      const json = await response.json();
      error.message = json.message || undefined;
      error.status = response.status;
      error.code = json.code || undefined;
      throw error;
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}
