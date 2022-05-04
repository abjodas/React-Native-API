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

import HomeScreen from "./Screens/HomeScreen";
import ImageDisplay from "./components/ImageDisplay";

import { NavigationContainer } from "@react-navigation/native";

import "react-native-gesture-handler";

import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
const Stack = createStackNavigator();
function Todos({ todosObject }) {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={todosObject}
      ItemSeparatorComponent={() => {
        return <View style={styles.separator}></View>;
      }}
      renderItem={({ item }) => {
        return (
          <View>
            <StatusBar />
            <View style={{ flexDirection: "row" }}>
              <Text numberOfLines={1} style={{ width: 150 }}>
                {item.title}
              </Text>
              <View style={{ width: 35 }}>
                <Text>{`${item.completed}`}</Text>
              </View>
              <TouchableOpacity
                style={{ marginLeft: 30 }}
                onPress={() => deleteSelected(item)}
              >
                <View
                  style={{
                    backgroundColor: "red",
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                  }}
                ></View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
}
export default function App() {
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ImageDisplay"
          component={ImageDisplay}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {/* <Button
          title="Load user"
          onPress={changeUserIdHandler}
          disabled={isLoading}
          style={styles.buttonStyles}
        /> */}
    </NavigationContainer>
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
