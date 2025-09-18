"use client";

import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

export const CurrencyInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  (props, ref) => {
    return (
      <div className="relative w-full">
        {/* £ prefix */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          £
        </span>

        <Input
          {...props}
          ref={ref}
          className="pl-6" // make room for the £
          type="number" // keep value numeric
          step="0.01"
        />
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
