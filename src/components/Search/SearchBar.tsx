"use client";

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Theme,
  styled,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import StyledInput from "./StyledInput";

export default function SearchBar() {
  const hint = React.useRef("");
  const [inputValue, setInputValue] = useState("");
  const theme: Theme = useTheme();

  return (
    <>
      <Autocomplete
        sx={{ flexGrow: 1, maxWidth: 700 }}
        id="search-bar-mamahuevo"
        size="small"
        // selectOnFocus
        // clearOnBlur
        handleHomeEndKeys
        freeSolo
        value={inputValue}
        options={products.map((option) => option)}
        filterOptions={(options, state) => {
          const displayOptions = options.filter((option) =>
            option.name
              .toLowerCase()
              .trim()
              .includes(state.inputValue.toLowerCase().trim())
          );

          return displayOptions;
        }}
        getOptionLabel={(option) => {
          if (isProduct(option)) {
            return option.name;
          }
          return option;
        }}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <>
            <StyledInput
              size="small"
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              // autoFocus
              placeholder="Buscar"
              onChange={(e) => {
                const newValue = e.target.value;
                setInputValue(newValue);
                const matchingOption = products.find((option) =>
                  // better UX if contains???
                  // option.name.includes(newValue)
                  option.name.startsWith(newValue)
                );

                if (newValue && matchingOption) {
                  hint.current = matchingOption.name;
                } else {
                  hint.current = "";
                }
              }}
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="search-button"
                    edge="end"
                    sx={{
                      backgroundColor: theme.palette.background.default,
                      borderRadius: "0px 40px 40px 0",
                      border: `1px solid ${
                        theme.palette.mode === "light"
                          ? //   "#eaecef" :
                            "#d3d3d3"
                          : "#30363d"
                      }`,
                      borderLeft: "none",
                      padding: "8px",
                      px: "20px",
                    }}
                  >
                    <SearchSharpIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </>
        )}
        renderOption={(props, option, { selected }) => {
          const matches = match(option.name, inputValue, {
            insideWords: true,
          });
          const parts = parse(option.name, matches);

          return (
            <li {...props} key={option.name}>
              {/* <Box display={"flex"} flexDirection={"row"}>
                {option.name}
              </Box> */}
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
        PaperComponent={CustomPaper}
      />
    </>
  );
}

const CustomPaper = (props: any) => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "12px",
      }}
      {...props}
    />
  );
};

function isProduct(toBeDetermined: any): toBeDetermined is Product {
  return toBeDetermined.name;
}

type Product = { name: string; description: string };
const products: Product[] = [
  {
    name: "Some Keyboard",
    description: "yeah, buy me!",
  },
  {
    name: "samuel",
    description: "yeah, buy me!",
  },
  {
    name: "kattia",
    description: "yeah, buy me!",
  },
  {
    name: "kattica",
    description: "yeah, buy me!",
  },
  {
    name: "looool",
    description: "yeah, buy me!",
  },
  {
    name: "looooluu",
    description: "yeah, buy me!",
  },
  {
    name: "samuelito",
    description: ":c",
  },
];
