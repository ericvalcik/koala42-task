import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useReducer } from "react";
import { Table } from "@/types";
import { initalState, StateContext } from "@/store";

function deletePropertyPath(obj: any, path: string) {
  if (!obj || !path) {
    return;
  }
  const pathArray = path.split(".");
  for (let i = 0; i < pathArray.length - 1; i++) {
    obj = obj[pathArray[i]];
    if (typeof obj === "undefined") {
      return;
    }
  }
  delete obj[pathArray.pop() as string];
}

function reducer(state: Table, action: { type: "DELETE_KEY"; key: string }) {
  switch (action.type) {
    case "DELETE_KEY":
      const newState = [...state];
      deletePropertyPath(newState, action.key);
      console.log(newState);
      return newState;
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
