import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LibraryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>라이브러리 화면입니다.</Text>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18 },
});
