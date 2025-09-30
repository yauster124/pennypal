"use client";

import { AppearanceSettings } from "@/features/settings/components/appearance-settings";
import { ProfileSettings, ProfileSettingsSkeleton } from "@/features/settings/components/profile-settings";
import { SettingsSidebar } from "@/features/settings/components/settings-sidebar";
import { useGetCurrentUser } from "@/features/users/api/get-current-user";
import { useState } from "react";

const SettingsPage = () => {
    const getUser = useGetCurrentUser();
    const [selected, setSelected] = useState("profile");

    return (
        <div className="flex flex-1 flex-col p-6 space-y-6">
            <div className="space-y-0.5">
                <h1 className="font-bold text-2xl">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings.</p>
            </div>
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-start">
                <SettingsSidebar
                    selected={selected}
                    onChange={setSelected}
                />
                <div className="flex-1 lg:max-w-2xl">
                    {selected === "profile" && (
                        <>
                            {getUser.data ? (
                                <ProfileSettings user={getUser.data} />
                            ) : (
                                <ProfileSettingsSkeleton />
                            )}
                        </>
                    )}
                    {selected === "appearance" && (
                        <AppearanceSettings />
                    )}
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;