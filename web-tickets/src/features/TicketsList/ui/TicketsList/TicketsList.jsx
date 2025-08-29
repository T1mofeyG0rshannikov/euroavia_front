import cls from './TicketsList.module.scss'
import {TicketsCard} from "../TicketsCard/TicketsCard";

export const TicketsList = () => {
  return (
    <ul className={cls.list}>
      <TicketsCard />
      <TicketsCard />
      <TicketsCard />
      <TicketsCard />
      <TicketsCard />
      <TicketsCard />
    </ul>
  );
};
