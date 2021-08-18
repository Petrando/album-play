import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAlbumData } from "../actions/index";
import { Container, Grid, Paper, Typography, TextField } from "@material-ui/core";
import {Card, CardContent, CardActions, IconButton } from "@material-ui/core";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from "@material-ui/core";
import 'fontsource-roboto';

const useStyles = makeStyles({
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

const ITEM_PER_PAGE = 9;
const Albums = ({albumLoaded, isLoading, elements, albumLinkError, getAlbumData}) => {
  const classes = useStyles();

  const [albumFilter, setAlbumFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [myElements, setMyElements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageReached, setMaxPageReached] = useState(false);

  useEffect(()=>{
    if(!albumLoaded && !isLoading){
      getAlbumData();
    }       
    if(elements.length > 0 && !isLoading && myElements.length === 0){
      setMyElements(elements.filter((d,i) => (i >= currentPage && i < ITEM_PER_PAGE)));      
    }
  }, [isLoading, elements, albumLinkError, albumLoaded, albumFilter, userFilter, myElements, currentPage, maxPageReached]);

  const getItemPerPage = () => {
    if(!maxPageReached){
      const pageOffset = currentPage * ITEM_PER_PAGE;
      const newElements = elements.filter((d,i) => (i >= currentPage && i <= pageOffset));
      if(newElements.length > 0){
        setMyElements(myElements.concat(newElements));
        setCurrentPage(currentPage + 1);
      }else{
        setMaxPageReached(true);
      }      

    }
  }
  //const CustomLink = ({to, ...props}) => <Link to={to} {...props} />

  /*const CustomLink = React.useMemo(
    () =>
      React.forwardRef(({to, ...linkProps}, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  );*/

//to={{pathname:"/album_detail", albumData:JSON.stringify(alb)}}  
  const album = (alb, idx) => {        
    const {id, title, userId, userName, userEmail} = alb;
    return (
      <Grid item xs={12} sm={6} md={4} key={id}>
        <Paper className={classes.fullHeight}>
          <Card className={classes.fullHeight}>
            <CardContent className={classes.contentHeight}>
              <Typography variant="h6">{title}</Typography>      
            </CardContent>
            <CardActions className={classes.actionsHeight}>
              <IconButton color="primary" aria-label="View Album" 
                component={Link} to={"/album_detail/" + JSON.stringify(alb)}
              >
                <PhotoLibraryIcon />
                <Typography variant="button" display="block" gutterBottom>
                  View Album
                </Typography>
              </IconButton>
              <IconButton color="primary" aria-label="View User" 
                component={Link} to={"/user_detail/" + userId}
              >
                <AccountBoxIcon />
                <Typography variant="button" display="block" gutterBottom>
                  View User
                </Typography>
              </IconButton>
            </CardActions>            
          </Card>
        </Paper>
      </Grid>
    )
  }

  const elementToDisplay = () => {
    let displayElement = myElements;
    if(albumFilter!==""){
      displayElement = displayElement.filter((el, i)=>{
        return el.title.toUpperCase().includes(albumFilter.toUpperCase())
      })
    }
    if(userFilter!==""){
      displayElement = displayElement.filter((el, i)=>{
        return el.title.toUpperCase().includes(userFilter.toUpperCase())
      })
    }

    return displayElement;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Album Collection
      </Typography> 
      <Grid container>
        <AlbumFilter 
          filterValue={albumFilter}
          filterLabel={"Filter Album by Name"}
          setFilterValue={(e)=>setAlbumFilter(e.target.value)}
          clearFilterValue={()=>setAlbumFilter("")}
        />
        <AlbumFilter 
          filterValue={userFilter}
          filterLabel={"Filter Album by User"}
          setFilterValue={(e)=>setUserFilter(e.target.value)}
          clearFilterValue={()=>setUserFilter("")}
        />
      </Grid>     
      <Grid container spacing={3}>
        {elementToDisplay().map(album)}
      </Grid>    
    </Container>
  )
}

const AlbumFilter = ({filterLabel, filterValue, setFilterValue, clearFilterValue}) => {
  return (
    <>
      {
        filterValue === ""?
          <Grid item xs={12} sm={6}> 
            <TextField 
              label={filterLabel}
              value={filterValue}
              onChange={setFilterValue}
              variant="outlined"
              style={{width:"80%"}}
            />
          </Grid>
          :
          <Grid item xs={12} sm={6}>
            <TextField 
              label={filterLabel}
              value={filterValue}
              onChange={setFilterValue}
              variant="outlined"
              style={{width:"80%"}}
            />
            <IconButton color="secondary" aria-label="View User" 
              onClick={clearFilterValue}
            >
              <ClearIcon />
            </IconButton>
          </Grid>
      } 
    </>
  )
}

function mapStateToProps(state) {
  return {
    albumLoaded: state.albumLoaded,
    elements: state.albums,    
    isLoading: state.isLoading,
    albumLinkError: state.albumLinkError
  };
}

export default connect(
  mapStateToProps,
  { getAlbumData }
)(Albums);