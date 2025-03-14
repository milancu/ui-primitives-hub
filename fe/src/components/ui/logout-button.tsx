import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/components/AuthProvider.tsx";

export const LogoutButton = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Odhlásit se
    </Button>
  );
};
