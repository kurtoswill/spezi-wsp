import { FC } from "react";
import { Camera, Bell, Settings, CreditCard, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";

// Use same type for tab ID
type TabID = "sessions" | "notifications" | "settings" | "billing";

interface SidebarProps {
    activeTab: TabID;
    setActiveTab: (tab: TabID) => void;
}

const SidebarItems: { id: TabID; name: string; icon: FC }[] = [
    { id: "sessions", name: "My Sessions", icon: Camera },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "settings", name: "Account Settings", icon: Settings },
    { id: "billing", name: "Billing", icon: CreditCard },
];

export const Sidebar: FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
    const uses = 3;
    const usageLimit = 5;

    return (
        <div className="flex flex-col w-[20vw] h-[80vh] justify-between content-between border-r-2 border-gray-300">
            <div className="flex flex-col gap-4 p-4">
                {SidebarItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex p-2 ${
                            activeTab === item.id ? "bg-[#93cceb] rounded-xl" : ""
                        } gap-2 cursor-pointer`}
                    >
                        <item.icon />
                        {item.name}
                    </div>
                ))}
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-[85%] border-2 border-gray-300 flex rounded-lg flex-col gap-2 p-3">
                    <span>Plan Usage - Free</span>
                    <p>
                        {uses} out of {usageLimit}
                    </p>
                    <Progress value={(uses / usageLimit) * 100} />
                    <Button>Upgrade Plan</Button>
                </div>
                <div className="flex items-center justify-center">
                    <Image
                        src="/images/placeholder2.jpg"
                        width={42}
                        height={42}
                        className="w-[42px] h-[42px] object-cover rounded-full shadow-xl"
                        alt="Profile Picture"
                    />
                    <div className="flex flex-col">
                        <p>Kazel Tuazon</p>
                        <p>arwentuazon@gm...</p>
                    </div>
                    <ChevronRight />
                </div>
            </div>
        </div>
    );
};
