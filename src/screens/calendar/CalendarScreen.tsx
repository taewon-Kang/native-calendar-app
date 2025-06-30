import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>캘린더 화면입니다.</Text>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18 },
});
