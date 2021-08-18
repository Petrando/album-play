import { START_LOADING, ALBUM_LOADED, SET_ALBUM_LINK_ERROR, TOGGLE_FAVORITE, ADD_PHOTO_COMMENT } from "../constants/action-types";

const initialState = {  
  isLoading: false,
  albumLinkError: false,
  albumLoaded: false,
  albums:[],
  users:[],
  photos:[]  
};

function rootReducer(state = initialState, action) {  

  if(action.type === START_LOADING){
    return Object.assign({}, state, {
      isLoading: true
    }); 
  }

  if(action.type === SET_ALBUM_LINK_ERROR){
    return Object.assign({}, state, {
      albumLinkError: true, 
      isLoading: false
    }); 
  }

  if(action.type === ALBUM_LOADED){
    const {albums, users, photos} = action.payload;
    return Object.assign({}, state, {
      albumLoaded: true,
      isLoading:false,
      albumLinkError: false,      
      albums: state.albums.concat(albums),
      users: state.users.concat(users),
      photos: state.photos.concat(photos)
    });
  }  

  if(action.type === TOGGLE_FAVORITE){    
    const {currentFavoriteState, id} = action.payload;
    let updatedPhotos = state.photos.slice();
    const idxToUpdate = updatedPhotos.findIndex((d)=>d.id===id)    
    updatedPhotos[idxToUpdate].isFavorite = !currentFavoriteState;    
    return Object.assign({}, state, {photos:updatedPhotos});
  }

  if(action.type === ADD_PHOTO_COMMENT){
    const {id, name, comment} = action.payload;
    let updatedPhotos = state.photos.slice();
    const idxToUpdate = updatedPhotos.findIndex((d)=>d.id===id)    
    updatedPhotos[idxToUpdate].comments = updatedPhotos[idxToUpdate].comments.concat({name:name!==""?name:"Anonymus", comment, date:new Date()});
    return Object.assign({}, state, {photos:updatedPhotos}); 
  }
  
  return state;
};

export default rootReducer;