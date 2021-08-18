import { GET_ALBUM_DATA, ADD_PHOTO_COMMENT, TOGGLE_FAVORITE } from "../constants/action-types";

export function getAlbumData() {
  return {type : GET_ALBUM_DATA}
}

export function addPhotoComment(payload){
  return {type : ADD_PHOTO_COMMENT, payload}
}

export function toggleFavorite(payload){	
  return {type : TOGGLE_FAVORITE, payload}
}