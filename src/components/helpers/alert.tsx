import { AlertColor } from "@mui/material";
import { createContext } from "react";

export interface AlertManager {
  show(message: string, severity: AlertColor, duration: number): void;
}

export const AlertManagerContext = createContext<AlertManager>({
  show(message: string, severity: AlertColor) {},
});
