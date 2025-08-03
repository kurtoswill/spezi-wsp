"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChrome } from "@/hooks/useChrome";

export default function PopupPage() {
  const [message, setMessage] = useState("");
  const { isAvailable, sendMessage } = useChrome();

  const handleSend = () => {
    sendMessage({ type: "popup", text: message });
    setMessage("");
  };

  if (!isAvailable) {
    return (
      <div className="w-80 p-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-gray-500">Development mode</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-80 p-4">
      <Card>
        <CardHeader>
          <CardTitle>My Extension</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleSend} className="w-full">
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
