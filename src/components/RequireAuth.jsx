import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2Icon } from "lucide-react";

export default function RequireAuth() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[100dvh] w-full bg-[#09090b] flex items-center justify-center">
        <Loader2Icon className="size-5 animate-spin text-zinc-700" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return <Outlet />;
}
