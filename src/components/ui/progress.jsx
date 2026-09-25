import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function Progress({ className, value = 0, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-zinc-800",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-500 ease-out"
        style={{ transform: `translateX(-${100 - Math.min(Math.max(value || 0, 0), 100)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
