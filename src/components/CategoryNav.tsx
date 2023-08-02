"use client";

import { Box, Chip, Stack, Tab, Tabs, Typography } from "@mui/material";

const categories: string[] = [
  "All Products",
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
      selectionFollowsFocus
      onChange={(event: React.SyntheticEvent, newValue: number) => {}}
      // scrollButtons={false}
      scrollButtons="auto"
      variant="scrollable"
      TabIndicatorProps={{
        style: {
          display: "none",
        },
      }}
    >
      {categories.map((category) => {
        return (
          <Tab
            key={category}
            disableRipple
            label={<Chip label={category} size="small" />}
          />
        );
      })}
    </Tabs>
  );
}
