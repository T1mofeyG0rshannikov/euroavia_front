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

const BACKEND_URL = `http://127.0.0.1:9000`

export async function fetchAirports(startwith){
    const response = await fetch(`${BACKEND_URL}/airports/${startwith}`)

    return await getData(response)
}