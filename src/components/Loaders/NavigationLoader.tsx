import { Theme, useTheme } from "@mui/material";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
export default function NavigationLoader() {
  const theme: Theme = useTheme();
  return (
    <ProgressBar
      height="4px"
      color="#1F6EEA"
      options={{ showSpinner: false }}
      shallowRouting
      style={`
        #nprogress {
          pointer-events: none;
        }
        
        #nprogress .bar {
          background: ${theme.palette.secondary.main};
          position: fixed;
          z-index: 1900;
          top: 0;
          left: 0;
        
          width: 100%;
          height: 4px;
        }
        
        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px  ${theme.palette.secondary.main}, 0 0 5px ${theme.palette.secondary.main};
          opacity: 1.0;
          
          -webkit-transform: rotate(3deg) translate(0px, -4px);
              -ms-transform: rotate(3deg) translate(0px, -4px);
                  transform: rotate(3deg) translate(0px, -4px);
        }
        
        /* Remove these to get rid of the spinner */
        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }
        
        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;
        
          border: solid 2px transparent;
          border-top-color: red;
          border-left-color: red;
          border-radius: 50%;
        
          -webkit-animation: nprogress-spinner 400ms linear infinite;
                  animation: nprogress-spinner 400ms linear infinite;
        }
        
        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }
        
        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }
        
        @-webkit-keyframes nprogress-spinner {
          0%   { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
        @keyframes nprogress-spinner {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
      `}
    />
  );
}
