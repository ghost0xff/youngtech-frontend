"use client";

import { ListItem } from "@mui/material";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { IconButton, List, Menu } from "@mui/material";
import DrawerButton from "./DrawerButton";
import HorizontalLogo from "../Logo/HorizontalLogo";

type SideDrawerProps = {
  isOpen: boolean;
  toggleDrawer(): void;
};

export default function SideDrawer({ isOpen, toggleDrawer }: SideDrawerProps) {
  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        PaperProps={{
          elevation: 0,
        }}
      >
        <List>
          <ListItem>
            <DrawerButton toggleDrawer={toggleDrawer} />
            <HorizontalLogo mode="light" />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
}
