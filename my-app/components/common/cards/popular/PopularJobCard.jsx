import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { checkImageURL } from "../../../../utils";
import styles from "./popularjobcard.style";
import { icons } from "../../../../constants";
const PopularJobCard = ({ handlePress, selectedJob, item }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handlePress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: checkImageURL(item?.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
     <View style={styles.infoContainer}>
       <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
         {item.job_title}
       </Text>
       <Text style={styles.location} numberOfLines={1}>
         {item.job_country} {item.job_is_remote ? <Image source={icons.remoteJob} style={{width:'310px', height:'34px',opacity:'0.7'}} resizeMode="contain" /> : null}
       </Text>
     </View>
     
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
