export {};

declare global {
  interface ChromeMessageResponse {
    [key: string]: unknown;
  }

  interface ChromeRuntime {
    sendMessage(
      message: { action: string },
      callback: (response: ChromeMessageResponse) => void
    ): void;
  }

  interface Chrome {
    runtime: ChromeRuntime;
  }

  const chrome: Chrome;
}
