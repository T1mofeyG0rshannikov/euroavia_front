import API_URL from '../../shared/config/constants'


export async function getData(response){
    let data = null
    try{
        data = await response.json();
    }
    catch {

    }
    
    return {
      status: response.status,
      data: data,
    };
}

export async function fetchAirports(startwith){
    const response = await fetch(`${API_URL}/airports/${encodeURIComponent(startwith)}`)
    return await getData(response)
}

export async function fetchTickets(payload) {
    const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return await getData(response);
}