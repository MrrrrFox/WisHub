import React, { useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    select: {
        minWidth: 100
    }
}));

const Sort = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState("");
  
    const sortBy = (e) => {
        setValue(e.target.value);
      };

    const showSorted = () => {
        switch (value) {
            case "best":
                props.posts.sort((a, b) => (a["numUpvoted"] - a["numDownvoted"] < b["numUpvoted"] - b["numDownvoted"]) ? 1 : -1);
                break;
            case "worst":
                props.posts.sort((a, b) => (a["numUpvoted"] - a["numDownvoted"] > b["numUpvoted"] - b["numDownvoted"]) ? 1 : -1);
                break;
            case "newest":
                props.posts.sort((a, b) => (Date.parse(a["created"]) < Date.parse(b["created"])) ? 1 : -1);
                break;
            case "oldest":
                props.posts.sort((a, b) => (Date.parse(a["created"]) > Date.parse(b["created"])) ? 1 : -1);
                break;
            default:
                break;
          }

        props.onSort(props.posts);
    };

    return (
      <div>
          <FormControl className={classes.select}>
              <InputLabel>Sort by</InputLabel>
                <Select onChange={sortBy}>
                    <MenuItem value="best">Best rated</MenuItem>
                    <MenuItem value="worst">Worst rated</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                </Select>
                <Button 
                variant="contained"
                color="primary"
                onClick={showSorted}>
                    Sort
                </Button>
          </FormControl>
      </div>
    );
  };
  
  export default Sort;