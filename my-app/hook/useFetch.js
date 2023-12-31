import axios from "axios";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetch = (endPoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(""); // State to store the API key

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": apiKey, // Use the apiKey state
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setError("Rate limit exceeded. Please change your API key.");
      } else if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Set the error message from the response
      } else {
        setError("An error occurred while fetching data.");
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
    useEffect(() => {
    // Fetch API key from AsyncStorage
    const fetchApiKey = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem("userData");
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          const apiKeyFromStorage = userData.api_key ;
          setApiKey(apiKeyFromStorage); // Set the API key to the state
          
        } else {
          setError("Please enter your API key");
        }
      } catch (error) {
        console.error("Error fetching user data from AsyncStorage:", error);
      }
    };

    fetchApiKey(); // Fetch API key when the component mounts
  }, []);

  useEffect(() => {
    // Fetch data only if API key is available
    if (apiKey) {
      fetchData();
    }
  }, [apiKey, query]); // Include apiKey as a dependency

  const refetch = async () => {
    await fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
