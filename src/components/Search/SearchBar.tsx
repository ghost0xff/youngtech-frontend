"use client";

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Stack,
  Theme,
  Typography,
  debounce,
  styled,
  useTheme,
} from "@mui/material";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import StyledInput from "./StyledInput";
import TextWithEllipsis from "../helpers/TextWithEllipsis";
import fromApi from "@/lib/api/utils";
import { Product, searchProdsByTerm } from "@/lib/api/product";

function isProduct(toBeDetermined: any): toBeDetermined is Product {
  return toBeDetermined.name;
}

export default function SearchBar() {
  const hint = React.useRef("");
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<Product | null>(null);
  const [options, setOptions] = useState<Product[]>([]);
  const theme: Theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;
    // if (!loading) {
    // return undefined;
    // }
    (async () => {
      // await sleep(300); // For demo purposes.

      if (active) {
        const ps = await searchProdsByTerm(inputValue);
        setOptions(ps);
      }
    })();

    return () => {
      active = false;
    };
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        sx={{ flexGrow: 1, maxWidth: 700 }}
        // loading={loading}
        id="search-bar-mamahuevo"
        size="small"
        // selectOnFocus
        clearOnBlur={false}
        handleHomeEndKeys
        // autoSelect
        freeSolo
        value={inputValue}
        options={options}
        filterOptions={(options, state) => {
          const displayOptions = options.filter(
            (option) =>
              option.name
                .toLowerCase()
                .trim()
                .includes(state.inputValue.toLowerCase().trim())
            // option.description
            //   .toLowerCase()
            //   .trim()
            //   .includes(state.inputValue.toLowerCase().trim())
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
                const matchingOption = options.find(
                  (option) =>
                    // better UX if contains???
                    // option.name.includes(newValue)
                    option.name.startsWith(newValue)
                  // ||
                  // option.description.startsWith(newValue)
                );

                if (newValue && matchingOption) {
                  hint.current = matchingOption.name;
                } else {
                  hint.current = "";
                }
                // console.log(newValue);
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
                        theme.palette.mode === "light" ? "#d3d3d3" : "#30363d"
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
            findAllOccurrences: true,
          });
          const parts = parse(option.name, matches);

          return (
            <li {...props} key={option.id}>
              <Stack direction="row" alignItems="center">
                <Avatar
                  sx={{ mr: 2 }}
                  alt={option.name}
                  src={fromApi(`/products/${option.id}/images?main=true`)}
                  variant="square"
                />
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index + part.text}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </Stack>
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

