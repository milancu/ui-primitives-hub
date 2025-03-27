import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { ThemeLogo } from "@/components/ui/theme-logo.tsx";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-background relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg">
      <Card className="bg-background relative z-10 w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-2 text-center">
          <div>
            <ThemeLogo />
          </div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            Verification successful!
          </h2>
          <p className="text-muted-foreground text-sm">
            You can now continue in Your Terminal.
          </p>
        </CardHeader>
        <CardContent>
          <Button className={"w-full"} asChild>
            <Link to={"/"}>Go To Dashboard</Link>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} UI Primitives Hub. All rights
          reserved.
        </CardFooter>
      </Card>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={200}
        recycle={false}
        tweenDuration={2000}
      />
    </div>
  );
};

export default SuccessPage;
