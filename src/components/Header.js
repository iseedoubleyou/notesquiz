import React from 'react';
import {withRouter} from "react-router-dom";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {AppBar, Button, ButtonGroup, Divider, Grid, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Keyboard from "./Keyboard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly"
  },
}));

const Header = props => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));
  const isVeryNarrow = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = pageURL => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const menuItems = [
    {
      menuTitle: "Portrait",
      pageURL: "/Portrait"
    },
    {
      menuTitle: "Unterricht",
      pageURL: "/Unterricht"
    },
    {
      menuTitle: "Kontakt und Anfahrt",
      pageURL: "/KontaktUndAnfahrt"
    },
    {
      menuTitle: "Notenquiz",
      pageURL: "/Notenquiz"
    }
  ];

  return (
    <div className={classes.root}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs="2">
          <Keyboard />
        </Grid>
        <Grid item xs="8" >
          {isVeryNarrow? (
            <Typography variant="h6" align="center">
              Klavierschule Volksdorf
            </Typography>  
          ) : (
            <Typography variant="h4" align="center">
              Klavierschule Volksdorf
            </Typography>
          )}  
        </Grid>
        <Grid item xs="2" align="right">
          <Keyboard />
        </Grid>
      </Grid>
        <Divider />
        <Typography variant="subtitle2" align="center" paragraph="true">
          Klavierunterricht in Hamburg-Volksdorf für Kinder, Jugendliche und Erwachsene
        </Typography>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          {isNarrow ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
                keepMounted
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : (
            <div className={classes.headerOptions}>
              <ButtonGroup color="inherit" fullWidth="true" variant="text">
                {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <Button onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <p />
    </div>
  );
};

export default withRouter(Header);