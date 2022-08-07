import React from "react";
import "../styles/global.css";
import { AppProps } from "next/app";
import { DarkTheme, LightTheme } from "../theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "../lib/ThemeContext";
import { AppApi } from "../lib/AppApi";
import { GlobalContext } from "../lib/AppContext";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "@components/Layout";
import Creation from "./creation";
import DaoTemplate from "@components/dao/DaoTemplate";
import Head from "next/head";
import { useRouter } from "next/router";
import { isDao } from "@lib/Router";
import { WalletProvider } from "@components/wallet/WalletContext";
import { AddWalletProvider } from "@components/wallet/AddWalletContext";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@material-ui/core";
import { IAlert } from "@lib/Interfaces";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const daoVariants = {
  hidden: { opacity: 0, x: 0, y: -200 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(LightTheme);
  const [alert, setAlert] = React.useState<IAlert>({
    show: false,
  });
  const router = useRouter();
  const [daoId, setDaoId] = React.useState<any>(router.query.id);

  React.useEffect(() => {
    setTheme(localStorage.getItem("theme") === "dark" ? DarkTheme : LightTheme);
  }, []);

  React.useEffect(() => {
    let temp = theme === LightTheme ? "light" : "dark";
    localStorage.setItem("theme", temp);
  }, [theme]);

  const api = new AppApi(alert, setAlert, theme, setTheme, daoId, setDaoId);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes"
        />
      </Head>
      <AddWalletProvider>
        <WalletProvider>
          {isDao(Component) ? (
            <ThemeProvider theme={theme}>
              <ThemeContext.Provider value={{ theme, setTheme }}>
                <CssBaseline />
                <GlobalContext.Provider value={{ api }}>
                  {Component !== Creation ? (
                    <DaoTemplate subdomain="">
                      <AnimatePresence exitBeforeEnter>
                        <motion.main
                          variants={daoVariants}
                          initial="hidden"
                          animate="enter"
                          exit="exit"
                          transition={{ type: "linear" }}
                          className=""
                          key={router.route}
                        >
                          <Component {...pageProps} />
                        </motion.main>
                      </AnimatePresence>
                    </DaoTemplate>
                  ) : (
                    <Component {...pageProps} />
                  )}
                  {/* {alert.show && (
                    <Modal
                      open={alert.show}
                      onClose={() => setAlert({ show: false })}
                    >
                      <Box sx={{ ...modalBackground, width: "35rem" }}>
                        <Box sx={{ fontSize: "1.1rem", fontWeight: 450 }}>
                          {alert.header}
                        </Box>
                        <Box sx={{ mt: "1rem", fontSize: ".9rem" }}>
                          {alert.content}
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            mt: "1rem",
                          }}
                        >
                          <Box sx={{ ml: "auto" }}>skeep</Box>
                        </Box>
                      </Box>
                    </Modal>
                  )} */}
                </GlobalContext.Provider>
              </ThemeContext.Provider>
            </ThemeProvider>
          ) : (
            <ThemeProvider theme={DarkTheme}>
              <CssBaseline />
              <AnimatePresence exitBeforeEnter>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </AnimatePresence>
            </ThemeProvider>
          )}
        </WalletProvider>
      </AddWalletProvider>
    </>
  );
}
