export interface ExtensionSettings {
  enabled: boolean;
  apiKey: string;
}

export interface TabMessage {
  type: string;
  payload: unknown;
}

export const isChromeExtension = (): boolean => {
  return typeof chrome !== "undefined" && !!chrome.runtime?.id;
};
