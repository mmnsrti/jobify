import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Setting from "../../components/home/setting/Setting";
import { COLORS, icons, SIZES } from "../../constants";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { ScreenHeader } from "../../components";
const index = () => {
    const router =useRouter()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeader
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
       
          headerTitle: "",
        }}
      />
      <Setting
        navigation={router}
      />
    </SafeAreaView>
  );
};

export default index;
