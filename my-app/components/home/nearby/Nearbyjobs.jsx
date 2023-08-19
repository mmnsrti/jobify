import {
  View,
  Text,
  TouchableOpacity,
  
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import nearJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";
import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "web developer in texas usa",
    page: 1,
    num_pages: 1,
  });
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
          <Text>Something Went Wrong</Text>
        ) : (
         data?.map((job)=>(<NearbyJobCard
          job={job}
          key={`nearbyjob${job?.job_id}`}
          handleNavigate={()=>router.push(`/job-detail/${job?.job_id}`)}
          horizontal
         />))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
