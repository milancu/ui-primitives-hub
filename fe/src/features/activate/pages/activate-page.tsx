import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { ThemeLogo } from "@/components/ui/theme-logo.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useVerifyCode } from "@/features/activate/hooks/mutations/useVerifyCode.ts";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils.ts";
import { GridPattern } from "@/components/magicui/grid-pattern.tsx";

const ActivatePage = () => {
  const { mutateAsync, isPending } = useVerifyCode();
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate({ from: "/activate" });

  const handleSubmit = () => {
    mutateAsync({
      userCode: value,
    })
      .then(() => {
        navigate({ to: "/success" });
      })
      .catch((error) => {
        toast.error(error.message);
        setValue("");
      });
  };

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
            Please enter the verification code from your CLI to continue
          </p>
        </CardHeader>
        <CardContent className={"flex items-center justify-center space-x-4"}>
          <InputOTP maxLength={6} onChange={setValue} value={value}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={handleSubmit} disabled={isPending}>
            Verify Code
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

export default ActivatePage;
