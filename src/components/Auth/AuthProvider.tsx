"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, createContext, useState } from "react";
import LoginDialog from "../Login/LoginDialog";

export type AuthnNeederr = {
  need: () => void;
};

export const AuthNeederContext = createContext<AuthnNeederr>({
  need: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const needer: AuthnNeederr = {
    need: () => {
      handleOpen();
    },
  };

  return (
    <>
      <AuthNeederContext.Provider value={needer}>
        <SessionProvider>{children}</SessionProvider>
      </AuthNeederContext.Provider>
      <LoginDialog open={openDialog} onClose={() => handleClose()} />
    </>
  );
}

