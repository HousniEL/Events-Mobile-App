import { API_URL } from "@env";
import { PublicHeader } from './headers';

//import * as SecureStore from 'expo-secure-store';


export async function signup(data, success, error){
    try{
        const result = await fetch(`${API_URL}/user/signup`, {
            method: 'POST',
            ...PublicHeader,
            body: JSON.stringify(data)
        });
    
        const response = await result.json();
        if(response.error) return error(response);
        return success(response);
    } catch (err) {
        error(err);
    }
}

export async function signin(data, success, error){
    try{
        const result = await fetch(`${API_URL}/user/signin`, {
            method: 'POST',
            ...PublicHeader,
            body: JSON.stringify(data)
        });
    
        const response = await result.json();
        if(response.error) return error(response);
        return success(response);
    } catch (err) {
        error(err);
    }
}

export async function getUserInfo(data, success, error){

    //PublicHeader['headers']['Authorization'] = await SecureStore.getItemAsync('token');

    try{
        const result = await fetch(`${API_URL}/user`, {
            method: 'GET',
            ...PublicHeader,
            body: JSON.stringify(data)
        });
    
        const response = await result.json();
        if(response.error) return error(response);
        return success(response);
    } catch (err) {
        error(err);
    }
}