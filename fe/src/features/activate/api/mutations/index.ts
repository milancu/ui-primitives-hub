import { authFetch } from "@/lib/authFetch.ts";

export const verifyCode = async ({ userCode }: { userCode: string }) => {
  const response = await authFetch(`/auth/device/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userCode: userCode,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
