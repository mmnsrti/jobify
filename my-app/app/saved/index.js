import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { useCallback, useState, useMemo, useEffect } from "react";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeader,
  Specifics,
  Requirement,
} from "../../components";
import favicon from "../../assets/favicon.png";

import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
const index = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch(
    "job-details",
    useMemo(() => {
      return { job_id: params.id };
    }, [params.id])
  );
  const [likedJobs, setLikedJobs] = useState([]);
  // useEffect(() => {
  //   // Fetch liked jobs from AsyncStorage
  //   const fetchLikedJobs = async () => {
  //     try {
  //       const likedJobsData = await AsyncStorage.getItem("likedJobs");
  //       if (likedJobsData) {
  //         const parsedLikedJobs = JSON.parse(likedJobsData);
  //         setLikedJobs(parsedLikedJobs);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching liked jobs from AsyncStorage:", error);
  //     }
  //   };

  //   fetchLikedJobs();
  // }, []);
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
      />{" "}
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text
              style={{
                fontFamily: "Arial, sans-serif",
                backgroundColor: "#f5f5f5",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #ccc",
              }}
            >
              <p
                style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
              >
                Exciting changes are on the horizon!
              </p>
              <p style={{ fontSize: "16px", color: "#555" }}>
                Don't miss out on the chance to save your favorite jobs –
                they'll be ready to view in no time.
              </p>
            </Text>
          ) : data.length === 0 ? (
            <Text>No data </Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
                jobIsRemote={data[0].job_is_remote}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default index;
