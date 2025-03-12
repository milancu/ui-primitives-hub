import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { auth } from "@/firebase";
import { signInWithCustomToken } from "firebase/auth";

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
        .then(() => navigate({ to: "/accordion" }))
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

  return <div>Authenticating...</div>; // Improved loading message
};
