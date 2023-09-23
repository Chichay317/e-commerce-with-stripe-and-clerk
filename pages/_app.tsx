import type { AppProps } from "next/app";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import { Open_Sans } from "next/font/google";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open_sans",
});

// USING CLERK JS FOR AUTHENTICATION

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <ClerkProvider
        {...pageProps}
        appearance={{
          baseTheme: dark,
          elements: {
            rootBox: "mx-auto my-20",
            card: "flex items-center justify-center",
          },
        }}
      >
        <SessionProvider session={session}>
          <PersistGate loading={"loading"} persistor={persistor}>
            <main className={`${open_sans.variable} font-sans`}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </main>
          </PersistGate>
        </SessionProvider>
      </ClerkProvider>
    </Provider>
  );
}
