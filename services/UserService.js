import { API_URL } from "@env";
import { PublicHeader } from "./headers";

import * as SecureStore from "expo-secure-store";

export async function openid(data, success, error) {
  try {
    const result = await fetch(`${API_URL}/user/openid`, {
      method: "POST",
      ...PublicHeader,
      body: JSON.stringify(data),
    });

    const response = await result.json();
    if (response.error) return error(response);
    await SecureStore.setItemAsync("token", response.response.token);
    await SecureStore.setItemAsync(
      "user",
      JSON.stringify(response.response.user)
    );
    return success(response);
  } catch (err) {
    error(err);
  }
}

export async function signup(data, success, error) {
  try {
    const result = await fetch(`${API_URL}/user/signup`, {
      method: "POST",
      ...PublicHeader,
      body: JSON.stringify(data),
    });

    const response = await result.json();

    if (response.error == true) return error(response);
    await SecureStore.setItemAsync("token", response.response.token);
    await SecureStore.setItemAsync(
      "user",
      JSON.stringify(response.response.user)
    );
    return success(response);
  } catch (err) {
    error(err);
  }
}

export async function signin(data, success, error) {
  try {
    const result = await fetch(`${API_URL}/user/signin`, {
      method: "POST",
      ...PublicHeader,
      body: JSON.stringify(data),
    });

    const response = await result.json();
    if (response.error) return error(response);
    await SecureStore.setItemAsync("token", response.response.token);
    await SecureStore.setItemAsync(
      "user",
      JSON.stringify(response.response.user)
    );
    return success(response);
  } catch (err) {
    error(err);
  }
}

export async function getUserInfo(data, success, error) {
  //PublicHeader['headers']['Authorization'] = await SecureStore.getItemAsync('token');

  try {
    const result = await fetch(`${API_URL}/user`, {
      method: "GET",
      ...PublicHeader,
      body: JSON.stringify(data),
    });

    const response = await result.json();
    if (response.error) return error(response);
    return success(response);
  } catch (err) {
    error(err);
  }
}

export async function signout(data, success, error) {
  try {
    const result = await fetch(`${API_URL}/user/signout`, {
      method: "POST",
      ...PublicHeader,
      body: JSON.stringify(data),
    });

    const response = await result.json();

    if (response.error == true) return error(response);
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("token");
    return success(response);
  } catch (err) {
    error(err);
  }
}

export async function getSomeUserInfo(data, success, error) {
  try {
    var response = await fetch(
      `http://192.168.1.110:5000/api/user/getSomeUserInfo`,
      {
        method: "POST",
        body: JSON.stringify(data),
        ...PublicHeader,
      }
    );

    var result = await response.json();

    if (result.error) return error(result);
    return success(result);
  } catch (e) {
    error(e);
  }
}

export async function getUserCreatedEvents(data, success, error) {
  try {
    var response = await fetch(`http://192.168.1.110:5000/api/event/user`, {
      method: "POST",
      body: JSON.stringify(data),
      ...PublicHeader,
    });

    var result = await response.json();

    if (result.error) return error(result);
    return success(result);
  } catch (e) {
    error(e);
  }
}
