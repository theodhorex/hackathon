export interface TokenPayload {
  id: string;
  registration_tx: {
    tx_hash: string;
    block_number: number;
    chain: string;
  };
  creator_id: string;
  metadata: {
    name: string;
    description: string;
  };
  media: Array<{
    media_id: string;
    url: string;
    hash?: string;
  }>;
}

export interface TokenResponse {
  status: number;
  data: unknown;
}

export class YakoaClient {
  private apiKey: string;
  private subdomain: string;
  private network: string;
  private env: string;

  constructor() {
    this.apiKey = process.env.YAKOA_API_KEY || "";
    this.subdomain = process.env.YAKOA_SUBDOMAIN || "";
    this.network = process.env.YAKOA_NETWORK || "";
    this.env = process.env.YAKOA_ENV || "sandbox";
  }

  private baseUrl(): string {
    if (this.env === "production") {
      return `https://${this.subdomain}.ip-api.yakoa.io/${this.network}`;
    }
    return `https://${this.subdomain}.ip-api-sandbox.yakoa.io/${this.network}`;
  }

  async registerToken(payload: TokenPayload): Promise<TokenResponse> {
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

  async getToken(id: string): Promise<TokenResponse> {
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
