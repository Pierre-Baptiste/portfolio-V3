import "styles/index.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { messages } from "messages";
import { AppBar } from "components/ui/AppBar";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  return (
    <IntlProvider
      locale={locale || defaultLocale}
      messages={messages[locale || defaultLocale]}
    >
      <div className="font-mono">
        <AppBar />
        <div className="relative mt-16">
          <Component {...pageProps} />
        </div>
      </div>
    </IntlProvider>
  );
}

export default App;
