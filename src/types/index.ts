export type Row = {
  data: {
    [key: string]: string;
  };
  children: {
    [key: string]: {
      records: Table;
    };
  };
};

export type Table = Row[];
