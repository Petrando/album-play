import { takeEvery, call, put, select  } from "redux-saga/effects";
import {getRemoteArcticles, isAlbumLoaded} from "./selectors";
import { START_LOADING, GET_ALBUM_DATA, ALREADY_FETCHED, ALBUM_LOADED, SET_ALBUM_LINK_ERROR } from "../constants/action-types"

export default function* watcherSaga() {   
  yield takeEvery(GET_ALBUM_DATA, workerAlbumSaga);
}


function* workerAlbumSaga() {
  const albumLoaded = yield select(isAlbumLoaded); 
  if(albumLoaded){
    yield put({type:ALREADY_FETCHED});
  }else{
    yield put({type:START_LOADING});
    const albumPayload = yield call(getAlbumData);
    const {linkError, fetchRes} = albumPayload;    
    if(linkError){
      yield put({type: SET_ALBUM_LINK_ERROR});
    }else{
      yield put({type:ALBUM_LOADED, payload:fetchRes});
    }
  }   
}

async function getAlbumData() {  
  let linkError = false;

  let albums, users, photos;
  try{
    let albumResponse = await fetch('https://jsonplaceholder.typicode.com/albums');    
    albums = await albumResponse.json();
    let userResponse = await fetch('https://jsonplaceholder.typicode.com/users');    
    users = await userResponse.json();    
    let photoResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
    photos = await photoResponse.json();
    
    if(albumResponse.status !== 200 || userResponse.status !== 200 || photoResponse.status !== 200){
      throw new Error("not found");
    }
  }catch (err){    
    linkError = true;
  }    

  if(!linkError){
    //attach user name & email to each album
    albums.forEach((album)=>{
      const {name, email} = users.find((user)=>user.id === album.userId)    
      album.userName = name;
      album.userEmail = email;
    });

    //attach album name to each photo, and give comments array
    photos.forEach((photo)=>{
      const {title} = albums.find((album)=>album.id === photo.albumId)    
      photo.albumTitle = title;
      photo.comments = [];
      photo.isFavorite = false;
    });  
  }  

  const fetchResult = {
    linkError,
    fetchRes : linkError?null:{albums, users, photos}
  }

  return fetchResult;
}