import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function ImageDisplay({ props, route }) {
  const data = route.params;
  const imageLink = data.todos.message;
  return (
    <View styles={styles.container}>
      <Image source={{ uri: imageLink }} style={styles.logo} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    position: "absolute",
    marginTop: 50,
    width: 370,
    height: 500,
    resizeMode: "contain",
    alignItems: "center",
  },
});
