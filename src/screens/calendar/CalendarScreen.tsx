import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getCalendar } from "../../utils/calendar";
import CalendarCell from "../../components/calendar/CalendarCell";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const calendarRows = getCalendar(year, month);

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {today.toLocaleString("default", { month: "long" })} {year}
      </Text>
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
      <View style={styles.dateGrid}>
        {calendarRows.map((week, rowIdx) => (
          <View key={rowIdx} style={styles.weekRow}>
            {week.map((cell, colIdx) => (
              <CalendarCell
                key={colIdx}
                day={cell.day}
                isCurrentMonth={cell.isCurrentMonth}
                isSunday={colIdx === 0}
                isSaturday={colIdx === 6}
              />
            ))}
          </View>
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
    color: "rgba(50, 50, 50, 0.6)",
  },
  sunday: {
    color: "rgba(255, 0, 0, 0.6)",
  },
  saturday: {
    color: "rgba(0, 0, 255, 0.6)",
  },
  dateGrid: {
    marginTop: 12,
  },
});
