"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import DoDisturbAltSharpIcon from "@mui/icons-material/DoDisturbAltSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

type Props = {
  onClose: () => void;
  open: boolean;
};

export default function CheckoutDeliveryApologyDialog({
  onClose: handleClose,
  open,
}: Props) {
  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"xs"}>
      <DialogTitle>Lo sentimos...</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          // color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseSharpIcon />
      </IconButton>
      <DialogContent dividers>
        <DialogContentText component={"div"}>
          YoungTech solo ofrece las fechas indicadas por el momento, estamos
          trabajando para que puedas personalizar las fechas de entrega de
          manera que te quede bien a ti a nosotros. Puedes contactarnos a
          youngtechcr@gmail.com.
          <Typography display={"block"} component="i">
            - Los desarrolladores de YoungTech
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          endIcon={<DoDisturbAltSharpIcon />}
          disableElevation
          variant="outlined"
          fullWidth
          color="error"
          onClick={() => handleClose()}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
