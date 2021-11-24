import { API_URL } from "@env";

export async function insertUser(data, success, error){
    const result = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type' : "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });

    const response = await result.json();
    if(response.error) return error(response);
    return success(response);
}

export async function getUserInfo(data, success, error){
    const result = await fetch(`${API_URL}/user`, {
        method: 'GET',
        headers: {
            'Content-Type' : "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });

    const response = await result.json();
    if(response.error) return error(response);
    return success(response);
}