import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { toggleFavorite, addPhotoComment } from "../actions/index";
import { Link, Redirect } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { Badge, Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions, IconButton } from "@material-ui/core";
import {Favorite, FavoriteBorder, Chat, AccountBox}  from '@material-ui/icons';
import { makeStyles } from "@material-ui/core";
import 'fontsource-roboto';

import ChatDialog from "./ChatDialog";

const useStyles = makeStyles({
  cardClass: {
    height: `350px`    
    //display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'
  },   
  cardContent:{
    height:'80%',
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

const AlbumDetail = ({elements, albumData, toggleFavorite, addPhotoComment}) => {
  const classes = useStyles();
  const [activeChatPhoto, setActiveChatPhoto] = useState(null);

  const {userId, id, title, userName, userEmail} = albumData;
  useEffect(()=>{}, [elements, activeChatPhoto]);

  const aPhoto = (photo, idx) => {            
    const {albumId, id, title, url, thumbnailUrl, comments, isFavorite} = photo;
    return (
      <Grid item xs={12} sm={6} md={4} key={id}>        
        <Card className={classes.cardClass}>          
          <CardMedia         
            className={classes.cardMedia}                              
            image={url}            
          />          
          <CardActions>
            <IconButton color="primary" aria-label="View Album"                 
              onClick={()=>toggleFavorite({currentFavoriteState:isFavorite, id})}
            >
              {isFavorite?<Favorite />:<FavoriteBorder  />}             
            </IconButton>
            <Badge badgeContent={comments.length} color="primary">
              <IconButton color="primary" aria-label="View User" 
                onClick={()=>setActiveChatPhoto(photo)}
              >
                <Chat />                
              </IconButton>
            </Badge>
          </CardActions>              
        </Card>        
      </Grid>
    )
  }

  if(elements.length === 0){
    return <Redirect to="/" />
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {title.toUpperCase()}        
      </Typography>       
      <IconButton color="primary" aria-label="View User" 
        component={Link} to={"/user_detail/" + userId}
      >
        <AccountBox />
          <Typography variant="button" display="block" gutterBottom>
             {userName} - ({userEmail})
          </Typography>
      </IconButton>
      {
        activeChatPhoto!==null &&
        <ChatDialog 
          open={activeChatPhoto!==null} 
          closeDialog={()=>setActiveChatPhoto(null)}
          photo={activeChatPhoto}
          addPhotoComment={addPhotoComment}
        />
      }      
      <Grid container spacing={3}>
        {elements.length > 0 && elements.map(aPhoto)}
      </Grid>
    </Container>
  )
}

function mapStateToProps(state, routerProps) {  
  const albumData = JSON.parse(routerProps.match.params.albumData);
  const {id} = albumData;
  return {
    elements: state.photos.filter(({albumId})=>albumId===id),
    albumData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFavorite: payload => dispatch(toggleFavorite(payload)),
    addPhotoComment: payload => dispatch(addPhotoComment(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumDetail);