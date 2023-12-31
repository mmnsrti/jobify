import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { router, useRouter } from "expo-router";
import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";
import { useColorScheme } from "react-native";


const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const jobTypes = ["Full-time", "Part-time", "Contractor"];
  const [activeJobType, setActiveJobType] = useState("Full-time");


  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello </Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for jobs and companies in your area"
            value={searchTerm}
            onChangeText={(t) => {setSearchTerm(t)}}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
