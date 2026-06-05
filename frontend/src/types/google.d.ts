export {};

declare global {
  interface GoogleIdConfiguration {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
    context?: "signin" | "signup" | "use";
  }

  interface GoogleCredentialResponse {
    credential: string;
    select_by: string;
  }

  interface GoogleButtonConfig {
    theme?: "outline" | "filled_blue" | "filled_black";
    size?: "large" | "medium" | "small";
    text?: "signin_with" | "signup_with" | "continue_with" | "signin";
    shape?: "rectangular" | "pill" | "circle" | "square";
    width?: string | number;
    logo_alignment?: "left" | "center";
  }

  interface GoogleAccountsId {
    initialize: (config: GoogleIdConfiguration) => void;
    renderButton: (
      parent: HTMLElement,
      options: GoogleButtonConfig
    ) => void;
  }

  interface GoogleAccounts {
    id: GoogleAccountsId;
  }

  interface Window {
    google: {
      accounts: GoogleAccounts;
    };
  }
}
