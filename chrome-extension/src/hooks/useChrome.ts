"use client";
import { useState, useEffect } from "react";
import { isChromeExtension } from "@/types/chrome";

export function useChrome() {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    setIsAvailable(isChromeExtension());
  }, []);

  const sendMessage = async (message: unknown) => {
    if (!isAvailable || !chrome.tabs) return;

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, message);
    }
  };

  const getStorage = async (keys: string[]) => {
    if (!isAvailable || !chrome.storage) return {};
    return chrome.storage.sync.get(keys);
  };

  const setStorage = async (data: Record<string, unknown>) => {
    if (!isAvailable || !chrome.storage) return;
    chrome.storage.sync.set(data);
  };

  return { isAvailable, sendMessage, getStorage, setStorage };
}
