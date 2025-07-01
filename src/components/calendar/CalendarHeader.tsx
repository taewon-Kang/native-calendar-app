import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface HeaderProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
}: HeaderProps) {
  return (
    <View>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={onPrev}>
          <Text style={styles.navButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {new Date(year, month).toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </Text>
        <TouchableOpacity onPress={onNext}>
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekRow}>
        {DAYS.map((day) => (
          <Text
            key={day}
            style={[
              styles.weekDay,
              day === "Sun" && styles.sunday,
              day === "Sat" && styles.saturday,
            ]}
          >
            {day}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  navButton: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
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
    color: "rgba(50, 50, 50, 0.6)",
  },
  sunday: {
    color: "rgba(255, 0, 0, 0.6)",
  },
  saturday: {
    color: "rgba(0, 0, 255, 0.6)",
  },
});
