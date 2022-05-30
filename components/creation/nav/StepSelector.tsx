import * as React from "react";
import { Box, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepButton from "@mui/material/StepButton";
import { withStyles } from "@material-ui/core/styles";

export default function StepSelector(props) {
  const steps = [
    {
      title: "Basic Information",
      label: "Pick your name and url",
    },

    {
      title: "Tokenomics",
      label: "Mint and configure your token",
    },
    {
      title: "Governance",
      label: "Manage how voting will work",
    },
    {
      title: "Design",
      label: "Make it your own!",
    },
    {
      title: "Review",
      label: "Make sure everything is correct",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Stepper
        activeStep={props.value}
        alternativeLabel
        orientation="vertical"
        connector={
          <Box
            sx={{ display: "flex", height: ".75rem", justifyContent: "center" }}
          >
            <Divider
              orientation="vertical"
              flexItem
              style={{ background: "divider.main" }}
            />
          </Box>
        }
      >
        {steps.map((i: any, c: number) => (
          <Step key={i.title} sx={{ width: "100%", textAlign: "center" }}>
            <StepLabel classes={{ alternativeLabel: "", labelContainer: "" }}>
              <Box sx={{ fontWeight: 440, fontSize: ".7rem" }}>{i.title}</Box>
              {c === props.value && (
                <Box
                  sx={{
                    fontSize: ".6rem",
                    fontWeight: 300,
                    color: "text.light",
                  }}
                >
                  {i.label}
                </Box>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
