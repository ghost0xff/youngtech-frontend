"use client";
import CheckoutSchoolInfoDialog from "@/components/Checkout/CheckoutSchoolInfoDialog";
import { useState } from "react";

export default function QuickWrapper() {
  const [open, setOpen] = useState(true);

  return (
    <CheckoutSchoolInfoDialog open={open} onClose={() => setOpen(false)} />
  );
}
