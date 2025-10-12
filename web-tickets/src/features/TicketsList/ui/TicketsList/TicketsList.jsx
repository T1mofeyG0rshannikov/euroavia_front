import cls from './TicketsList.module.scss'
import {TicketsCard} from "../TicketsCard/TicketsCard";
import { useState, useEffect } from 'react';
import { TicketModal } from '../../../TicketModal/ui/TicketModal';


export const TicketsList = ({tickets, ticketsLoading}) => {
    const [ticket, setTicket] = useState(null);
    const [isOpenTicketModal, setOpenTicketModal] = useState(false);
    console.log(ticketsLoading, "tickets loading in list")
    useEffect(() => {
      setOpenTicketModal(true)
    }, [ticket])

  return (
    <>
      {tickets !== undefined ? 
      <ul className={cls.list} style={ticketsLoading ? {opacity: .5, pointerEvents: "none"} : {}}>
        {tickets.map(ticket => <TicketsCard ticket={ticket} setTicket={setTicket} />)}
      </ul> : <></>}
      {isOpenTicketModal ? 
        <TicketModal ticket={ticket} setOpen={setOpenTicketModal} /> : <></>
      }
    </>
  );
};
