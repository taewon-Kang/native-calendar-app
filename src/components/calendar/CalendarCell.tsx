import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

interface CalendarCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const CIRCLE_SIZE = 40;
const BORDER_RADIUS = CIRCLE_SIZE / 2;
const FONT_SIZE = 14;

export default function CalendarCell({
  date,
  isCurrentMonth,
  isSelected,
  onPress,
}: CalendarCellProps) {
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  const getTextColorStyle = () => {
    if (!isCurrentMonth) return styles.notCurrentMonth;
    if (dayOfWeek === 0) return styles.sunday;
    if (dayOfWeek === 6) return styles.saturday;
    return styles.defaultDay;
  };

  return (
    <View style={styles.cellWrapper}>
      <TouchableOpacity onPress={onPress} disabled={!onPress}>
        <View style={[styles.dayContainer, isSelected && styles.selected]}>
          <Text style={[styles.baseText, getTextColorStyle()]}>{day}</Text>
        </View>
      </TouchableOpacity>
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
  dayContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    borderRadius: BORDER_RADIUS,
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
