import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
    return (
        <div className="p-6">
            <h1 className="font-semibold text-3xl mb-4">Settings</h1>
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
    )
}

export default SettingsPage;