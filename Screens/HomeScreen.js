import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image,
  Platform,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(1);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const changeUserIdHandler = () => {
    setUserId((userId) => (userId === 3 ? 1 : userId + 1));
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `https://dog.ceo/api/breeds/image/random`;
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status === 200) {
          setTodos(response.data);
          setIsLoading(false);
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Data fetching cancelled");
        } else {
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };
    fetchUsers();
    return () => source.cancel("Data fetching cancelled");
  }, [userId]);

  return (
    <View>
      <Button
        title="Load user"
        onPress={() => navigation.navigate("ImageDisplay", { todos: todos })}
        disabled={isLoading}
        style={styles.buttonStyles}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  containerFlat: {},
  separator: {
    width: "100%",
    backgroundColor: "black",
    height: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperStyle: {
    minHeight: 128,
  },
  buttonStyles: {
    padding: 100,
  },
});
