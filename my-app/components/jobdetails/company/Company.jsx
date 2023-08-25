import React from "react";
import { View, Text, Image } from "react-native";
import { icons } from "../../../constants";
import styles from "./company.style";
import { checkImageURL } from "../../../utils";

const Company = ({
  companyLogo,
  jobTitle,
  companyName,
  location,
  jobIsRemote,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(companyLogo)
              ? companyLogo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} /</Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
        </View>
        <Text style={styles.locationName}>{location}/</Text>
      </View>
      {jobIsRemote && (
        <View style={styles.remoteJobBox}>
          <Image
            source={icons.remoteJob} // Assuming you have an icon for remote jobs
            resizeMode="contain"
            style={styles.remoteJobImage}
          />
        </View>
      )}
    </View>
  );
};

export default Company;
