import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { auth } from "@/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { DotPattern } from "@/components/magicui/dot-pattern.tsx";
import { cn } from "@/lib/utils.ts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { ThemeLogo } from "@/components/ui/theme-logo.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      if (token.trim() === "") {
        console.error("Empty token received");
        navigate({ to: "/login", params: { error: "empty_token" } });
        return; // Prevent further execution
      }
      signInWithCustomToken(auth, token)
        .then(() => navigate({ to: "/" }))
        .catch((error) => {
          console.error("Authentication error:", error);
          const errorMessage =
            error.code === "auth/invalid-custom-token"
              ? "Invalid token"
              : "Authentication failed";
          navigate({ to: "/login", params: { error: errorMessage } });
        });
    } else {
      navigate({ to: "/login" });
    }
  }, [navigate]);

  return (
    <div className="bg-background relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />
      <div
        className={"inset bg-foreground absolute z-20 h-full w-full opacity-20"}
      />
      <Card className="bg-background relative z-10 w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-2 text-center">
          <div>
            <ThemeLogo />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome to UI Primitives Hub!
          </h2>
          <p className="text-sm text-gray-600">
            Please sign in with your Figma account to continue
          </p>
        </CardHeader>
        <CardContent className={"flex flex-col items-center space-y-2"}>
          <Button variant={"outline"} disabled>
            <Loader2 className="h-5 w-5 animate-spin" /> Signing in...
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} UI Primitives Hub. All rights
          reserved.
        </CardFooter>
      </Card>
    </div>
  );
};
