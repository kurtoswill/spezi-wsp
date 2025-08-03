import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/hooks/useAuth";
import { router } from "next/client";
import { Switch } from "@/components/ui/switch";

const recording = () => {
  const data = {
    time: "00:03:19",
    description:
      "So um basically if we are to manufacture this uh...product, who exactly are our target market? They does something..",
    pace: "Just Right",
    tone: "Confident",
    fillerWords: ["um", "basically"],
    grammarTips: [""],
  };

  return (
    <div className="w-[25vw] h-[50vh] p-2">
      <Card className="h-full">
        <CardContent className="flex flex-col justify-between h-full">
          <p>Recording Time</p>
          <div>Transcription Preview</div>
          <div>Pace</div>
          <div>Tone</div>
          <div>Filler Words</div>
          <div>Grammar Tips</div>
        </CardContent>
      </Card>
    </div>
  );
};

const post_recording = () => {
  const data = {
    time: "00:03:19",
    description:
      "So um basically if we are to manufacture this uh...product, who exactly are our target market? They does something..",
    pace: "Just Right",
    tone: "Confident",
    fillerWords: ["um", "basically"],
    grammarTips: [""],
  };

  return (
    <div className="w-[25vw] h-[50vh] p-2">
      <Card className="h-full">
        <CardContent className="flex flex-col justify-between h-full">
          <p>Recording Complete!</p>
          <div>Duration</div>
          <div>Overall Rating</div>
          <div>Tone</div>
          <div>Pace</div>
          <div>Filler Words</div>
          <div>Grammar Tips</div>
        </CardContent>
      </Card>
    </div>
  );
};

export const popup = () => {
  const selections = [
    { id: "pace", text: "Pace" },
    { id: "tone", text: "Tone" },
    { id: "fillerWords", text: "Filler Words" },
    { id: "grammar", text: "Grammar" },
  ];

  return (
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
  );
};
