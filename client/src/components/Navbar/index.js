import React, {useEffect, useState} from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import NavItem from '../NavItem';
import Collapse from '@kunukn/react-collapse';
import CollapseSection from '../CollapseSection';
import { withRouter, useHistory } from 'react-router-dom';
import axios from "../../axios.config";


const useStyles = makeStyles((theme) => ({
  nav: {
    position: 'absolute',
    top: `${theme.topBarHeight}px`,
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.75)',
    backgroundColor: theme.palette.navbar,
    zIndex: theme.zIndex.appBar,
  },
  wrapper: {
    width: '100vw',
    height: `${theme.navbarHeight}px`,
    backgroundColor: theme.palette.navbar,
  },
}));

const Navbar = ({
  collapseDuration = '300ms',
  }) => {
  const [collapseContent, setCollapseContent] = useState('');
  const classes = useStyles();
  const [domains, setDomains] = useState(null)
  const fetchDomains = () => {
    axios.get('v1/wishub/domains/')
      .then(res => {
        if(res.status === 200){
          console.log(res.data)
          setDomains(res.data)
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data); // => the response payload
          }
      });
  }

  useEffect(() => {
    fetchDomains();
  }, []);

  const history = useHistory()
  const handleNavItemClick = (subjectId) => {
    history.push(`/posts/${subjectId}`);
  };
  return (
    <nav className={classes.nav} onMouseLeave={() => setCollapseContent('')}>
      <Grid
        container
        className={classes.wrapper}
        direction="row"
        justify="space-around"
        alignContent="center"
      >
        {domains &&
          domains.map(({ id, title }) => (

            <NavItem
              onClick={() => handleNavItemClick(id)}
              key={id}
              onMouseOver={() => setCollapseContent(id)}
              title={ title}
            />
          ))}
      </Grid>
      <Collapse
        transition={`height ${collapseDuration} cubic-bezier(.4, 0, .2, 1)`}
        isOpen={collapseContent.length !== 0}
      >
        {collapseContent.length !== 0 && (
          <CollapseSection
            handleClick={handleNavItemClick}
            domainID={collapseContent}
          />
        )}
      </Collapse>
    </nav>
  );
};

export default withRouter(Navbar);
