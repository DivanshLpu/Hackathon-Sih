const API = {
  async request(url, options = {}) {
    const config = {
      credentials: "include",
      headers: {
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...(options.headers || {})
      },
      ...options
    };

    const response = await fetch(url, config);

    let result = null;
    try {
      result = await response.json();
    } catch {
      result = {
        success: false,
        error: {
          code: "INVALID_RESPONSE",
          message: "The server returned an invalid response."
        }
      };
    }

    if (response.status === 401) {
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    if (!response.ok || result.success === false) {
      const message = result?.error?.message || "Request failed.";
      const error = new Error(message);
      error.status = response.status;
      error.payload = result;
      throw error;
    }

    return result;
  },

  get(url) {
    return this.request(url, { method: "GET" });
  },

  post(url, body) {
    return this.request(url, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body)
    });
  },

  put(url, body) {
    return this.request(url, {
      method: "PUT",
      body: JSON.stringify(body)
    });
  },

  patch(url, body) {
    return this.request(url, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  },

  delete(url) {
    return this.request(url, { method: "DELETE" });
  }
};
