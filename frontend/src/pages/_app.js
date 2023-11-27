import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store/store";
import Layout from "@/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
