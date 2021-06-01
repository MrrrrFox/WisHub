import React, { useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select, makeStyles, Button, FormLabel, FormGroup, FormControlLabel, Checkbox, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    select: {
        minWidth: 100
    }
}));

const Sort = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState("");
    const [BE, setBE] = useState(false);
    const [IN, setIN] = useState(false);
    const [AD, setAD] = useState(false);
  
    const sortBy = (e) => {
        setValue(e.target.value);
      };

    const showSorted = () => {
        const filtered = props.posts.filter(a => {
            const lev = a["level"];
            return BE && lev === "BE" ? true : IN && lev === "IN" ? true : AD && lev === "AD" ? true : !BE && !IN && !AD ? true : false;
        });

        switch (value) {
            case "best":
                filtered.sort((a, b) => (a["numUpvoted"] - a["numDownvoted"] < b["numUpvoted"] - b["numDownvoted"]) ? 1 : -1);
                break;
            case "worst":
                filtered.sort((a, b) => (a["numUpvoted"] - a["numDownvoted"] > b["numUpvoted"] - b["numDownvoted"]) ? 1 : -1);
                break;
            case "newest":
                filtered.sort((a, b) => (Date.parse(a["created"]) < Date.parse(b["created"])) ? 1 : -1);
                break;
            case "oldest":
                filtered.sort((a, b) => (Date.parse(a["created"]) > Date.parse(b["created"])) ? 1 : -1);
                break;
            default:
                break;
          }

        props.onSort(filtered);
    };

    return (
      <Box mt={2}>
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
          <FormControl>
            <FormLabel color="primary">Level</FormLabel>
            <FormGroup aria-label="position" row>
            <FormControlLabel
                value="BE"
                control={<Checkbox color="primary" />}
                label="Beginner"
                labelPlacement="start"
                checked={BE}
                onChange={e => {
                    setBE(e.target.checked);
                    const be = e.target.checked;
                    const filtered = props.posts.filter(a => {
                        const lev = a["level"];
                        return be && lev === "BE" ? true : IN && lev === "IN" ? true : AD && lev === "AD" ? true : !be && !IN && !AD ? true : false;
                    });
                    props.onSort(filtered);
                }}
                />
                <FormControlLabel
                value="IN"
                control={<Checkbox color="primary" />}
                label="Intermediate"
                labelPlacement="start"
                checked={IN}
                onChange={e => {
                    setIN(e.target.checked);
                    const interm = e.target.checked;
                    const filtered = props.posts.filter(a => {
                        const lev = a["level"];
                        return BE && lev === "BE" ? true : interm && lev === "IN" ? true : AD && lev === "AD" ? true : !BE && !interm && !AD ? true : false;
                    });
                    props.onSort(filtered);
                }}
                />
                <FormControlLabel
                value="AD"
                control={<Checkbox color="primary" />}
                label="Advanced"
                labelPlacement="start"
                checked={AD}
                onChange={e => {
                    setAD(e.target.checked);
                    const ad = e.target.checked;
                    const filtered = props.posts.filter(a => {
                        const lev = a["level"];
                        return BE && lev === "BE" ? true : IN && lev === "IN" ? true : ad && lev === "AD" ? true : !BE && !IN && !ad ? true : false;
                    });
                    props.onSort(filtered);
                }}
                />
            </FormGroup>
          </FormControl>
      </Box>
    );
  };
  
  export default Sort;