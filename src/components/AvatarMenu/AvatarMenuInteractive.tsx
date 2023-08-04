"use client";
import {
  Menu,
  MenuList,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AvatarMenuLink from "./AvatarMenuLink";

// export type AvMenuInteracProps = {
//   label: string;
//   icon: React.ReactNode;
//   showArrow?: boolean;
//   menu?: React.ReactNode;
//   open: boolean;
//   anchorEl: null | HTMLElement;
//   onClose(): void;
//   onClick(): void;
// };

// export default function AvatarMenuInteractive({
//   label,
//   icon,
//   showArrow = true,
//   open,
//   anchorEl,
//   onClose,
//   onClick,
// }: AvMenuInteracProps) {
//   return (
//     <>
//       <MenuItem onClick={onClick}>
//         <ListItemIcon>{icon}</ListItemIcon>
//         <ListItemText>
//           <Typography variant="subtitle1">{label}</Typography>
//         </ListItemText>
//         {showArrow && (
//           <Typography variant="body2" fontSize={1} marginLeft={3}>
//             <NavigateNextOutlinedIcon />
//           </Typography>
//         )}
//       </MenuItem>
//       <Menu
//         open={open}
//         anchorEl={anchorEl}
//         onClose={onClose}
//         elevation={0}
//         transformOrigin={{ horizontal: "left", vertical: "top" }}
//         anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
//       >
//         <MenuList>
//           <MenuItem>
//             <ListItemIcon>
//               <ArrowBackOutlinedIcon />
//             </ListItemIcon>
//             <ListItemText>
//               <Typography variant="subtitle1">Appearance</Typography>
//             </ListItemText>
//           </MenuItem>
//           <Divider />
//           <AvatarMenuLink href="/" label="Use device theme" />
//           <AvatarMenuLink href="/" label="Dark theme" />
//           <AvatarMenuLink href="/" label="Light theme" />
//         </MenuList>
//       </Menu>
//     </>
//   );
// }

export type AvMenuInteracProps = {
  label: string;
  icon: React.ReactNode;
  showArrow?: boolean;
  menu?: React.ReactNode;
  onClick?(): void;
};

export default function AvatarMenuInteractive({
  label,
  icon,
  showArrow = false,
  onClick,
}: AvMenuInteracProps) {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>
        <Typography variant="subtitle1">{label}</Typography>
      </ListItemText>
      {showArrow && (
        <Typography variant="body2" fontSize={1} marginLeft={3}>
          <NavigateNextOutlinedIcon />
        </Typography>
      )}
    </MenuItem>
  );
}
