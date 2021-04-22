import { createMuiTheme } from '@material-ui/core/styles';

const colors = {
  red: '#ff0000',
  orange: '#ff8000',
  yellow: '#ffff00',
  green: '#80ff00',
  blueLight: '#00ffff',
  blue: '#0000ff',
  purple: '#7f00ff',
  pink: '#ff00ff',
  gray: '#808080',
};

const theme = createMuiTheme({
  palette: {
    main: '#083C80',
    randomColor: Object.values(colors)[
      Math.floor(Math.random() * Object.values(colors).length)
    ],
    navbar: '#ECECEC',
  },
  topBarHeight: 100,
  navbarHeight: 100,
  feedWidth: 1000,
  textFont: "'Montserrat', sans-serif",
  mainFont: "'Oswald', sans-serif",
});

export default theme;
