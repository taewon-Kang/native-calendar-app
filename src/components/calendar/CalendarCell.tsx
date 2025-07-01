import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CalendarCellProps {
  day: number;
  isCurrentMonth: boolean;
  isSunday: boolean;
  isSaturday: boolean;
  isSelected?: boolean;
}

const CIRCLE_SIZE = 40;
const BORDER_RADIUS = CIRCLE_SIZE / 2;
const FONT_SIZE = 14;

export default function CalendarCell({
  day,
  isCurrentMonth,
  isSunday,
  isSaturday,
  isSelected,
}: CalendarCellProps) {
  const getTextColorStyle = () => {
    if (!isCurrentMonth) return styles.notCurrentMonth;
    if (isSunday) return styles.sunday;
    if (isSaturday) return styles.saturday;
    return styles.defaultDay;
  };

  return (
    <View style={styles.cellWrapper}>
      <View style={[isSelected && styles.circle]}>
        <Text style={[styles.baseText, getTextColorStyle()]}>{day}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: FONT_SIZE,
  },
  cellWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: BORDER_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0EB4FC",
  },
  defaultDay: {
    color: "rgba(50, 50, 50, 0.9)",
  },
  notCurrentMonth: {
    color: "rgba(155, 155, 155, 0.6)",
  },
  sunday: {
    color: "rgba(255, 0, 0, 0.6)",
  },
  saturday: {
    color: "rgba(0, 0, 255, 0.6)",
  },
});
