import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";
import styles from "./popularjobs.style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Popularjobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();
  const [savedData, setSavedData] = useState(null);
  const [remoteJobsOnly, setRemoteJobsOnly] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch } = useFetch("search", query);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
  const fetchDataFromStorage = async () => {
    try {
      const savedUserData = await AsyncStorage.getItem("userData");
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        const { preferredJob, country, city, remote_jobs_only } = userData;
        setRemoteJobsOnly(remote_jobs_only || false);
        const query = `${preferredJob} in ${city} ${country}`;
        setSavedData(query);
      }
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };
  useEffect(() => {
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

  useEffect(() => {
    if (data) {
      const sortedDataByQuality = [...data].sort(
        (a, b) => b.job_apply_quality_score - a.job_apply_quality_score
      );
      setSortedData(sortedDataByQuality);
    }
  }, [data]);

  const handlePress = (item) => {
    router.push(`/job-detail/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  const handleShow = () => {
    // Handle showing all popular jobs
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity onPress={handleShow}>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
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
          <Text>{error} </Text>
        ) : (
          <FlatList
            data={sortedData}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handlePress={handlePress}
                selectedJob={selectedJob}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Popularjobs;
