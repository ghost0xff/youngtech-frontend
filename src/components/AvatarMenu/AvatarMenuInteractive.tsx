"use client";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

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
