"use client";

import {
  MenuItem,
  IconButton,
  ListItemText,
  Typography,
  MenuList,
  Divider,
} from "@mui/material";
import { ReactNode, useContext } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { AvatarMenuReturnerContext } from "./AvatarMenu";
import UnanimatedMenuItem from "../helpers/UnanimatedMenuItem";
import { MenuUtils as MU } from "../utils";

type AvPrefProps = {
  children?: ReactNode;
  title: string;
};
export default function AvatarPreferenceMenu({ children, title }: AvPrefProps) {
  const menuReturner: MU.MenuReturner = useContext(AvatarMenuReturnerContext);
  return (
    <MenuList>
      <UnanimatedMenuItem>
        <IconButton onClick={menuReturner.return}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <ListItemText>
          <Typography variant="subtitle1" pl={0.5}>
            {title}
          </Typography>
        </ListItemText>
      </UnanimatedMenuItem>
      <Divider />
      {children}
    </MenuList>
  );
}
