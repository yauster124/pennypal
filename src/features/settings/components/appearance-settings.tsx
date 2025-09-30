import { Card, CardContent } from "@/components/ui/card"
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle"
import { Label } from "@/components/ui/label"

export const AppearanceSettings = () => {
    return (
        <Card>
            <CardContent>
                <div className="grid gap-2 space-y-1">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>
                    <DarkModeToggle />
                </div>
            </CardContent>
        </Card>
    )
}