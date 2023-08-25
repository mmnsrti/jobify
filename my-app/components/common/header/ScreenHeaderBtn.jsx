import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import styles from "./screenheader.style";
import { useRouter } from "expo-router";
import { AiOutlineSetting, AiFillSave } from "react-icons/ai";

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
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
        <AiOutlineSetting style={styles.btnImg(dimension)} />
      </TouchableOpacity>
      {menu && (
        <View style={styles.menuContainer} ref={menuContainerRef}>
          <View style={styles.emptyPage}>
            <TouchableOpacity onPress={() => console.log("Dark Mode")}>
              <View style={styles.button}>
                <Text style={{marginBottom: '76px'}}>Dark Mode</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSavedPress}>
              <View style={styles.button } >
                <Text style={{ marginLeft: "30px",marginBottom: '23px '}}>Saved</Text>
                <AiFillSave style={{ position: "absolute" }} fontSize="1.2em" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexWrap: "wrap-reverse" }}
              onPress={handleSettingPress}
            >
              <View style={styles.button}>
                <Text style={{ marginLeft: "30px" }}>Settings</Text>
                <AiOutlineSetting
                  fontSize="1.2em"
                  style={{ position: "absolute" }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ScreenHeaderBtn;
