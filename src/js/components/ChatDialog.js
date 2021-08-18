import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({  
  appBar: {
    position: `relative`
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    flexWrap:'wrap',
    margin: 'auto',
    width: '95%',    
  },
  rootForm: {
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
     // width: '25ch',
    },
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function ChatDialog({open, closeDialog, photo, addPhotoComment}) {
  const classes = useStyles();

  const {albumId, albumTitle, comments, id, isFavorite, thumbnailUrl, title, url} = photo;
  
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('lg');

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("");

  useEffect(()=>{}, [open]);

  const handleClickOpen = () => {
    //setOpen(true);
  };

  const handleClose = () => {
    //setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const submitComment = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if(comment===""){
      setSnackbarMsg("Comment must not empty.");      
      return;
    }

    const submittingComment = await(addPhotoComment({id, name, comment}));
    setSnackbarMsg("Comment added.");
    setName("");
    setComment("");
  }

  const aComment = (acomment, i) => {    
    const {name, date, comment} = acomment;
    return (
      <Grid item xs={12} md={12} key={i}>
        <Paper style={{width:'100%', margin:"10px 5px"}}>
          <Typography variant="overline" gutterBottom>
            {name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            "{comment}"
          </Typography>
        </Paper>
      </Grid>
    )
  }

  return (        
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={closeDialog}
        aria-labelledby="max-width-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="end" color="inherit" onClick={()=>closeDialog()} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {comments.length} comments on "{title}"
            </Typography>            
          </Toolbar>
        </AppBar>        
        <form className={classes.rootForm} noValidate autoComplete="off"
          onSubmit={submitComment}
        >            
            <TextField id="outlined-basic" label="Your Name" variant="outlined" 
              value={name}
              onChange={(e)=>setName(e.target.value)}
              style={{width:'25ch'}}
            />
            <TextField
              id="outlined-multiline-static"
              label="Your Comment"
              multiline
              rows={4}              
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              variant="outlined"
              style={{width:'35ch'}}
            />            
            <Button edge="end" color="primary"
              style={{width:'20ch'}}
              onClick={submitComment}
            >
              <Typography variant="button">
                Add Comment
              </Typography>
            </Button>
          </form>
        <DialogContent>
        {
          comments.length > 0 &&                    
          <Grid container >
            <Typography variant="h5" gutterBottom>
              Comment(s)
            </Typography>
            {comments.map(aComment)}
          </Grid>          
        }                          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
        <EmptyCommentSnackbar 
          open={snackbarMsg!==""} 
          message={snackbarMsg}
          closeSnackbar={()=>setSnackbarMsg("")} 
        />
      </Dialog>    
  );
}

function EmptyCommentSnackbar({open, closeSnackbar, message}) {  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    closeSnackbar();
  };

  return (    
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>            
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />    
  );
}
