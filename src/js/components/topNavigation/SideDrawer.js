import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Drawer, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import {Favorite}  from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `black`,
  },
})

const SideDrawer = ({navLinks, faveCount}) => {
  const classes = useStyles();
  const [state, setState] = useState({ right: false }); // Add this

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setState({ [anchor]: open })
  }

  const sideDrawerList = anchor => (     
    <List component="nav"
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        {navLinks.map(({ title, path }) => (          
          <ListItem button key={path} component={Link} to={path} className={classes.linkText}>
            {
              path===`/favourite`?
                <Badge badgeContent={faveCount} color="secondary"> 
                  <Favorite fontSize="small" />
                  <ListItemText primary={title} />
                </Badge>
                :
                <ListItemText primary={title} />
            }
          </ListItem>          
        ))}
    </List>     
  );

  return (
    <>
      <IconButton edge="start" aria-label="menu"
      	onClick={toggleDrawer("right", true)}
      >
        <Menu fontSize="large" style={{ color: `white` }} />
      </IconButton>
      <Drawer
  		  anchor="right"
  		  open={state.right}
  		  onOpen={toggleDrawer("right", true)}
  		  onClose={toggleDrawer("right", false)}
	   >
  		{sideDrawerList("right")}
	   </Drawer>
    </>
  );
}

export default SideDrawer;