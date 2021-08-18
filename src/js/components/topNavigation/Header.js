import * as React from "react";
import { connect } from "react-redux";
import { AppBar, Toolbar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Home,KeyboardArrowUp  } from "@material-ui/icons";
import { Badge, Container, Fab, List, ListItem, ListItemText, Hidden  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import {Favorite}  from '@material-ui/icons';

import SideDrawer from "./SideDrawer";
import HideOnScroll from "./HideOnScroll";
import BackToTop from "./BackToTop";

import { Link } from "react-router-dom";

const navLinks = [
  { title: `home`, path: `/` },
  { title: `favourite photos`, path: `/favourite` },  
]

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  },
  listItem: { 
    color: `white`
  }
});

const Header = ({faveCount}) => {
  const classes = useStyles();

  return (
  	<>
  	<HideOnScroll>
    <AppBar position="fixed">
      <Toolbar>
      	<Container maxWidth="md" className={classes.navbarDisplayFlex}>
      		<IconButton edge="start" color="inherit" aria-label="home" component={Link} to={"/"}>
          		<Home fontSize="large" />
        	</IconButton>
        	<Hidden smDown>            
        		<List component="nav" aria-labelledby="main navigation"
        			className={classes.navDisplayFlex}
        		>
    				{navLinks.map(({ title, path }) => (      					
                <span key={path} className={classes.linkText}>
        					<ListItem button component={Link} to={path} >
                      {
                        path===`/favourite`?
                        <Badge badgeContent={faveCount} color="secondary"> 
                          <Favorite />
                          <ListItemText primary={title} />
                        </Badge>
                        :
                        <ListItemText primary={title} />
                      }
          						
        					</ListItem>      					
                </span>
    				))}            
  				</List>          
  			</Hidden>
  			<Hidden mdUp>
  				<SideDrawer navLinks={navLinks} faveCount={faveCount} />
  			</Hidden>
  		</Container>
      </Toolbar>
    </AppBar>
    </HideOnScroll>
    <Toolbar id="back-to-top-anchor" />
    <BackToTop>
  		<Fab color="secondary" size="large" aria-label="scroll back to top">
    		<KeyboardArrowUp />
  		</Fab>
	</BackToTop>
    </>
  )
}

function mapStateToProps(state) {    
  return {
    faveCount: state.photos.filter(d=>d.isFavorite).length,    
  };
}

export default connect(
  mapStateToProps,
  null
)(Header)

//export default Header
