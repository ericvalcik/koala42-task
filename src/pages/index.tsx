import Table from "@/components/Table";
import { StateContext } from "@/store";
import { useContext } from "react";

export default function Home() {
  const { state, dispatch } = useContext(StateContext);
  return <Table data={state} path="" />;
}
