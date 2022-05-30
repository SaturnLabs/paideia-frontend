import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { DarkTheme, LightTheme } from "@theme/theme";

const StyledTabs = styled((props: any) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-indicatorSpan": {
    display: "none",
  },
});

const StyledTab = styled((props: any) => <Tab {...props} variant="outlined" />)(
  ({ theme }) => ({
    position: "relative",
    textTransform: "uppercase",
    fontSize: "13px",
    minHeight: "24px",
    height: "24px",
    borderRadius: "16px",
    marginRight: "12px",
    color: DarkTheme.palette.primary.dark,
    border: `1px solid ${DarkTheme.palette.primary.dark}`,
    "&.Mui-selected": {
      color: DarkTheme.palette.primary.contrastText,
      backgroundColor: DarkTheme.palette.primary.main,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#ccc",
    },
  })
);

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function PillTabs({ tabs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="DAO Samples"
        >
          {tabs.map(({ label }, i: number) => (
            <StyledTab label={label} key={i} />
          ))}
        </StyledTabs>
      </Box>
      {tabs.map(({ title, content, link }, i: number) => (
        <TabPanel value={value} index={i} key={i}>
          <Typography>{title}</Typography>
          <Typography>{content}</Typography>
          <Button href={link}>Learn More</Button>
        </TabPanel>
      ))}
    </Box>
  );
}
