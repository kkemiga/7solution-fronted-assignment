import React from "react";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider
    theme={{
      token: {
        fontSize: 14,
        // colorPrimary: "#52c41a",
      },
    }}
  >
    <Component {...pageProps} />
  </ConfigProvider>
);

export default App;
