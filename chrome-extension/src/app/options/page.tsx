"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChrome } from "@/hooks/useChrome";

export default function OptionsPage() {
  const [apiKey, setApiKey] = useState("");
  const { isAvailable, getStorage, setStorage } = useChrome();

  useEffect(() => {
    if (isAvailable) {
      getStorage(["apiKey"]).then((result: { apiKey?: string }) => {
        if (result.apiKey) setApiKey(result.apiKey);
      });
    }
  }, [isAvailable, getStorage]);

  const handleSave = () => {
    setStorage({ apiKey });
    alert("Saved!");
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Extension Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">API Key</label>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key"
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
