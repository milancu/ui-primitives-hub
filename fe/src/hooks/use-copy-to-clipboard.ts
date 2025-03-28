import { useState } from "react";
import { toast } from "sonner";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error(`Failed to copy: ${error}`);
      setCopied(false);
    }
  };

  return { copied, copy };
}
