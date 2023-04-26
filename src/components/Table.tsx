import type { Row, Table } from "@/types";

type RowProps = {
  data: Row;
};

const Row: React.FC<RowProps> = ({ data }) => {
  if (!data.data) {
    return <></>;
  }
  return (
    <tr>
      {Object.keys(data.data).map((key, index) => {
        return <td key={`col-${index}`}>{data.data[key]}</td>;
      })}
    </tr>
  );
};

type TableProps = {
  data: Table;
};

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table>
      {data[0] ? (
        <thead>
          <tr>
            {Object.keys(data[0].data).map((key, index) => (
              <th key={`table-head-${key}`}>{key}</th>
            ))}
          </tr>
        </thead>
      ) : null}
      <tbody>
        {data.map((row, index) => (
          <Row key={`row-${index}`} data={row} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
