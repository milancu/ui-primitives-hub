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
import { GridPattern } from "@/components/magicui/grid-pattern.tsx";

const LoginPage = () => {
  const loginHref = `${import.meta.env.VITE_BACKEND_API_URL}/auth/figma`;

  return (
    <div className="bg-background relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
      <Card className="bg-background relative z-10 w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-2 text-center">
          <div>
            <ThemeLogo />
          </div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            Welcome to UI Primitives Hub!
          </h2>
          <p className="text-muted-foreground text-sm">
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
