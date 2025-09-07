import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import cls from '../../features/SimpleTripForm/ui/SimpleTripForm/SimpleTripForm.module.scss'
import { fetchTickets } from '../../features/ComplexTripForm/api'

export const TicketsPage = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);

    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState(null);

    useEffect(() => {
        const payload = {
            origin_airport_ids: [params.get('origin')],
            destination_airport_ids: [params.get('destination')],
            departure_at: params.get('departure_at'),
            return_at: params.get('return_at'),
            adults: Number(params.get('adults')),
            childrens: Number(params.get('childrens')),
            infants: Number(params.get('infants'))
        };
        fetchTickets(payload).then(result => {
            setTickets(result?.data || []);
            setLoading(false);
        });
    }, [search]);

    return (
        <div>
            {loading ? (
                <div className={cls.loaderWrapper}>
                    <div className={cls.simpleSpinner}></div>
                    <div style={{ marginTop: 12, color: '#222', fontSize: 18 }}>Ищем перелёты...</div>
                </div>
            ) : (
                <>
                    {tickets && tickets.length > 0 ? (
                        <div>
                            {/* Здесь выводите найденные билеты */}
                            {tickets.map(ticket => (
                                <div key={ticket.id}>
                                    {/* Ваш шаблон билета */}
                                    {JSON.stringify(ticket)}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={cls.notFoundBlock}>
                            <div className={cls.notFoundIcon}>✈️</div>
                            <div className={cls.notFoundTitle}>Билеты не найдены</div>
                            <div className={cls.notFoundText}>
                                К сожалению, по вашему запросу не удалось найти подходящих билетов.<br />
                                Попробуйте изменить параметры поиска или выбрать другие даты.
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}