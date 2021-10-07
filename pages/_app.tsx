import { AppProps } from "next/app";
import { useEffect } from "react";

// styles
import "uikit/dist/css/uikit-core.css";
import "styles/global.scss";

const AppComponent = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    const uikit = require("uikit");
    const icons = require("uikit/dist/js/uikit-icons.min");
    uikit.use(icons);
  }, []);
  return <Component {...pageProps} />;
};

export default AppComponent;
