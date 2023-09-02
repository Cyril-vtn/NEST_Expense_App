export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const data: Data = {
  report: [
    {
      _id: 'uuid1',
      source: 'test',
      type: ReportType.INCOME,
      amount: 100,
      createdAt: new Date(),
      updateAt: new Date(),
    },
    {
      _id: 'uuid2',
      source: 'test',
      type: ReportType.EXPENSE,
      amount: 100,
      createdAt: new Date(),
      updateAt: new Date(),
    },
  ],
};

interface Data {
  report: {
    _id: string;
    source: string;
    type: ReportType;
    amount: number;
    createdAt: Date;
    updateAt: Date;
  }[];
}
