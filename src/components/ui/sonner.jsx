import { Toaster as Sonner } from "sonner";
import {
  CheckIcon,
  InfoIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <CheckIcon className="size-4 text-zinc-300" />,
        info: <InfoIcon className="size-4 text-zinc-400" />,
        warning: <AlertTriangleIcon className="size-4 text-zinc-400" />,
        error: <AlertCircleIcon className="size-4 text-zinc-400 shrink-0" />,
        loading: <Loader2Icon className="size-4 animate-spin text-zinc-400" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#09090b] group-[.toaster]:text-zinc-100 group-[.toaster]:border-zinc-900 group-[.toaster]:shadow-sm group-[.toaster]:rounded-xl font-body group-[.toaster]:px-4 group-[.toaster]:py-3 group-[.toaster]:justify-start text-left [&>svg]:!mr-3 [&>svg]:!inline-block !w-[calc(100vw-2rem)] !ml-2 sm:!ml-0 sm:!w-[340px]",
          title: "text-left font-medium text-xs text-zinc-200",
          description:
            "group-[.toaster]:text-zinc-500 text-[11px] text-left mt-0.5",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
