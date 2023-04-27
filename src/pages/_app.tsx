import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useReducer } from "react";
import { initalState, reducer, StateContext } from "@/store";

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </StateContext.Provider>
  );
}
