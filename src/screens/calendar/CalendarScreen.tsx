import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getTextStyle = (day: string) => {
  if (day === "Sun") return [styles.weekDay, styles.sunday];
  if (day === "Sat") return [styles.weekDay, styles.saturday];
  return styles.weekDay;
};

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>July 2022</Text>
      <View style={styles.weekRow}>
        {DAYS.map((day) => (
          <Text key={day} style={getTextStyle(day)}>
            {day}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "rgba(155, 155, 155, 0.6)",
  },
  sunday: {
    color: "rgba(255, 0, 0, 0.6)",
  },
  saturday: {
    color: "rgba(0, 0, 255, 0.6)",
  },
});
