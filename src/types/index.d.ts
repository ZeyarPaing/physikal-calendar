declare type Home = {
  isOpen: boolean;
};

type CEvent = {
  id: number;
  name: string;
  description?: string;
  date: string;
  type?: "normal" | "outline" | "reference";
  refNumber?: string;
  color?: string;
};
type MonthEvents = {
  [date: string]: CEvent[];
};
