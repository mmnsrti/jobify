import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { icons } from "../../../constants";
import styles from "./footer.style";

const Footer = ({ url, likedJobs, toggleLikeJob,id }) => {
  const isJobLiked = likedJobs.includes(id); // Use the URL as the job identifier

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.likeBtn}
        onPress={() => toggleLikeJob(id)}
      >
        <Image
          source={isJobLiked ? icons.heart: icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for Job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
