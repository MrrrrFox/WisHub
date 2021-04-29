import React, {useState} from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import NavItem from '../NavItem';
import Collapse from '@kunukn/react-collapse';
import CollapseSection from '../CollapseSection';
import { withRouter, useHistory } from 'react-router-dom';



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
  fields = null
  }) => {
  const [collapseContent, setCollapseContent] = useState('');
  const classes = useStyles();

  const history = useHistory()
  const handleNavItemClick = (tagId, name) => {
    const url = name.toLowerCase();
    history.push(url);
  };
  fields = [{'fieldID': 0, 'name': "Programming"}, {'fieldID': 1, 'name': "Maths"}, {'fieldID': 2, 'name': "Physics"}]
  return (
    <nav className={classes.nav} onMouseLeave={() => setCollapseContent('')}>
      <Grid
        container
        className={classes.wrapper}
        direction="row"
        justify="space-around"
        alignContent="center"
      >
        {console.log(fields===true)}
        {
          fields.map(({ fieldId, name }) => (
            <NavItem
              onClick={() => handleNavItemClick(fieldId, name)}
              key={fieldId}
              onMouseOver={() => setCollapseContent(name)}
              title={name}
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
            domain={collapseContent}
            // fields={fields}
          />
        )}
      </Collapse>
    </nav>
  );
};

export default withRouter(Navbar);
