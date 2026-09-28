import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

function Progress({ value = 0, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className="relative h-0.5 w-full overflow-hidden rounded-full bg-zinc-800/50"
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 bg-zinc-200 transition-all duration-500 ease-out"
        style={{
          transform: `translateX(-${100 - Math.min(Math.max(value || 0, 0), 100)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
