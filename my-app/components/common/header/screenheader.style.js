import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
  menuContainer: {
    position: "absolute",
    top: "350%",
    left: "313%",
    transform: [
      { translateX: -100 },
      { translateY: -100 },
    ],
    zIndex: 2, 
  },
  emptyPage: {
    backgroundColor: "white",
    width: 200,      // Set a suitable width for the menu
    height: 200,     // Set a suitable height for the menu
    borderWidth: 1,
    borderColor: "gray",
    padding: 20,
    zIndex: 1,

  },
  darkMode: {
    backgroundColor: COLORS.black,
  },
  lightMode: {
    backgroundColor: COLORS.white,
  },
});

export default styles;
