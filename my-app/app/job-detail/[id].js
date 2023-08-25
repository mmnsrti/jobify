import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { useCallback, useState, useMemo ,useEffect} from "react";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeader,
  Specifics,
  Requirement,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import { Share } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JobDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch(
    "job-details",
    useMemo(() => {
      return { job_id: params.id };
    }, [params.id])
  );
  const [likedJobs, setLikedJobs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const tabs = ["About", "Qualification", "Responsibilities"];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
  useEffect(() => {
    const loadLikedJobs = async () => {
      try {
        const likedJobsData = await AsyncStorage.getItem("likedJobs");
        if (likedJobsData) {
          setLikedJobs(JSON.parse(likedJobsData));
        }
      } catch (error) {
        console.log("Error loading liked jobs:", error);
      }
    };

    loadLikedJobs();
  }, []);

  // Function to add or remove a job from liked jobs
  const toggleLikeJob = (jobId) => {
    const updatedLikedJobs = likedJobs.includes(jobId)
      ? likedJobs.filter((id) => id !== jobId)
      : [...likedJobs, jobId];

    setLikedJobs(updatedLikedJobs);

    // Save the updated liked jobs to AsyncStorage
    AsyncStorage.setItem("likedJobs", JSON.stringify(updatedLikedJobs))
      .then(() => console.log("Liked jobs saved to AsyncStorage"))
      .catch((error) => console.log("Error saving liked jobs:", error));
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case tabs[0]:
        return (
          <JobAbout info={data[0].job_description ?? "No Data Provided"} />
        );
      case tabs[1]:
        return (
          <Specifics
            title="Qualification"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case tabs[2]:
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this job at ${data[0].employer_name}`,
      });
      console.log("shared");
    } catch (error) {
      console.log(error);
    }
  };
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
            <ScreenHeader
              iconUrl={icons.share}
              dimension="60%"
              handlePress={handleShare}
            />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
              progressBackgroundColor={COLORS.lightWhite}
            />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something Went Wrong </Text>
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

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results"
          }
          id={data[0]?.job_id}
          likedJobs={likedJobs} // Pass liked jobs to JobFooter
          toggleLikeJob={toggleLikeJob} // Pass the function to toggle liked jobs
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
