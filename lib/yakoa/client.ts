export class YakoaClient {
  apiKey: string;
  subdomain: string;
  network: string;
  env: string;

  constructor() {
    this.apiKey = process.env.YAKOA_API_KEY!;
    this.subdomain = process.env.YAKOA_SUBDOMAIN!;
    this.network = process.env.YAKOA_NETWORK!;
    this.env = process.env.YAKOA_ENV || "sandbox";
  }

  baseUrl() {
    if (this.env === "production") {
      return `https://${this.subdomain}.ip-api.yakoa.io/${this.network}`;
    }
    return `https://${this.subdomain}.ip-api-sandbox.yakoa.io/${this.network}`;
  }

  async registerToken(payload: any) {
    const endpoint = `${this.baseUrl()}/token`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    return {
      status: res.status,
      data: await res.json(),
    };
  }

  async getToken(id: string) {
    const endpoint = `${this.baseUrl()}/token/${encodeURIComponent(id)}`;

    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
      },
    });

    return {
      status: res.status,
      data: await res.json(),
    };
  }
}
