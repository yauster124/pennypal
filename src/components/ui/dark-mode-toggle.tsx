"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select"

export function DarkModeToggle({
  id = ""
}: {
  id?: string
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a skeleton/spinner
  }

  return (
    <Select value={theme} onValueChange={(value) => setTheme(value)}>
      <SelectTrigger id={id} className="w-[180px]">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
