import { Box } from "@mui/material";
import * as React from "react";
import RedditIcon from "@mui/icons-material/Reddit";
import TwitterIcon from "@mui/icons-material/Twitter";

const BottomNav: React.FC = () => {
  return (
    <Box
      sx={{
        width: "calc(100% - 15.5rem)",
        backgroundColor: "backgroundColor.main",
        borderTop: "1px solid",
        borderTopColor: "divider.main",
        p: ".5rem",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
      }}
    >
      <Box sx={{ fontSize: ".9rem" }}>Visit our website at dao.paidiea.im.</Box>
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
        <TwitterIcon color="primary" sx={{ mr: ".5rem" }} />
        <RedditIcon color="primary" />
      </Box>
    </Box>
  );
};

export default BottomNav;