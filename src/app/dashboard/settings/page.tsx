import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
    return (
        <div className="p-6">
            <h1 className="font-semibold text-3xl mb-4">Settings</h1>
            <div className="flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Account
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <h2 className="font-semibold mb-2">Change your password</h2>
                                <Label htmlFor="current-password">Current password</Label>
                                <Input id="current-password" />
                                <Label htmlFor="new-password">New password</Label>
                                <Input id="current-password" />
                                <Label htmlFor="new-password-confirm">Confirm new password</Label>
                                <Input id="current-password" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Appearance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="dark-mode">Theme</Label>
                            <DarkModeToggle id="dark-mode" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SettingsPage;