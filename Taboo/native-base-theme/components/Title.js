// @flow

import { Platform } from "react-native";

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const titleTheme = {
    fontSize: variables.titleFontSize,
    fontFamily: variables.titleFontFamily,
    color: variables.titleFontColor,
    fontWeight: 'bold',
    textAlign: "center",
    paddingLeft: Platform.OS === "ios" ? 4 : 0,
    marginLeft: Platform.OS === "ios" ? undefined : -3,
    paddingTop: 1
  };

  return titleTheme;
};
