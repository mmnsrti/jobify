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
    top: "350%",      // Move the menu to the middle vertically
    left: "313%",     // Move the menu to the middle horizontally
    transform: [
      { translateX: -100 },  // Adjust this value based on menu width / 2
      { translateY: -100 },  // Adjust this value based on menu height / 2
    ],
    zIndex: 1,
  },
  emptyPage: {
    backgroundColor: "white",
    width: 200,      // Set a suitable width for the menu
    height: 200,     // Set a suitable height for the menu
    borderWidth: 1,
    borderColor: "gray",
    padding: 20,
  },
  darkMode: {
    backgroundColor: COLORS.black,
  },
  lightMode: {
    backgroundColor: COLORS.white,
  },
});

export default styles;
