import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./screenheader.style";
import { useRouter } from "expo-router";
import { SimpleLineIcons,AntDesign } from "@expo/vector-icons";

const ScreenHeaderBtn = ({ dimension }) => {
  const [menu, setMenu] = useState(false);
  const menuContainerRef = useRef(null);
  const router = useRouter();

  const handlePress = () => {
    setMenu(!menu);
  };

  const handleOutsideClick = (event) => {
    if (
      menuContainerRef.current &&
      !menuContainerRef.current.contains(event.target)
    ) {
      setMenu(false);
    }
  };

  const handleSettingPress = useCallback(() => {
    router.push("/setting");
  }, []);

  const handleSavedPress = () => {
    router.push("/saved");
  };
  
  return (
    <View>
      <TouchableOpacity style={styles.btnContainer} onPress={handleSettingPress}>
        <SimpleLineIcons name="settings" size={24} color="black" />
      </TouchableOpacity>
      {/* {menu && (
        <View style={styles.menuContainer} ref={menuContainerRef}>
          <View style={styles.emptyPage}>
            <TouchableOpacity onPress={() => console.log("Dark Mode")}>
              <View style={styles.button}>
                <Text style={{ marginBottom: "76px" }}>Dark Mode</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSavedPress}>
              <View style={styles.button}>
                <Text style={{ marginLeft: "30px", marginBottom: "23px " }}>
                  Saved
                </Text>
                <AntDesign
                  name="heart"
                  style={{ position: "absolute" }}
                  size={16}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexWrap: "wrap-reverse" }}
              onPress={handleSettingPress}
            >
              <View style={styles.button}>
                <Text style={{ marginLeft: "30px" }}>Settings</Text>
                <SimpleLineIcons
                  name="settings"
                  color="black"
                  style={{ position: "absolute" }}
                  size={16}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )} */}
    </View>
  );
};

export default ScreenHeaderBtn;
