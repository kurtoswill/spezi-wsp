import { Input } from "@/components/ui/input";
import { Search, Filter, Share2, Pencil, Trash } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const mockNotifications = [
    {
        id: 0,
        topic: "Spezi Discount",
        preview: "Spezi is offering a discount of...",
        date: { dayName: "Tuesday", day: "28", month: "July", year: "2025" },
        read: true,
        time: "7:23 PM",
    },
    {
        id: 1,
        topic: "Session is ready for review",
        preview: "Spezi is suggesting that you might...",
        date: { dayName: "Tuesday", day: "28", month: "July", year: "2025" },
        read: false,
        time: "7:23 PM",
    },
    {
        id: 2,
        topic: "Spezi Discount",
        preview: "Spezi is offering a discount of...",
        date: { dayName: "Tuesday", day: "28", month: "July", year: "2025" },
        read: false,
        time: "7:23 PM",
    },
];

export const Notifications = () => {
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
                {mockNotifications.map((notif) => {
                    return (
                        <div className="flex justify-between">
                            <div className="grid grid-cols-9 w-[70%]">
                                <Checkbox className="border-gray-600 col-span-1" />
                                <span className="font-medium col-span-4">{notif.topic}</span>
                                <span className="font-medium col-span-4">{notif.preview}</span>
                            </div>
                            <span className="font-medium">
                {notif.date.month} {notif.date.day}
              </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};