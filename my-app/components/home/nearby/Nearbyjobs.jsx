import React, { useEffect, useState, useMemo,useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Nearbyjobs = () => {
  const router = useRouter();
  const [savedData, setSavedData] = useState(null);
  const [remoteJobsOnly, setRemoteJobsOnly] = useState(false); // Added state for remote jobs only
  const { data, isLoading, error,refetch } = useFetch("search", query);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
  useEffect(() => {
    const fetchDataFromStorage = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem("userData");
        if (savedUserData) {
          const { preferredJob, country, city, remote_jobs_only } =
            JSON.parse(savedUserData);
          setRemoteJobsOnly(remote_jobs_only || false);
          const query = `${preferredJob} in ${city} ${country}`;
          setSavedData(query);
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };

    fetchDataFromStorage();
  }, []);

  const query = useMemo(() => {
    return {
      query: savedData || "web developer in texas usa",
      page: 1,
      num_pages: 1,
      remote_jobs_only: remoteJobsOnly,
    };
  }, [savedData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearbyjob${job?.job_id}`}
              handleNavigate={() => router.push(`/job-detail/${job?.job_id}`)}
              horizontal
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Nearbyjobs;
