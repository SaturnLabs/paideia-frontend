import {
  Alert,
  AlertTitle,
  Box,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import * as React from "react";
import { ITokenomics } from "../../../lib/creation/Api";
import { GlobalContext } from "../../../lib/creation/Context";
import { IData } from "../../../lib/utilities";
import WalletSelector from "../governance/WalletSelector";
import { LearnMore } from "../utilities/HeaderComponents";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  balanceToPercentage,
  percentageToBalance,
  percentage,
} from "../../../lib/creation/Utilities";

const TokenHolders: React.FC<IData<ITokenomics>> = (props) => {
  let globalContext = React.useContext(GlobalContext);
  let data = props.data;
  return (
    <Box
      sx={{
        borderBottom: "1px solid",
        borderBottomColor: "divider.main",
        pb: "1rem",
      }}
    >
      <LearnMore title="Token Holders" />
      <Box
        sx={{
          width: "100%",
        }}
      >
        {data.tokenHolders.map((i: any, c: number) => {
          return (
            <Box
              sx={{ display: "flex", alignItems: "flex-start", height: "5rem" }}
            >
              <Box
                sx={{
                  width: "57%",
                  mr: ".5rem",
                  display: "flex",
                  alignItem: "flex-start",
                }}
              >
                <WalletSelector
                  id="tokenomics"
                  key={c + "tokenomics"}
                  data={i}
                  mt="0"
                  number={c}
                  set={(j: any) => {
                    let temp = [...data.tokenHolders];
                    if (j === undefined) {
                      temp.splice(c, 1);
                    } else {
                      temp[c] = { ...temp[c], ...j };
                    }
                    props.setData({ ...props.data, tokenHolders: temp });
                  }}
                />
              </Box>
              <Box sx={{ width: "23%", mr: ".5rem" }}>
                <TextField
                  label="Balance"
                  type="number"
                  value={
                    data.tokenHolders[c].balance === 0
                      ? ""
                      : data.tokenHolders[c].balance
                  }
                  onChange={(e) => {
                    let temp = [...data.tokenHolders];
                    let balance = parseFloat(e.target.value);
                    balance = isNaN(balance) ? 0 : balance;
                    if (
                      data.tokenRemaining === 0 &&
                      data.tokenHolders[c].balance === 0
                    ) {
                      return;
                    }
                    if (
                      balance >= data.tokenAmount &&
                      balance <=
                        data.tokenRemaining + data.tokenHolders[c].balance
                    ) {
                      balance = data.tokenAmount;
                    } else if (
                      balance >
                      data.tokenRemaining + data.tokenHolders[c].balance
                    ) {
                      return;
                    }
                    let percentage = balanceToPercentage(
                      props.data.tokenAmount,
                      balance
                    );
                    temp[c] = { ...temp[c], balance, percentage };
                    props.setData({ ...props.data, tokenHolders: temp });
                  }}
                />
              </Box>
              <Box sx={{ width: "22%" }}>
                <TextField
                  label="Percentage"
                  type="number"
                  value={
                    data.tokenHolders[c].percentage === 0
                      ? ""
                      : data.tokenHolders[c].percentage
                  }
                  onChange={(e) => {
                    let temp = [...data.tokenHolders];
                    let percentage = parseFloat(e.target.value);
                    percentage = isNaN(percentage) ? 0 : percentage;

                    let balance = percentageToBalance(
                      props.data.tokenAmount,
                      percentage / 100
                    );
                    if (
                      data.tokenRemaining === 0 &&
                      data.tokenHolders[c].balance === 0
                    ) {
                      return;
                    }
                    if (
                      balance >= data.tokenAmount &&
                      balance <=
                        data.tokenRemaining + data.tokenHolders[c].balance
                    ) {
                      balance = data.tokenAmount;
                    } else if (
                      balance >
                      data.tokenRemaining + data.tokenHolders[c].balance
                    ) {
                      return;
                    }
                    temp[c] = { ...temp[c], percentage, balance };
                    props.setData({ ...props.data, tokenHolders: temp });
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box sx={{ color: "primary.text" }}>%</Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
      {data.tokenRemaining > 0 &&
        data.tokenHolders.map((i: any) => i.balance).indexOf(0) === -1 &&
        data.tokenHolders.map((i: any) => i.percentage).indexOf(0) === -1 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: ".8rem",
            }}
          >
            <Button
              variant="text"
              sx={{ mr: 2 }}
              onClick={() => {
                let temp = [...data.tokenHolders];
                globalContext.api.setData({
                  ...globalContext.api.data,
                  tokenomics: {
                    ...data,
                    tokenHolders: temp.concat([
                      {
                        alias: "",
                        address: "",
                        img: "",
                        balance: 0,
                        percentage: 0,
                      },
                    ]),
                  },
                });
              }}
            >
              Add Another <AddIcon />
            </Button>
            <Button variant="text">
              Add from file <FileUploadIcon />
            </Button>
          </Box>
        )}

      {data.tokenAmount > 0 && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <Alert severity="warning" color="warning" sx={{ fontSize: ".8rem" }}>
            <AlertTitle sx={{ fontSize: ".9rem" }}>
              Tokens will be automatically sent to the treasury
            </AlertTitle>
            You have {data.tokenRemaining} unassigned {data.tokenName} tokens
            {data.tokenAmount > 0 &&
              ` (${percentage(data.tokenRemaining / data.tokenAmount)})`}
            . You can distribute them now by setting token configuration below
            or if you choose not to do it now, they will go to the treasury.
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default TokenHolders;
