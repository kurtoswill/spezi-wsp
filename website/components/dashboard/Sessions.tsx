import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Share2, Pencil, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import _ from "lodash";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const mockSessions = [
    {
        id: 0,
        name: "Session 5",
        date: "Tuesday, July 29, 2025",
        time: "7:23 PM",
        duration: "23m",
        rating: "65",
    },
    {
        id: 1,
        name: "Session 5",
        date: "Tuesday, July 29, 2025",
        time: "7:23 PM",
        duration: "23m",
        rating: "65",
    },
    {
        id: 2,
        name: "Session 5",
        date: "Monday, July 28, 2025",
        time: "7:23 PM",
        duration: "23m",
        rating: "65",
    },
    {
        id: 3,
        name: "Session 5",
        date: "Monday, July 28, 2025",
        time: "7:23 PM",
        duration: "23m",
        rating: "65",
    },
];

export const Sessions = () => {
    const groupedSessions = _.groupBy(mockSessions, "date");

    const sortedDates = Object.keys(groupedSessions).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    return (
        <div className="w-[80vw] p-4 flex flex-col gap-4 justify-between">
            <div className="text-lg font-bold">My Sessions</div>
            <div className="flex justify-evenly w-full gap-4 mb-4">
                <Input type="text" placeholder="Search" />
                <Select>
                    <Filter />
                    Filter
                </Select>
                <Select>Sort: Newest First</Select>
            </div>
            <div className="flex flex-col w-full gap-6">
                {sortedDates.map((date) => {
                    const sessions = groupedSessions[date];

                    return (
                        <div key={date} className="flex flex-col gap-3">
                            {/* Date */}
                            <h3 className="text-md font-semibold text-gray-700 border-b bg-gray-100 p-3 border-gray-200 pb-2">
                                {date}
                            </h3>

                            {/* Sessions for the given date */}
                            <div className="flex flex-col gap-2">
                                {sessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="flex w-full justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex gap-4 items-center">
                                            <Checkbox className="border-gray-600" />
                                            <div className="flex gap-4 items-center text-sm">
                                                <span className="font-medium">{session.duration}</span>
                                                <span className="text-gray-600">{session.time}</span>
                                                <span className="font-medium">{session.name}</span>
                                            </div>
                                            <div className="flex flex-col gap-1 ml-4">
                                                <p className="text-sm text-gray-600">
                                                    Overall Rating: {session.rating}%
                                                </p>
                                                <Progress
                                                    value={parseInt(session.rating)}
                                                    className="w-20 h-2"
                                                />
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-3 items-center">
                                            <Share2 className="w-4 h-4 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors" />
                                            <Pencil className="w-4 h-4 text-gray-500 hover:text-green-500 cursor-pointer transition-colors" />
                                            <Trash className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* If no dates displayed */}
            {sortedDates.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <p className="text-lg">No sessions found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
};