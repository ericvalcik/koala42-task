import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useReducer } from "react";
import { Table } from "@/types";
import { initalState, StateContext } from "@/store";

function reducer(state: Table, action: { type: "UPDATE"; newState: Table }) {
  switch (action.type) {
    case "UPDATE":
      return action.newState;
    default:
      throw new Error();
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </StateContext.Provider>
  );
}
