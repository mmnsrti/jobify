import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import favicon from "../assets/favicon.png";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import {refetch} from '../hook/useFetch'
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderBtn dimension="60%" />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push("/");
              }}
            >
              <Image
                source={favicon}
                style={{ width: "41px", height: "53px" }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
