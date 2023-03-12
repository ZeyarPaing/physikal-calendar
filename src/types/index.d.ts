declare type Home = {
  isOpen: boolean;
};

type CEvent = {
  id: number;
  name: string;
  description?: string;
  date: string;
  type?: string;
  refLabel?: string;
  color?: string;
};
type MonthEvents = {
  [date: string]: CEvent[];
};
