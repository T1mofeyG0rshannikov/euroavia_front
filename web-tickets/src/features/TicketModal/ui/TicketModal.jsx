import React, { useEffect, useState } from 'react';
import './TicketModal.scss';
import { extractHoursMinutes, formatDate, minutesToHoursMinutes, getSeatClass } from '@/utils/ticketFormatters';
import { Button } from '@/shared/ui/Button/Button'
import { PAGE_ROUTE } from '@/shared/config/PageRoute/PageRoute';


export const TicketModal = ({ticket, setOpen}) => {
    return (
        ticket != null ?
        <div className='modal-container'>
            <div class="modal-content" style={{maxWidth: "800px"}}>
                <div class="modal-body">
                    {ticket.itineraries.map((itinerary, ind) => 
                        <table class="inform bg-white mb-3 border" data-num="0">
                            <thead>
                                <tr>
                                    <td class="ps-2" colspan="3" style={{border: "0px", color: ind == 0 ? "#0d6efd" : "#FF5500"}}>
                                        <font style={{fontSize: "18px" }}>{itinerary.segments[0].origin_airport.city.name} - {itinerary.segments[itinerary.segments.length - 1].destination_airport.city.name}</font>
                                    </td>
                                </tr>
                                {itinerary.segments.map(segment => 
                                <>
                                    <tr>
                                        <td class="ps-2" style={{borderStyle: "none", borderWidth: "medium"}} valign="top">
                                            <font style={{fontSize: "24px"}}>{extractHoursMinutes(segment.departure_at)}</font>
                                            <br />
                                            <font style={{fontSize: "13px"}}>{formatDate(segment.departure_at)}</font>
                                            <br />
                                            <font style={{fontSize: "16px"}}>
                                                {segment.origin_airport.city.name} <abbr style={{color: "#ADADAD"}} title={segment.origin_airport.name}>{segment.origin_airport.iata}</abbr>
                                            </font>
                                        </td>
                                        <td align="center" style={{borderStyle: "none", borderWidth: "medium"}}>
                                            <font style={{fontSize: "13px"}}>
                                                <font style={{fontSize: "24px"}}>{segment.airline.name}</font>
                                                <br />
                                                в пути: {minutesToHoursMinutes(segment.duration)}
                                            </font>
                                        </td>
                                        <td class="pe-2" align="right" style={{borderStyle: "none", borderWidth: "medium"}} valign="top">
                                            <font style={{fontSize: "24px"}}>{extractHoursMinutes(segment.return_at)}</font>
                                            <br />
                                            <font style={{fontSize: "13px"}}>{formatDate(segment.return_at)}</font>
                                            <br />
                                            <font style={{fontSize: "16px"}}>
                                                {segment.destination_airport.city.name} <abbr style={{color: "#ADADAD"}} title={segment.origin_airport.name}>{segment.destination_airport.iata}</abbr>
                                            </font>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" style={{height: "5px"}}></td>
                                    </tr>
                                    <tr>
                                        <td align="center" colspan="3" style={{background: "#fafafa", border: "0px", paddingTop: "5px"}} class="bottom_info">
                                            <font style={{fontSize: "12px", color: "#8a8a8a"}}>
                                                <div class="dopinfo_bottom" style={{ display: "inline-block", marginRight: "3%"}}>Рейс: {segment.flight_number}</div>
                                                <div class="dopinfo_bottom" style={{ display: "inline-block", marginRight: "3%"}}>Выполняет: {segment.airline.name_russian}</div>
                                                <div class="dopinfo_bottom rounded border px-1" style={{display: "inline-block", marginRight: "3%"}}>{getSeatClass(segment.seat_class)}</div>
                                                <div class="dopinfo_bottom" style={{ display: "inline-block", marginRight: "3%"}}>Самолет: {segment.aircraft.name}</div>
                                            </font>
                                        </td>
                                    </tr>
                                    <tr>
                                        {/*<td align="center" colspan="3" style={{ background: "#fafafa", paddingBottom: "5px"}} class="bottom_info">
                                            <font style={{fontSize: "12px", color: "#8a8a8a"}}>
                                                <div class="dopinfo_bottom" style={{display: "inline-block", marginRight: "1%", marginTop: "5px"}}>
                                                    <img class="mb-1 me-1" decoding="async" loading="lazy" src="https://eapics.pics/files/bag-x.svg" width="16" height="16" alt="багаж" />
                                                    Багаж платный
                                                </div>
                                            </font>
                                        </td>*/}
                                    </tr>
                                </>
                                )}
                            </thead>
                        </table>
                    )}
                </div>
            <div class="modal-footer">
                <button type="button" class="btn" data-bs-dismiss="modal" onClick={() => setOpen(false)}>Отмена</button>
                <Button type="button" class="btn buttonpoisk price-button text-white text-nowrap mt-1" to={{
					pathname: PAGE_ROUTE.TICKET_BOOKING,
					search: `?ticket=${ticket.id}`
				}}>
                    <span class="small text-light">Выбрать за</span> {ticket.price} ₽
                </Button>
            </div>
        </div>
    </div> : <></>
    )
}