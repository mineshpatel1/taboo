import { StyleSheet } from 'react-native';
import { colours } from './colours';
import { fonts } from './fonts';

const theme = {
  color: colours.lightText,
  backgroundColor: colours.primary,  // Splash colour
}

const fs20 = {
  fontSize: 20,
}

const lightText = {
  fontWeight: 'bold',
  color: colours.lightText,
}

export default StyleSheet.create({
  theme: {
    ...theme,
  },
  title: {
    fontFamily: fonts.serif,
    color: colours.lightText,
    paddingTop: 6,
    fontSize: 24,
  },
  settingLabelText: {
    color: colours.lightText,
    fontFamily: fonts.sansSerif,
    fontSize: 18,
  },
  settingInputText: {
    fontFamily: fonts.sansSerif,
    fontSize: 18,
  },
  serif: {
    fontFamily: fonts.serif,
  },
  sansSerif: {
    fontFamily: fonts.sansSerif,
  },
  sansSerifBold: {
    fontFamily: fonts.sansSerifBold,
  },
  serifHeading: {
    fontSize: 24,
    fontFamily: fonts.serif,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  buttonContainer: {
    width: 200,
    marginTop: 20,
  },
  f1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pt20: {
    paddingTop: 20,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  padded: {
    padding: 10,
  },
  formBtn: {
    justifyContent: 'center',
    width: 100,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalText: {
    color: colours.lightText,
    padding: 50,
    fontWeight: 'bold',
    fontSize: 30
  },
  columnBottom: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  row100: {
    height: 100,
    flexDirection: 'row'
  },
  h100f50: {
    height: 100,
    flex: 0.5,
  },
  bigIcon: {
    fontSize: 50,
  },
  light: {
    color: colours.lightText,
  },
  lightGrey: {
    color: colours.lightGrey,
  },
  bgLight: {
    backgroundColor: colours.lightBg,
  },
  danger: {
    color: colours.danger,
    backgroundColor: colours.danger,
  },
  success: {
    color: colours.success,
    backgroundColor: colours.success,
  },
  bottomModal: {
    ...theme,
  },
  bottomText: {
    fontSize: 16,
    color: colours.lightText,
  },
  bold: {
    fontWeight: 'bold',
  },
  fs20: {
    ...fs20,
  },
  lightText: {
    color: colours.lightText,
  },
  lightText20: {
    ...fs20,
    color: colours.lightText,
    fontFamily: fonts.sansSerif,
  },
  lightText20b: {
    ...fs20,
    color: colours.lightText,
    fontFamily: fonts.sansSerifBold,
  },
  lightBox: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colours.white,
    elevation: 5,
  },
  shadow: {
    elevation: 2,
  },
});
