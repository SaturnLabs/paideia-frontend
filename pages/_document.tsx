import React, { ReactElement } from "react";
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { Box } from "@mui/material";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Box sx={{ overflowX: 'hidden', position: 'relative' }}>
          <Main />
          <NextScript />
          </Box>
        </body>
      </Html>
    );
  }
}
