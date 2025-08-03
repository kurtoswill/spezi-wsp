import { Pencil } from "lucide-react";

export const Settings = () => {
    return (
        <div className="w-[80vw] p-4 flex flex-col gap-4 justify-between">
            <div className="text-lg font-bold">Account Settings</div>
            <div>
                <div className="w-full">
                    {/* TODO: COMPLETE AND USE DYNAMIC MARKUP */}
                    <h3 className="text-md font-semibold text-gray-700 border-b bg-gray-100 p-3 border-gray-200 pb-2">
                        Personalization
                    </h3>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <p>Change Display Name</p>
                            <p>Kazel Tuazon</p>
                        </div>
                        <div className="flex">
                            <Pencil /> Edit
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <p>Nationality & Language/Dialect</p>
                            <p>Filipino - Ilocano</p>
                        </div>
                        <div className="flex">
                            <Pencil /> Edit
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="text-md font-semibold text-gray-700 border-b bg-gray-100 p-3 border-gray-200 pb-2">
                Integrations
            </h3>
            <h3 className="text-md font-semibold text-gray-700 border-b bg-gray-100 p-3 border-gray-200 pb-2">
                Permissions
            </h3>
        </div>
    );
};