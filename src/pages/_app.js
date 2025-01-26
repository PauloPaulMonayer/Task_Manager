import { Provider, useSelector } from "react-redux";
import store, { selectTheme } from "../store/store";
import "../styles/globals.css";
import "../styles/Calendar.css";
import { useEffect } from "react";

function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return children;
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
