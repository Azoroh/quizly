import { Toaster as Sonner } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  AlertCircleIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }) => {
  // const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-400" />,
        info: <InfoIcon className="size-4 text-blue-400" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-400" />,
        error: (
          <AlertCircleIcon className="size-5 text-red-400 shrink-0 mr-3" />
        ),
        loading: <Loader2Icon className="size-4 animate-spin text-zinc-400" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-zinc-900 group-[.toaster]:text-zinc-100 group-[.toaster]:border-zinc-800 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl font-sans group-[.toaster]:pr-12 group-[.toaster]:justify-start text-left [&>svg]:!mr-3 [&>svg]:!inline-block !w-[calc(100vw-4rem)] !ml-4 sm:!ml-0 sm:!w-[356px]",
          title: "text-left font-semibold",
          description: "group-[.toaster]:text-zinc-400 text-xs text-left",
          closeButton:
            "group-[.toaster]:bg-zinc-800 group-[.toaster]:border-zinc-700 group-[.toaster]:text-zinc-300 hover:group-[.toaster]:bg-zinc-700 !left-auto !right-4 !top-1/2 !-translate-y-1/2 !absolute !flex !items-center !justify-center !w-6 !h-6 !p-0 [&>svg]:w-3.5 [&>svg]:h-3.5",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
