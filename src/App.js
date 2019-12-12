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
  // List of Preset Bookmarks
  {
    "label": "NYU Albert",
    "link": "https://www.nyualbert.com"
  },
  {
    "label": "Rate My Professor",
    "link": "https://www.ratemyprofessor.com"
  },
  {
    "label": "NYU Majors",
    "link": "https://www.nyu.edu/admissions/undergraduate-admissions/majors-and-programs.html"
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
  const [left, setLeft] = React.useState(Bookmarks);
  const [right, setRight] = React.useState([]);

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

  const openAll = items => () => {
    right.forEach(index => {
      window.open(index.link, "_blank", 'noopener=yes,noreferrer=yes');
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
            <ListItem key={value.link} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
              <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
          <ListItemText id={labelId} primary={<a href={value.link} target="_blank">{value.label}</a>} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

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
          >Open All</Button>}
      />
      
      <Divider />
      
      <List className={classes.list} dense component="div" role="list">
        {items.map(value => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value.link} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
              <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={<a href={value.link} target="_blank">{value.label}</a>} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
    
  );

  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  function changeTitle(event) {
    setTitle(event.target.value)
  }
  function changeLink(event) {
    setLink(event.target.value)
  }

  const addBookmark = (event)=>{
    event.preventDefault();
    console.info(title, link);
    let bookmark = {
      label: title,
      link: link,
    }
    let newLeft=left.concat([bookmark]);
    setLeft(newLeft);
    document.forms[0].reset();
  };

  return (
    <div className="App">
      <h1><img src="https://freeiconshop.com/wp-content/uploads/edd/bookmark-flat.png"/>Bookmark Bookworm</h1>
      <p>Add bookmarks to save them and open multiple all at once!</p>
      <form onSubmit={addBookmark}>
        <div className="formBox">
          <label className="label">New Bookmark Title: </label>
          <input onChange={changeTitle} type="text" id="label" placeholder="Example" />
        </div>
        <div className="formBox">
          <label className="link">New Bookmark Link:</label>
          <input onChange={changeLink} type="text" id="link" placeholder="https://example.com" />
        </div>
        <div className="formBox">
          
        <Button
          variant="contained"
          size="medium"
          onClick={addBookmark}
          type="submit"
        >Add to Your Bookmarks</Button>
        </div>
      </form>
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
        <Grid item>{leftList('Your Bookmarks', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
          <Button
              variant="outlined"
              size="small"
              className="muiButton"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className="muiButton"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className="responsiveButton"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >	&#x2B06;</Button>
            <Button
              variant="outlined"
              size="small"
              className="responsiveButton"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >&#x2B07;</Button>
          </Grid>
        </Grid>
        <Grid item>{rightList('Bookmarks Folder', right)}</Grid>
      </Grid>
      
    </div>
  );
}

