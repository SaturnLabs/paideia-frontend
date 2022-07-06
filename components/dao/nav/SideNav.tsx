import { Box } from "@mui/material";
import * as React from "react";
import Contents from "./Contents";
import DaoBio from "./DaoBio";
import Footer from "./Footer";

import LightFooter from "../../../public/dao/light-footer.png";
import DarkFooter from "../../../public/dao/dark-footer.png";
import { ThemeContext, IThemeContext } from "@lib/ThemeContext";
import { DarkTheme } from "@theme/theme";
import { deviceStruct } from "@components/utilities/Style";

const Nav: React.FC = (props) => {
  const themeContext = React.useContext<IThemeContext>(ThemeContext);

  return (
    <Box
      sx={{
        width: "13.5rem",
        backgroundColor: "backgroundColor.main",
        borderRight: "1px solid",
        borderRightColor: "border.main",
        color: "primary.text",
        borderBottom: "1px solid",
        height: "100vh",
        borderBottomColor: "border.main",
        position: "relative",
        backgroundImage: `url(${
          themeContext.theme === DarkTheme ? DarkFooter.src : LightFooter.src
        })`,
        backgroundPosition: "bottom 0px right 0px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "13rem",
      }}
    >
      <DaoBio />
      <Contents />
      {/* <Footer /> */}
    </Box>
  );
};

export default Nav;
