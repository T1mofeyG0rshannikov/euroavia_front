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

const BACKEND_URL = `https://service.anketus.ru`

export async function fetchAirports(startwith){
    const response = await fetch(`${BACKEND_URL}/airports/${encodeURIComponent(startwith)}`)
    return await getData(response)
}