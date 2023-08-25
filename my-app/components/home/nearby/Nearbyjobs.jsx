import React, { useEffect, useState,useMemo } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
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

  const { data, isLoading, error } = useFetch("search", query);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{error.message}</Text>
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
      </View>
    </View>
  );
};

export default Nearbyjobs;
