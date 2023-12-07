export type TableData = {
  id: string | number;
  data: any[];
  actionButtons?: TableButtonOptions;
  profileImage?: string;
  checkpoint?: any[];
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

export type Checkpoint = {
  checkPoint1: number | string;
  checkPoint2: number | string;
  checkPoint3: number | string;
};
