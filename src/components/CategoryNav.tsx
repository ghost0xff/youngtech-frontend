"use client";

import { Box, Chip, Stack, Tab, Tabs, Typography } from "@mui/material";

const categories: string[] = [
  "Peripherals",
  "Components",
  "Pre-built PCs",
  "Keyboards",
  "CPUs",
  "RAM",
  "Motherboards",
];

export default function CategoryNav() {
  return (
    <Tabs
      value={1}
      onChange={(event: React.SyntheticEvent, newValue: number) => {}}
      scrollButtons="auto"
      variant="scrollable"
    >
      <Tab label="All products" />
      {categories.map((category) => {
        return <Tab key={category} label={category} />;
      })}
    </Tabs>
  );
}
