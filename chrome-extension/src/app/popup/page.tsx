"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const selections = [
  { id: "pace", text: "Pace" },
  { id: "tone", text: "Tone" },
  { id: "fillerWords", text: "Filler Words" },
  { id: "grammar", text: "Grammar" },
];

export default function PopupPage() {
  return (
    <>
      <div className="w-[25vw] h-[50vh] p-2">
        <Card className="h-full">
          <CardContent className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-2">
              {selections.map((selection) => {
                return (
                  <div
                    key={selection.id}
                    className="flex justify-between py-1 px-6 items-center border rounded-xl shadow-md border-gray-300"
                  >
                    {" "}
                    <p className="text-md">{selection.text}</p> <Switch />{" "}
                  </div>
                );
              })}
            </div>
            <Button>Start Recording</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
