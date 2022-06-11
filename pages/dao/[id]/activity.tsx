import { Header } from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import {
  Box,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@components/utilities/Chip";
import AppsIcon from "@mui/icons-material/Apps";
import StarIcon from "@mui/icons-material/Star";
import Activity, { IActivity } from "@components/dao/activity/Activity";
import Musk from "@public/profile/musk-full.png";
import PaideiaLogo from "@public/dao/bio-image/paideia-logo.png";

const categories = [
  { icon: <AppsIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />, label: "All" },
  {
    icon: <StarIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />,
    label: "Comments",
  },
  {
    icon: <StarIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />,
    label: "Proposals",
  },
  {
    icon: <StarIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />,
    label: "Transactions",
  },
  {
    icon: <StarIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />,
    label: "Staking",
  },
];

let temp = new Date();
temp.setDate(temp.getDate() - 4);

const activities: IActivity[] = [
  {
    img: Musk.src,
    name: "Alone Musk",
    action: "staked",
    value: "15,000 PTK",
    date: temp,
    category: "Staking",
  },
  {
    img: PaideiaLogo.src,
    name: "3 ERG ($9.07)",
    action: "were transferred to",
    value: "0xaEF7B95f32597E6d70e4aaa2A7b30bE51a9F893b",
    date: new Date(),
    category: "Transactions",
  },
  {
    img: Musk.src,
    name: "Alone Musk",
    action: "created the proposal",
    value: "<proposal name>",
    date: new Date(),
    category: "Proposals",
  },
  {
    img: PaideiaLogo.src,
    name: "10 ERG ($30.21)",
    action: "were transferred to",
    value: "0xaEF7B95f32597E6d70e4aaa2A7b30bE51a9F893b",
    date: temp,
    category: "Transactions",
  },
  {
    img: PaideiaLogo.src,
    name: "3 ERG ($9.07)",
    action: "were transferred to",
    value: "0xaEF7B95f32597E6d70e4aaa2A7b30bE51a9F893b",
    date: new Date(),
    category: "Transactions",
  },
  {
    img: Musk.src,
    name: "Alone Musk",
    action: "created the proposal",
    value: "<proposal name>",
    date: temp,
    category: "Proposals",
  },
  {
    img: Musk.src,
    name: "Alone Musk",
    action: "earned",
    value: "297 PTK",
    date: new Date(),
    category: "Staking",
    secondary: "tokens from staking",
  },
  {
    img: Musk.src,
    name: "Alone Musk",
    action: "voted on the proposal",
    value: "<proposal name>",
    date: temp,
    category: "Proposals",
  },
  {
    img: Musk.src,
    name: "Alone Musk",
    action: "earned",
    value: "301 PTK",
    date: new Date(),
    category: "Staking",
    secondary: "tokens from staking",
  },
  {
    img: Musk.src,
    name: "Alone Musk",
    action: "withdrew",
    value: "5,000 PTK",
    date: temp,
    category: "Staking",
  },
  {
    img: Musk.src,
    name: "Alone Musk",
    action: "made a comment on the proposal",
    value: "<proposal name>",
    date: new Date(),
    category: "Comments",
  },
  {
    img: PaideiaLogo.src,
    name: "10 ERG ($30.21)",
    action: "were transferred to",
    value: "0xaEF7B95f32597E6d70e4aaa2A7b30bE51a9F893b",
    date: new Date(),
    category: "Transactions",
  },
  {
    img: Musk.src,
    name: "Alone Musk",
    action: "earned",
    value: "575 PTK",
    date: temp,
    category: "Staking",
    secondary: "tokens from staking",
  },
  {
    img: Musk.src,
    name: "Alone Musk",
    action: "added an addendum",
    value: "<addendum name>",
    date: new Date(),
    category: "Staking",
    secondary: "to the proposal",
    secondaryValue: "<proposal name>",
  },
];

const Activities: React.FC = () => {
  const [filters, setFilters] = React.useState<{
    sortBy: string;
    search: string;
    categories: string[];
  }>({
    search: "",
    sortBy: "",
    categories: ["All"],
  });
  return (
    <Layout width="95%">
      <Header title="Activity log" large />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mt: "1rem",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "backgroundColor.main",
            border: "1px solid",
            borderColor: "divider.main",
            p: ".65rem",
            borderRadius: "5rem",
            display: "flex",
            alignItems: "center",
            ":hover": {
              borderColor: "primary.main",
            },
            width: "75%",
          }}
        >
          <Box
            sx={{
              width: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon sx={{ opacity: ".6", fontSize: "1.2rem" }} />
          </Box>
          <InputBase
            sx={{
              ml: ".5rem",
              fontSize: ".9rem",
              color: "text.main",
              width: "100%",
            }}
            placeholder="Search by keyword or user"
            value={filters.search}
            // @ts-ignore
            onChange={(event: any) =>
              setFilters({ ...filters, search: event.target.value })
            }
          />
        </Paper>
        <FormControl sx={{ width: "25%", ml: "1rem" }}>
          <InputLabel id="sort-by-select-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-select-label"
            id="sort-by-select"
            value={filters.sortBy}
            label="Sort by"
            onChange={(event: SelectChangeEvent) =>
              setFilters({ ...filters, sortBy: event.target.value })
            }
          >
            <MenuItem value={"Most Recent"}>Most Recent</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", mt: ".5rem" }}>
        {categories.map((i: any, c: number) => (
          <Chip
            {...i}
            set={() => {
              let temp = [...filters.categories];
              let allIndex = temp.indexOf("All");
              let index = temp.indexOf(i.label);
              if (index > -1) {
                temp.splice(index, 1);
              } else {
                if (i.label === "All") {
                  temp = ["All"];
                } else if (i.label !== "All" && allIndex > -1) {
                  temp.splice(allIndex, 1);
                  temp.push(i.label);
                } else {
                  temp.push(i.label);
                }
              }

              setFilters({
                ...filters,
                categories: temp,
              });
            }}
            c={c}
            key={"activity-filter-chip-key-" + c}
            variant={
              filters.categories.indexOf(i.label) > -1
                ? "contained"
                : "outlined"
            }
          />
        ))}
      </Box>
      {activities
        .filter((i: any) => {
          return filters.categories.indexOf("All") > -1
            ? true
            : filters.categories.indexOf(i.category) > -1;
        })
        .sort((a, b) =>
          filters.sortBy === ""
            ? 1
            : filters.sortBy === "Most Recent"
            ? b.date.getTime() - a.date.getTime()
            : 1
        )
        .map((i: any, c: number) => {
          return <Activity i={i} c={c} />;
        })}
    </Layout>
  );
};

export default Activities;
