import React, { Component, useEffect} from "react";
import { connect } from "react-redux";
import {  toggleFavorite } from "../actions/index";
import { Link } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions, IconButton } from "@material-ui/core";
import {Favorite, FavoriteBorder, Chat, PhotoLibrary}  from '@material-ui/icons';
import { makeStyles } from "@material-ui/core";
import 'fontsource-roboto';

const useStyles = makeStyles({
  cardClass: {
    height: `400px`    
    //display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'
  },   
  cardContent:{
    height:'100px',
    overflow:`hidden`
  },
  cardMedia: {    
    height: `300px`
  }, 
  cardAction: {
    height: `50px`,
    width: `100%`,
    display:`flex`, flexFlow:`row`, alignItems:`center`, justifyContent:`flex-end`
  }
});

const Favourites = ({elements, albumLoaded, isLoading, albumLinkError, toggleFavorite}) => {
  const classes = useStyles();
  
  useEffect(()=>{    
  }, [elements, albumLoaded, isLoading, albumLinkError]);

  const aPhoto = (photo, idx) => {            
    const {albumId, id, albumTitle, title, url, thumbnailUrl, comments, isFavorite, myAlbumData} = photo;
    return (
      <Grid item xs={12} sm={6} md={4} key={id}>        
        <Card className={classes.cardClass}>          
          <CardMedia         
            className={classes.cardMedia}                              
            image={url}            
          />     
          <CardContent className={classes.CardContent}>
            
            <IconButton color="primary" aria-label="View Album" 
              component={Link} to={"/album_detail/" + JSON.stringify(myAlbumData)}
            >
              <PhotoLibrary />
              <Typography variant="button" display="block" gutterBottom>
                {myAlbumData.title.toUpperCase()}
              </Typography>
            </IconButton>
          </CardContent>                          
        </Card>        
      </Grid>
    )
  }

  if(elements.length===0){
    return (
      <Container style={{width:`100vw`, height:`100vh`, display:`flex`, alignItems:`center`, justifyContent:`center`}}>
        <Typography variant="overline" display="block" gutterBottom>
          No Favorite Photo...
        </Typography>
      </Container>
    )
  }

  return (
    <Container>      
      <Grid container spacing={3}>
        {
          elements.length > 0 && elements.map(aPhoto)
        }        
      </Grid>      
    </Container>
  )
}

function mapStateToProps(state) {
  const {photos, albums} = state;
  let favePhotos = photos.filter(d=>d.isFavorite);
  favePhotos.forEach(f=>{
    let myAlbumIdx = albums.findIndex(alb=>alb.id===f.albumId);
    f.myAlbumData = albums[myAlbumIdx];
  });

  return {
    albumLoaded: state.albumLoaded,
    elements: favePhotos,    
    isLoading: state.isLoading,
    albumLinkError: state.albumLinkError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFavorite: payload => dispatch(toggleFavorite(payload))
  };
}

export default connect(
  mapStateToProps,    
  mapDispatchToProps
)(Favourites);