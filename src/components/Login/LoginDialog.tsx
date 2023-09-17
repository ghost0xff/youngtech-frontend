import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import { useState } from "react";
import GoogleIcon from "./GoogleIcon";
import HorizontalLogo from "../Logo/HorizontalLogo";
import { signIn } from "next-auth/react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoginDialog({ open, onClose }: Props) {
  // const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("xs");

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        // maxWidth={maxWidth}
        maxWidth={"xs"}
        // transitionDuration={50}
        PaperProps={{
          elevation: 0,
          sx: {
            // borderRadius: "12px",
            // minWidth: "305px",
            // maxWidth: "300px",
            // maxHeight: "749px",
          },
        }}
      >
        <DialogTitle textAlign="center" color="primary.main">
          <HorizontalLogo height={40} />
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>text</DialogContentText> */}
          <Stack>
            <Button
              variant="outlined"
              // size="large"
              sx={{
                borderColor: "#c1c1c1",
                "&:hover": {
                  borderColor: "#c1c1c1",
                },
              }}
              startIcon={<GoogleIcon />}
              // disableFocusRipple
              // disableRipple
              disableElevation
              onClick={() => signIn("google")}
            >
              Continuar con Google
            </Button>
          </Stack>
        </DialogContent>
        {/* <Divider /> */}
        <DialogActions>
          {/* <Button onClick={() => console.log("logging in!")}>
            Click to login
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
