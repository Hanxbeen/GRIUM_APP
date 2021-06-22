import {search as sHttp} from '../http';

export function searchPlaces(payload) {
  return sHttp.get(`${payload}`);
}
