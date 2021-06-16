import React, {useEffect, useState} from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import axios from "../../axios.config";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100vw',
    backgroundColor: theme.palette.navbar,
    padding: '30px',
  },
  navOption: {
    margin: '15px 0',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'orange',
  },
}));

const CollapseSection = ({ domainID, handleClick }) => {
  const classes = useStyles();
  const [subjects, setSubjects] = useState(null)
  const fetchSubjects = () => {
    axios.get(`v1/wishub/subjects/${domainID}/by-domain`)
      .then(res => {
        if(res.status === 200){
          setSubjects(res.data)
        }
      })
      .catch((error) => {
        if( error.response ){
          console.error(error.response.data);
          }
      });
  }

  useEffect(() => {
    fetchSubjects();
  }, [domainID]);
  return (
    <Grid
      container
      className={classes.wrapper}
      direction="column"
      alignItems="flex-start"
    >
      {subjects && subjects.map(({ id, title }) => (
        <Typography
          className={classes.navOption}
          variant="h5"
          key={id}
          onClick={() => handleClick(id)}
        >
          {title}
        </Typography>
      ))}
    </Grid>
  );
};

export default CollapseSection;
