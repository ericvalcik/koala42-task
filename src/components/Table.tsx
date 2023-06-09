import type { Row, Table } from "@/types";
import { useContext, useState } from "react";
import { StateContext } from "@/store";

type RowProps = {
  data: Row;
  path: string;
};

const Row: React.FC<RowProps> = ({ data, path }) => {
  const { dispatch } = useContext(StateContext);
  const [showChildren, setShowChildren] = useState(false);
  if (!data?.data) {
    return null;
  }
  return (
    <>
      <tr>
        <td>
          {Object.keys(data.children).length !== 0 &&
          data.children[Object.keys(data.children)[0]].records.filter((x) => x)
            .length !== 0 ? (
            <button
              onClick={() => setShowChildren(!showChildren)}
              className="px-4"
            >
              {showChildren ? "↓" : "→"}
            </button>
          ) : (
            ""
          )}
        </td>
        {Object.keys(data.data).map((key, index) => {
          return <td key={`col-${index}`}>{data.data[key]}</td>;
        })}
        <td>
          <button
            onClick={() => {
              dispatch({ type: "DELETE_KEY", key: path });
            }}
          >
            ❌
          </button>
        </td>
      </tr>
      {showChildren ? (
        <tr>
          <td colSpan={100} className="w-full pl-8">
            {Object.keys(data.children).map((key, index) => {
              return (
                <Table
                  data={data.children[key].records}
                  key={`table-${index}`}
                  path={`${path}.children.${key}.records`}
                />
              );
            })}
          </td>
        </tr>
      ) : null}
    </>
  );
};

type TableProps = {
  data: Table;
  path: string;
};

const Table: React.FC<TableProps> = ({ data, path }) => {
  let i = 0;
  if (!data) {
    return null;
  }
  // the first row can be deleted, find a row that is not null or undefined
  for (i = 0; i < data.length; i++) {
    if (data[i]) {
      break;
    }
  }
  return data[i] ? (
    <table className="border border-1 border-black m-2">
      <thead>
        <tr>
          <th></th>
          {Object.keys(data[i].data).map((key, index) => (
            <th key={`table-head-${key}`}>{key}</th>
          ))}
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <Row
            key={`row-${index}`}
            data={row}
            path={`${path ? `${path}.` : ""}${index}`}
          />
        ))}
      </tbody>
    </table>
  ) : null;
};

export default Table;
