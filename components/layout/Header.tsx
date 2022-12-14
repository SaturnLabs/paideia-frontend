import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SvgIcon from "@mui/material/SvgIcon";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import Paideia from "@components/svgs/Paideia";
import { DarkTheme, LightTheme } from "@theme/theme";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import SocialGrid from "@components/SocialGrid";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import { PageNavContext } from "@components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";

const pages = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Education",
    link: "/education",
    // disabled: true,
  },
  {
    name: "Projects",
    link: "/projects",
    // disabled: true,
  },
  {
    name: "Blog",
    link: "/blog",
    //disabled: true,
  },
];

interface Props {
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: "10" }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

interface INavItemProps {
  size: number;
  page: {
    name: string;
    link: string;
    disabled?: boolean;
    external?: boolean;
  };
}

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { inPageNav } = useContext(PageNavContext);

  const NavigationListItem: React.FC<INavItemProps> = ({ size, page }) => {
    const router = useRouter();

    return (
      <Grid item>
        {page.disabled ? (
          <Typography
            sx={{
              fontFamily: ['"Space Grotesk"', "sans-serif"].join(","),
              fontWeight: "Bold",
              textTransform: "uppercase",
              fontSize: `${size}px`,
              color: "#777",
            }}
          >
            {page.name}
          </Typography>
        ) : page.external ? (
          <MuiLink
            href={page.link}
            target="_blank"
            sx={{
              cursor: "pointer",
              color: "#fff",
              textDecoration: "none",
              "&:hover": {
                color: LightTheme.palette.secondary.main,
                textDecoration: "none",
              },
            }}
            onClick={() => setNavbarOpen(false)}
          >
            {page.name}
          </MuiLink>
        ) : (
          <Link href={page.link}>
            <Box
              sx={{
                cursor: "pointer",
                color:
                  router.pathname === page.link
                    ? LightTheme.palette.secondary.main
                    : "#fff",
                textDecoration:
                  router.pathname === page.link ? "underline" : "none",
                "&:hover": {
                  color: LightTheme.palette.secondary.main,
                },
              }}
              onClick={() => setNavbarOpen(false)}
            >
              {page.name}
            </Box>
          </Link>
        )}
      </Grid>
    );
  };

  const checkWide = useMediaQuery("(min-width:1100px)");

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={trigger && !navbarOpen ? 4 : 0}
        sx={{
          zIndex: "24",
          backdropFilter: `${trigger ? "blur(25px)" : ""}`,
          background: `${trigger
            ? "linear-gradient(130.4deg, rgba(7, 10, 17, 0.6) 14.89%, rgba(7, 10, 17, 0.3) 87.67%)"
            : ""
            }`,
        }}
      >
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ minHeight: "70px" }}
          >
            <Grid
              item
              alignItems="center"
              sx={{
                height: { xs: "32px", md: "40px" },
                width: { xs: "32px", md: "40px" },
              }}
            >
              <Link href="/">
                <SvgIcon
                  sx={{
                    cursor: "pointer",
                    color: DarkTheme.palette.text.primary,
                    fontSize: { xs: "32px", md: "40px" },
                    "&:hover": {
                      color: LightTheme.palette.secondary.main,
                    },
                  }}
                >
                  <rect width="3.56138" height="16.1036" rx="0.5" />
                  <rect
                    x="12.6965"
                    y="7.89648"
                    width="3.56138"
                    height="16.1036"
                    rx="0.5"
                  />
                  <rect x="6.34839" width="3.56138" height="9.75509" rx="0.5" />
                  <rect
                    x="6.34839"
                    y="14.2446"
                    width="3.56138"
                    height="9.75509"
                    rx="0.5"
                  />
                </SvgIcon>
              </Link>
            </Grid>
            <Grid item sx={{ display: { xs: "flex", md: "none" } }}>
              <Button
                variant="contained"
                href="https://app.paideia.im"
                size="small"
                sx={{ float: 'left' }}
              >
                Launch dApp
              </Button>
            </Grid>
            <Grid item>
              <Grid
                container
                justifyContent={{
                  xs: 'center',
                  md: 'flex-end'
                }}
                alignItems="center"
                spacing={6}
              >
                <Grid item sx={{ display: { xs: "none", md: "flex" } }}>
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      fontFamily: ['"Space Grotesk"', "sans-serif"].join(","),
                      fontWeight: "Bold",
                      textTransform: "uppercase",
                      fontSize: "13px",
                    }}
                  >
                    {pages.map((page, i) => (
                      <NavigationListItem size={13} key={i} page={page} />
                    ))}
                  </Grid>
                </Grid>
                <Grid item sx={{ display: { xs: "none", md: "flex" } }}>
                  <Button
                    variant="contained"
                    href="https://app.paideia.im"
                    size="small"
                    sx={{ float: 'left' }}
                  >
                    Launch dApp
                  </Button>
                </Grid>
                <Grid item sx={{ display: { xs: "flex", md: "none" } }}>
                  <Box
                    sx={{
                      zIndex: "25",
                      position: "relative",
                      width: "40px",
                      height: "40px",
                      color: "#fff",
                      // focus: 'outline-none',
                    }}
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        width: "20px",
                        transform: "translate(-50%, -50%)",
                        left: "50%",
                        top: "50%",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          height: "3px",
                          width: "28px",
                          borderRadius: "2px",
                          background: "#fff",
                          transition: "transform 100ms ease-in-out",
                          transform: `${navbarOpen ? "rotate(45deg)" : "translateY(6px)"
                            }`,
                        }}
                      ></Box>
                      <Box
                        sx={{
                          position: "absolute",
                          height: "3px",
                          width: "28px",
                          borderRadius: "2px",
                          background: "#fff",
                          transition: "transform 100ms ease-in-out",
                          transform: `${navbarOpen ? "rotate(-45deg)" : "translateY(-6px)"
                            }`,
                        }}
                      ></Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
      <div id="back-to-top-anchor" />
      <Fade in={navbarOpen} style={{ transitionDuration: "400ms" }}>
        <Box
          sx={{
            zIndex: "35",
            position: "fixed",
            width: "40px",
            height: "40px",
            top: "15px",
            right: "16px",
            color: "#fff",
            // focus: 'outline-none',
          }}
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <Box
            sx={{
              position: "absolute",
              width: "20px",
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                height: "3px",
                width: "28px",
                borderRadius: "2px",
                background: "#fff",
                transition: "transform 100ms ease-in-out",
                transform: `${navbarOpen ? "rotate(45deg)" : "translateY(6px)"
                  }`,
              }}
            ></Box>
            <Box
              sx={{
                position: "absolute",
                height: "3px",
                width: "28px",
                borderRadius: "2px",
                background: "#fff",
                transition: "transform 100ms ease-in-out",
                transform: `${navbarOpen ? "rotate(-45deg)" : "translateY(-6px)"
                  }`,
              }}
            ></Box>
          </Box>
        </Box>
      </Fade>
      <Fade in={navbarOpen} style={{ transitionDuration: "400ms" }}>
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            bottom: "0px",
            zIndex: "25",
            background: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(55px)",
            p: "24px",
            pb: "0",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="flex-start"
            spacing={3}
            height="100%"
          >
            <Grid item>
              <Grid
                container
                spacing={3}
                direction="column"
                justifyContent="flex-end"
                alignItems="flex-start"
                sx={{
                  fontFamily: ['"Space Grotesk"', "sans-serif"].join(","),
                  fontWeight: "Bold",
                  textTransform: "uppercase",
                  fontSize: "20px",
                }}
              >
                {pages.map((page, i) => (
                  <NavigationListItem size={20} key={i} page={page} />
                ))}
              </Grid>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Button
                disabled
                variant="contained"
                sx={{ width: "100%" }}
                onClick={() => setNavbarOpen(false)}
              >
                Create your DAO
              </Button>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Divider />
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  fontSize: "14px",
                  pb: "14px",
                  textTransform: "uppercase",
                }}
              >
                Follow our socials
              </Typography>
              <Grid
                container
                spacing={4}
                direction="row"
                sx={{ fontSize: "24px" }}
              >
                <SocialGrid />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Fade>
      {(!inPageNav || checkWide) && (
        <ScrollTop>
          <Fab sx={{ background: "#ED7E21" }} aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      )}
    </>
  );
}
