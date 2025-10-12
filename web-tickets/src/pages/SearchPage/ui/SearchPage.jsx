import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { parseTickets } from '../../../features/ComplexTripForm/api'
import { useNavigate } from 'react-router-dom';
import { Header } from '@/widgets/Header'
import cls from '@/features/SimpleTripForm/ui/SimpleTripForm/SimpleTripForm.module.scss'


export const SearchPage = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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

        parseTickets(payload).then(result => {
            if (result.status === 201){
                navigate(
                `/tickets?origin=${params.get('origin')}` +
                `&destination=${params.get('destination')}` +
                `&departure_at=${params.get('departure_at')}` +
                `&return_at=${params.get('return_at')}` +
                `&adults=${Number(params.get('adults'))}` +
                `&childrens=${Number(params.get('childrens'))}` + 
                `&infants=${Number(params.get('infants'))}`
            )
            }
            setLoading(false);
        });
    }, [search]);

    const location = useLocation();
    const cityFrom = location.state?.cityFrom || params.get('cityFrom') || 'Город отправления';
    const cityTo = location.state?.cityTo || params.get('cityTo') || 'Город назначения';

    // Если есть параметры фильтрации, сразу делаем запрос
    useEffect(() => {
        if (params.get('date') || params.get('price_from') || params.get('price_to')) {
            filterTickets({
                date: params.get('date') || '',
                price_from: params.get('price_from') || '',
                price_to: params.get('price_to') || ''
            });
        }
        // eslint-disable-next-line
    }, []);

    // const handleSearchParams = () => {
    //     navigate(`/tickets?origin=${originId}&destination=${destinationId}&cityFrom=${cityFromName}&cityTo=${cityToName}&departure_at=${departureDate}&return_at=${returnDate}`);
    // };

    return (
        <div>
            <Header />
            <div style={{
                minWidth: '600px',
                position: 'absolute',
                top: 'calc(50% - 50px)',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
            {loading ? (
                <div className={cls.loaderWrapper}>
                    <div className={cls.simpleSpinner}></div>
                    <div style={{ marginTop: 12, color: '#222', fontSize: 18 }}>Ищем перелёты...</div>
                </div>
            ) : (
                <>
                </>
            )}
            </div>
        </div>
    );
}