export type TableData = {
  id: string;
  data: any[];
  actionButtons?: TableButtonOptions;
  rowStyle?: string[];
};

export type SelectData = {
  id: string | number;
  text: string;
};

export type TableButtonOptions = {
  view?: ButtonsParams;
  delete?: ButtonsParams;
  edit?: ButtonsParams;
  activate?: ButtonsParams;
};

export type ButtonsParams = {
  isActive: boolean;
  text?: string;
};
