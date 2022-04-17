import { Box, Button, InputAdornment, TextField } from "@mui/material";
import * as React from "react";
import { ITokenHolder, ITokenomics } from "../../../../lib/creation/Api";
import { IData } from "../../../../lib/utilities";
import { Subheader } from "../../utilities/HeaderComponents";
import InfoIcon from "@mui/icons-material/Info";
import { percentage } from "../../../../lib/creation/Utilities";
import AddIcon from "@mui/icons-material/Add";
import AddDistribution from "./AddDistribution";

const TokenomicsRow: React.FC<{
  title: string;
  balance: number;
  percentage: number;
}> = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: "1rem", mb: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "10%",
        }}
      >
        <InfoIcon color="primary" />
      </Box>
      <TextField
        value={props.title}
        sx={{ width: "50%", mr: ".5rem" }}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        value={props.balance}
        sx={{ width: "25%", mr: ".5rem" }}
        label="Balance"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Percentage"
        value={props.percentage}
        sx={{ width: "15%" }}
        InputProps={{
          readOnly: true,
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
      />
    </Box>
  );
};

const TokenomicSummary: React.FC<IData<ITokenomics>> = (props) => {
  const [addDistribution, setAddDistribution] = React.useState<boolean>(false);

  let data = props.data;
  let tokenHolderBalance = data.tokenHolders
    .map((i: ITokenHolder) => i.balance)
    .reduce((sum, current) => sum + current, 0);
  let tokenomics = [
    {
      title: "Token holders",
      balance: tokenHolderBalance,
      percentage: percentage(tokenHolderBalance / data.tokenAmount, 2, false),
    },
    {
      title: "Unassigned tokens (Treasury)",
      balance: data.tokenRemaining,
      percentage: percentage(data.tokenRemaining / data.tokenAmount, 2, false),
    },
  ];
  console.log("data", data);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      {tokenomics.map((i: any) => {
        return <TokenomicsRow {...i} />;
      })}
      {addDistribution ? (
        <AddDistribution
          data={{ ...props }}
          close={() => setAddDistribution(false)}
        />
      ) : (
        data.tokenRemaining > 0 && <Button variant="text" onClick={() => setAddDistribution(true)}>
          <AddIcon sx={{ mr: ".3rem" }} />
          Add Distribution
        </Button>
      )}
    </Box>
  );
};

export default TokenomicSummary;
