import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, useParams, Redirect } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { Badge, Card, CardContent, CardActions, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import {AccountCircle, Email, PersonPinCircle, Business, PhoneAndroid, Web, PhotoAlbum, PhotoLibrary, PinDrop} from '@material-ui/icons';
import 'fontsource-roboto';

const useStyles = makeStyles({
  typograph: {       
    display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start'
  },
  fullHeight: {
    height: `100%`,    
  }, 
  contentHeight: {
    height: `80%`
  }, 
  actionsHeight: {
    height: `20%`
  }
});

const UserDetail = ({aUser, userAlbums}) => { 
  const classes = useStyles();  

  if(typeof aUser === 'undefined'){
    return (
      <Redirect to="/" />
    )
  }

  const { address, company, email, name, username, website, phone} = aUser;
  const {city, geo, suite, street, zipcode} = address;
  const {bs, catchPhrase} = company;

  const renderObjProp = (theProp, theVal) => (
    <Typography variant="subtitle2" gutterBottom className={classes.typograph} >
        {theProp} : {theVal}
    </Typography>
  )

  const album = (alb, idx) => {        
    const {id, title, userId, userName, userEmail} = alb;
    return (
      <Grid item xs={12} sm={6} md={4} key={id}>        
          <Card className={classes.fullHeight}>
            <CardContent className={classes.contentHeight}>
              <Typography variant="h6">{title}</Typography>      
            </CardContent>
            <CardActions className={classes.actionsHeight}>
              <IconButton color="primary" aria-label="View Album" 
                component={Link} to={"/album_detail/" + JSON.stringify(alb)}
              >
                <PhotoLibrary />
                <Typography variant="button" display="block" gutterBottom>
                  View Album
                </Typography>
              </IconButton>              
            </CardActions>            
          </Card>        
      </Grid>
    )
  }
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom className={classes.typograph} >
        <AccountCircle fontSize="large" /> {name} ({username})
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.typograph} >
        <Email /> {email}
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.typograph} >
        <PhoneAndroid /> {phone}
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.typograph} >
        <Web /> {website}
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.typograph} >
        <PersonPinCircle /> Address         
      </Typography> 
          <Typography variant="subtitle2" gutterBottom className={classes.typograph} >
            City : {city}
          </Typography>
          <Typography variant="subtitle2" gutterBottom className={classes.typograph} >
            Suite : {suite}
          </Typography>
          <Typography variant="subtitle2" gutterBottom className={classes.typograph} >
            Street : {street}
          </Typography>
          <Typography variant="subtitle2" gutterBottom className={classes.typograph} >
            Zipcode : {zipcode}
          </Typography>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
            <Typography variant="subtitle2" gutterBottom className={classes.typograph} >
              <PinDrop />  
            </Typography>
            <span style={{marginLeft:"10px"}}>
              <Typography variant="subtitle2" gutterBottom className={classes.typograph} >
                Latitude:{geo.lat}
              </Typography>
              <Typography variant="subtitle2" gutterBottom className={classes.typograph} >
                Longitude:{geo.lang}
              </Typography>
            </span>
          </div>          
      <Typography variant="subtitle1" gutterBottom className={classes.typograph} >
        <Business /> Company         
      </Typography>
          <Typography variant="subtitle2" gutterBottom className={classes.typograph} >
            Company Name : {company.name}
          </Typography>
          <Typography variant="subtitle2" gutterBottom className={classes.typograph} >
            Catchphrase : "{catchPhrase}"
          </Typography>
          <Typography variant="subtitle2" gutterBottom className={classes.typograph} >
            BS : {bs}
          </Typography>
      <Paper xs={12} md={12}>
      <Badge badgeContent={userAlbums.length} color="primary">
        <Typography variant="h6" gutterBottom className={classes.typograph} >
          <PhotoAlbum /> Albums {}         
        </Typography>
      </Badge>
      { 
        userAlbums.length > 0 && 
        <Grid container spacing={3}>
         {userAlbums.map(album)}
        </Grid>
      }
      </Paper>
    </Container>
  )
}

function mapStateToProps(state, routerProps) {
  const userId = parseInt(routerProps.match.params.userId);  
  return {
    aUser: state.users.filter(u=>u.id===userId)[0],
    userAlbums:state.albums.filter(a=>a.userId===userId )
  };
}

export default connect(
  mapStateToProps,
  null
)(UserDetail);