import {
  Theme,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";

// const CoolTooltip = styled(({ className, ...props }: TooltipProps) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     // backgroundColor: "#f5f5f9",
//     backgroundColor: theme.palette.background.paper,
//     // color: theme.palette.secondary.main,
//     maxWidth: 220,
//     fontSize: theme.typography.pxToRem(12),
//     border: `1px solid ${theme.palette.secondary.main}`,
//   },
// }));

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(11),
    border: "1px solid #dadde9",
  },
}));

// export default CoolTooltip;
export default HtmlTooltip;
