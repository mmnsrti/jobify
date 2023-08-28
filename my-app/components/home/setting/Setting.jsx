import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./setting.style";

const Setting = ({ navigation }) => {
  const [preferredJob, setPreferredJob] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [remoteJobsOnly, setRemoteJobsOnly] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [apiKeyInfoVisible, setApiKeyInfoVisible] = useState(false);

  const handleSave = async () => {
    if (!preferredJob || !country || !city || !apiKey) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    try {
      // Save data to AsyncStorage, including the API key
      const userData = JSON.stringify({
        preferredJob,
        country,
        city,
        remote_jobs_only: remoteJobsOnly,
        api_key: apiKey, // Save the API key
      });
      await AsyncStorage.setItem("userData", userData);

      // Navigate back to the home page
      navigation.push("/");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleCancel = () => {
    try {
      navigation.push("/");
    } catch (error) {
      console.error(error);
    }
    // Navigate back to home page
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem("userData");
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          setPreferredJob(userData.preferredJob || "");
          setCountry(userData.country || "");
          setCity(userData.city || "");
          setRemoteJobsOnly(userData.remote_jobs_only || false);
          setApiKey(userData.api_key || ""); // Set the API key
        }
      } catch (error) {
        console.error("Error fetching user data from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Settings</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Preferred Job:</Text>
          <TextInput
            style={styles.input}
            value={preferredJob}
            onChangeText={setPreferredJob}
            placeholder="Enter preferred job"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Country:</Text>
          <TextInput
            style={styles.input}
            value={country}
            onChangeText={setCountry}
            placeholder="Enter country"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>City:</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter city"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Remote Jobs Only:</Text>
          <Switch value={remoteJobsOnly} onValueChange={setRemoteJobsOnly} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>API Key:</Text>
          <View style={styles.toggleVisibilityButtonContainer}>
            <TextInput
              style={styles.apiKeyTextInput}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="Enter API key"
              secureTextEntry={!apiKeyVisible} // Toggle between text and password mode
            />
            <TouchableOpacity onPress={() => setApiKeyVisible(!apiKeyVisible)}>
              <Text style={styles.toggleVisibilityButton}>
                {apiKeyVisible ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.apiKeyInfoToggle}
            onPress={() => setApiKeyInfoVisible(!apiKeyInfoVisible)}
          >
            <Text style={styles.apiKeyInfoToggleText}>
              How to get an API key?
            </Text>
          </TouchableOpacity>
          {apiKeyInfoVisible && (
            <View style={styles.apiKeyInfoContainer}>
              <Text style={styles.apiKeyInfoText}>
                To get an API key, follow these steps:
                {"\n\n"}
                1. Log in to https://rapidapi.com
                {"\n\n"}
                2. Search for "Jsearch" API
                {"\n\n"}
                3. Subscribe to the API
                {"\n\n"}
                4. Copy the value of X-RapidAPI-Key from the response
              </Text>
            </View>
          )}
        </View>
        {errorMessage ? (
          <View style={styles.errorMessage}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Setting;
