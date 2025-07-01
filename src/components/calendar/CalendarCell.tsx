import React from "react";
import { Text, StyleSheet } from "react-native";

interface CalendarCellProps {
  day: number;
  isCurrentMonth: boolean;
  isSunday: boolean;
  isSaturday: boolean;
  isSelected?: boolean;
}

export default function CalendarCell({
  day,
  isCurrentMonth,
  isSunday,
  isSaturday,
}: CalendarCellProps) {
  const getTextStyle = () => {
    if (!isCurrentMonth) return [styles.dateCell, styles.notCurrentMonth];
    if (isSunday) return [styles.dateCell, styles.sunday];
    if (isSaturday) return [styles.dateCell, styles.saturday];
    return styles.dateCell;
  };

  return <Text style={getTextStyle()}>{day}</Text>;
}

const styles = StyleSheet.create({
  dateCell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 12,
    fontSize: 16,
    color: "rgba(50, 50, 50, 0.6)",
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
