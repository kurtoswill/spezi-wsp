"use client";

import { useState, FC } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Sessions } from "@/components/dashboard/Sessions";
import { Notifications } from "@/components/dashboard/Notifications";
import { Settings } from "@/components/dashboard/Settings";
import { Billing } from "@/components/dashboard/Billing";

// Define allowed tab IDs
type TabID = "sessions" | "notifications" | "settings" | "billing";

// Define tab structure
interface Tab {
    id: TabID;
    component: FC;
}

// Tab list
const Tabs: Tab[] = [
    { id: "sessions", component: Sessions },
    { id: "notifications", component: Notifications },
    { id: "settings", component: Settings },
    { id: "billing", component: Billing },
];

const Page: FC = () => {
    const [activeTab, setActiveTab] = useState<TabID>("sessions");

    const currentTab = Tabs.find((tab) => tab.id === activeTab);
    const Component = currentTab?.component;

    return (
        <div className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-24 2xl:-mx-32 -mt-11 mb-5 flex">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div>{Component ? <Component /> : <div>Tab Not Found</div>}</div>
        </div>
    );
};

export default Page;
