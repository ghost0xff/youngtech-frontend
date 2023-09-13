import { Dialog, DialogTitle } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export default function LoginDialog({ open, handleClose }: Props) {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Accede a YoungTech</DialogTitle>
      </Dialog>
    </>
  );
}
