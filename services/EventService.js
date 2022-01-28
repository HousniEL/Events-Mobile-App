import { API_URL } from "@env";
import { PublicHeader } from "./headers";

import * as SecureStore from "expo-secure-store";

export async function addEvent(formData, Images, success, error) {
  uploadPhoto(
    Images,
    async () => {
      try {
        var response = await fetch(`http://192.168.1.110:5000/api/event`, {
          method: "POST",
          body: JSON.stringify(formData),
          ...PublicHeader,
        });

        var result = await response.json();

        if (result.error) return error(result);

        return success();
      } catch (e) {
        error(e);
      }
    },
    (err) => {
      error(err);
    }
  );
}

export async function getEventInfo() {}

export async function getEventsByPage() {}

export async function uploadPhoto(data, success, error) {
  try {
    var response = await fetch(`http://192.168.1.110:5000/api/event/upload`, {
      method: "POST",
      body: JSON.stringify(data),
      ...PublicHeader,
    });

    var result = await response.json();

    if (result.error) return error(result);
    return success();
  } catch (e) {
    error(e);
  }
}

export async function getImages(success, error) {
  try {
    var response = await fetch(`http://192.168.1.110:5000/api/event/images`, {
      method: "POST",
      ...PublicHeader,
    });

    var result = await response.json();

    if (result.error) return error(result);
    return success(result);
  } catch (e) {
    error(e);
  }
}
