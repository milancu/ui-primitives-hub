import { ThemeLogo } from "@/components/ui/theme-logo.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Figma } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils.ts";
import { DotPattern } from "@/components/magicui/dot-pattern.tsx";

const LoginPage = () => {
  const loginHref = `${import.meta.env.VITE_BACKEND_API_URL}/auth/figma`;

  return (
    <div className="bg-background relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
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
          <Button variant={"outline"} asChild>
            <Link to={loginHref}>
              <Figma />
              Sign in with Figma
            </Link>
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

export default LoginPage;
