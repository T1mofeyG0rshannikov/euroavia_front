import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import cls from '../../features/SimpleTripForm/ui/SimpleTripForm/SimpleTripForm.module.scss'
import { fetchTickets } from '../../features/ComplexTripForm/api'

function useFilterTickets() {
    const [filteredTickets, setFilteredTickets] = useState([])
    const [filterLoading, setFilterLoading] = useState(false)

    const filterTickets = async (filters) => {
        setFilterLoading(true)
        try {
            const response = await fetch('https://service.anketus.ru/filter-tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filters)
            })
            const data = await response.json()
            setFilteredTickets(data)
        } catch (e) {
            setFilteredTickets([])
        } finally {
            setFilterLoading(false)
        }
    }

    return { filteredTickets, filterLoading, filterTickets }
}

export const TicketsPage = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);

    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState(null);

    // Состояния для фильтра
    const [filterDate, setFilterDate] = useState('')
    const [filterPriceFrom, setFilterPriceFrom] = useState('')
    const [filterPriceTo, setFilterPriceTo] = useState('')

    const { filteredTickets, filterLoading, filterTickets } = useFilterTickets();

    // Обработчик изменения фильтра
    const handleFilterChange = () => {
        filterTickets({
            date: filterDate,
            price_from: filterPriceFrom,
            price_to: filterPriceTo
        })
    }

    // Вызов фильтрации при изменении любого поля
    useEffect(() => {
        if (filterDate || filterPriceFrom || filterPriceTo) {
            handleFilterChange()
        }
        // eslint-disable-next-line
    }, [filterDate, filterPriceFrom, filterPriceTo])

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

    console.log("Отправляемый payload:", payload); // ✅ тут

    fetchTickets(payload).then(result => {
    console.log("Ответ API:", result); // ✅ тут
    setTickets(result?.data || []);
    setLoading(false);
});
}, [search]);


    return (
        <div>
            {/* Форма фильтрации */}
            <form
                style={{
                    display: 'flex',
                    gap: 16,
                    margin: '24px 0',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}
                onSubmit={e => e.preventDefault()}
            >
                <input
                    type="date"
                    value={filterDate}
                    onChange={e => setFilterDate(e.target.value)}
                    placeholder="Дата вылета"
                />
                <input
                    type="number"
                    value={filterPriceFrom}
                    onChange={e => setFilterPriceFrom(e.target.value)}
                    placeholder="Цена от"
                    min={0}
                />
                <input
                    type="number"
                    value={filterPriceTo}
                    onChange={e => setFilterPriceTo(e.target.value)}
                    placeholder="Цена до"
                    min={0}
                />
            </form>
            {loading ? (
                <div className={cls.loaderWrapper}>
                    <div className={cls.simpleSpinner}></div>
                    <div style={{ marginTop: 12, color: '#222', fontSize: 18 }}>Ищем перелёты...</div>
                </div>
            ) : (
                <>
                    {(filteredTickets.length > 0 || filterLoading) ? (
    filterLoading ? (
        <div className={cls.loaderWrapper}>
            <div className={cls.simpleSpinner}></div>
            <div style={{ marginTop: 12, color: '#222', fontSize: 18 }}>Фильтруем билеты...</div>
        </div>
    ) : (
        <div>
            {filteredTickets.map(ticket => {
                const hasName = ticket.name || ticket.flight_name;
                const hasPrice = ticket.price !== undefined && ticket.price !== null;
                if (!hasName || !hasPrice) {
                    return (
                        <div key={ticket.id || Math.random()} style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: 8,
                            padding: 16,
                            marginBottom: 16,
                            background: '#fff',
                            color: '#b71c1c'
                        }}>
                            Недостаточно данных для отображения
                        </div>
                    );
                }
                return (
                    <div key={ticket.id} style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: 8,
                        padding: 16,
                        marginBottom: 16,
                        background: '#fff',
                        color: '#222'
                    }}>
                        <div style={{ fontWeight: 600, fontSize: 18 }}>
                            {ticket.name || ticket.flight_name || 'Рейс'}
                        </div>
                        <div style={{ margin: '8px 0' }}>
                            Цена: <b>{ticket.price ? `${ticket.price} ₽` : '—'}</b>
                        </div>
                        <div>
                            Дата: {ticket.date || ticket.departure_at || '—'}
                        </div>
                    </div>
                );
            })}
            {filteredTickets.length === 0 && !filterLoading && (
                <div className={cls.notFoundBlock}>
                    <div className={cls.notFoundIcon}>✈️</div>
                    <div className={cls.notFoundTitle}>Билеты не найдены</div>
                    <div className={cls.notFoundText}>
                        По выбранным фильтрам билеты не найдены.<br />
                        Попробуйте изменить параметры фильтра.
                    </div>
                </div>
            )}
        </div>
    )
) : (
    <>
        {tickets && tickets.length > 0 ? (
            <div>
                {tickets.map(ticket => {
                    const hasName = ticket.name || ticket.flight_name;
                    const hasPrice = ticket.price !== undefined && ticket.price !== null;
                    if (!hasName || !hasPrice) {
                        return (
                            <div key={ticket.id || Math.random()} style={{
                                border: '1px solid #e0e0e0',
                                borderRadius: 8,
                                padding: 16,
                                marginBottom: 16,
                                background: '#fff',
                                color: '#b71c1c'
                            }}>
                                Недостаточно данных для отображения
                            </div>
                        );
                    }
                    return (
                        <div key={ticket.id} style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: 8,
                            padding: 16,
                            marginBottom: 16,
                            background: '#fff',
                            color: '#222'
                        }}>
                            <div style={{ fontWeight: 600, fontSize: 18 }}>
                                {ticket.name || ticket.flight_name || 'Рейс'}
                            </div>
                            <div style={{ margin: '8px 0' }}>
                                Цена: <b>{ticket.price ? `${ticket.price} ₽` : '—'}</b>
                            </div>
                            <div>
                                Дата: {ticket.date || ticket.departure_at || '—'}
                            </div>
                        </div>
                    );
                })}
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
                </>
            )}
        </div>
    );
}