import { StyleSheet } from 'react-native';

const colors = {
  btnPrimary: '#146AFF',
  btnDisabled: '#A7C6FD',
  btnHover: '#1260E6',
  btnSecondary: 'transparent',
  btnText: '#FFFFFF',
  textPrimary: '#2F2F2F',
  borderPrimary: '#BBBBBB',
  inputFocused: '#E6EFFE',
  inputLabel: '#949494',
  darkIcons: '#1E1E1E',
  inactiveIcons: '#949494',
  live: '#1BDB62',
}

const text = StyleSheet.create({
  regular: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: colors.textPrimary
  },
  h1: {
    fontFamily: 'Pangram',
    fontSize: 23,
    color: colors.textPrimary
  },
  h2: {
    fontFamily: 'Pangram',
    fontSize: 18,
    color: colors.textPrimary
  },
  hAlt: {
    fontFamily: 'Pangram',
    fontSize: 21,
    color: colors.textPrimary
  },
  bigTitle: {
    fontFamily: 'Pangram',
    fontSize: 32,
    color: colors.textPrimary
  },
  smallText: {
    fontFamily: 'Roboto',
    fontSize: 12
  },
  p: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: colors.textPrimary
  },
  leftTitle: {
    textAlign: 'left',
    alignSelf: 'stretch',
    paddingVertical: 24
  },
});

// Button styles
const buttons = StyleSheet.create({
  base: {
    flex: 0,
    width: 192,
    fontFamily: 'Roboto',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  primary: {
    backgroundColor: colors.btnPrimary,
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.btnPrimary,
    borderStyle: 'solid',
    backgroundColor: colors.btnSecondary
  },
  hover: {
    backgroundColor: colors.btnHover
  },
  disabled: {
    backgroundColor: colors.btnDisabled
  },
  lg: {
    height: 48,
  },
  md: {
    height: 40,
  },
  sm: {
    height: 32,
  },
});

const buttonText = StyleSheet.create({
  primary: {
    color: colors.btnText,
  },
  secondary: {
    color: colors.btnPrimary,
  },
  lg: {
    fontSize: 16
  },
  md: {
    fontSize: 14
  },
  sm: {
    fontSize: 14
  },
})

// Checkbox styles
const checkbox = StyleSheet.create({
  primary: {
    backgroundColor: colors.btnPrimary,
    color: colors.btnText
  }
});

// Input styles
const input = StyleSheet.create({
  container: {
    marginVertical: 8,
    alignSelf: 'stretch',
    borderBottomColor: colors.borderPrimary,
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.btnSecondary,
  },
  containerFocus: {
    backgroundColor: colors.inputFocused,
    borderBottomColor: colors.btnPrimary
  },
  base: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 8,
  },
  focus: {
    paddingBottom: 0,
    paddingTop: 16,
  },
  labelBase: {
    position: 'absolute',
    left: 12,
    fontSize: 16,
    color: colors.inputLabel,
  },
  labelFocus: {
    fontSize: 12,
  }
});

const dashboardCard = StyleSheet.create({
  btn: {
    width: 128,
    height: 72,
    borderRadius: 4,
    flex: 0,
    alignContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  btnText: {
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingTop: 4,
  }
});

export { buttons, buttonText, colors, input, text, dashboardCard };