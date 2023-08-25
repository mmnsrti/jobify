import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { checkImageURL } from "../../../../utils";
import styles from "./nearbyjobcard.style";
import { icons } from "../../../../constants";

const NearbyJobCard = ({ handleNavigate, job }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(job?.employer_logo)
              ? job.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles.logImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={2}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType} numberOfLines={1}>
          {job.employer_company_type}
        </Text>
        {job.job_is_remote ? (
          <Image
            source={icons.remoteJob}
            style={{ width: "23px", height: "34px", opacity: "0.8" }}
            resizeMode="contain"
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
