import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

const Bookmarks = [
  {
    "label": "Google",
    "link": "https://www.google.com"
  },
  {
    "label": "Facebook",
    "link": "https://www.facebook.com"
  },
  {
    "label": "Youtube",
    "link": "https://www.youtube.com"
  },
  {
    "label": "Medium",
    "link": "https://www.medium.com"
  },
  {
    "label": "Albert",
    "link": "https://www.nyualbert.com"
  },
  {
    "label": "Twitter",
    "link": "https://www.twitter.com"
  },
  {
    "label": "Rate My Professor",
    "link": "https://www.ratemyprofessor.com"
  },
  {
    "label": "NYU",
    "link": "https://www.nyu.edu"
  }

];

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([0,1,2,3,4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = items => intersection(checked, items).length;

  const handleToggleAll = items => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleToggleAllLeft = items => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const openAll = items => () => {
    left.forEach(index => {
      window.open(Bookmarks[index].link, "_blank");
    });
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const rightList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map(value => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
              <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
          <ListItemText id={labelId} primary={<a href={Bookmarks[value].link} target="_blank">{Bookmarks[value].label}</a>} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const leftList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={
          <Button
          variant="outlined"
          size="small"
          onClick={openAll(items)}
          indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
          disabled={items.length === 0}
          inputProps={{ 'aria-label': 'all items selected' }}
          >Open All</Button>}
      />
      
      <Divider />
      
      <List className={classes.list} dense component="div" role="list">
        {items.map(value => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
              <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={<a href={Bookmarks[value].link} target="_blank">{Bookmarks[value].label}</a>} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
    
  );

  return (
    <div class="App">
      <h1><img src="https://freeiconshop.com/wp-content/uploads/edd/bookmark-flat.png"/>Bookmarks Manager</h1>
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
        <Grid item>{leftList('Bookmark Folder', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{rightList('Your Bookmarks', right)}</Grid>
      </Grid>
      
    </div>
  );
}

//Trying to add a user input functionality:
// const addBookmark = (ev)=>{
//   ev.preventDefault();
//   let bookmark = {
//     label: document.getElementById('label').value,
//     link: document.getElementById('link').value
//   }
//   Bookmarks.concat(bookmark);
//   document.forms[0].reset();
// };
/* <form>
    <div class="formBox">
      <label for="label">Bookmark Title: </label>
      <input type="text" id="label" placeholder="Enter Bookmark Title" />
    </div>
    <div class="formBox">
      <label for="link">Bookmark Link: </label>
      <input type="text" id="link" placeholder="Enter Bookmark Link" />
    </div>
    <div class="formBox">
      <button id="btn">Click to Add</button> 
    </div>
  </form> */