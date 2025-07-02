import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { getCalendar, isSameDate, isSameMonth } from "../../utils/calendar";
import CalendarCell from "../../components/calendar/CalendarCell";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { CalendarCellType, CalendarMode } from "../../types/calendar.types";

export default function CalendarScreen() {
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [calendarMode, setCalendarMode] = useState<CalendarMode>("month");
  const [viewDate, setViewDate] = useState<Date>(today);
  const [direction, setDirection] = useState<"left" | "right" | "up" | "down">(
    "left"
  );
  const [initRender, setInitRender] = useState(true);
  const translate = useSharedValue(0);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const calendarRows = useMemo(() => getCalendar(year, month), [year, month]);

  useEffect(() => {
    if (initRender) {
      setInitRender(false);
      return;
    }

    const offset = 100;
    translate.value =
      direction === "left"
        ? offset
        : direction === "right"
        ? -offset
        : direction === "up"
        ? offset
        : 0;

    translate.value = withTiming(0, { duration: 250 });
  }, [calendarMode, viewDate]);

  const animatedStyle = useAnimatedStyle(() => {
    const axis =
      direction === "left" || direction === "right"
        ? "translateX"
        : "translateY";
    return {
      transform: [{ [axis]: translate.value }] as any,
    };
  });

  const getWeekRows = () => {
    const week = calendarRows.find((week) =>
      week.some((cell) => isSameDate(cell.date, viewDate))
    );
    return week ? [week] : [calendarRows[0]];
  };

  const handleDatePress = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const moveDate = (offset: number, isMonth: boolean) => {
    const newDate = new Date(viewDate);
    const newDirection = offset > 0 ? "left" : "right";
    setDirection(newDirection);
    if (isMonth) newDate.setMonth(viewDate.getMonth() + offset);
    else newDate.setDate(viewDate.getDate() + offset * 7);
    setViewDate(newDate);
  };

  const changeMode = (mode: CalendarMode) => {
    setDirection(mode === "month" ? "down" : "up");
    setCalendarMode(mode);
  };

  const panGesture = Gesture.Pan()
    .onEnd((e) => {
      const { translationX, translationY } = e;
      if (translationY > 50) changeMode("month");
      else if (translationY < -50) changeMode("week");
      else if (translationX > 50) moveDate(-1, calendarMode === "month");
      else if (translationX < -50) moveDate(1, calendarMode === "month");
    })
    .runOnJS(true);

  const rowsToRender = calendarMode === "month" ? calendarRows : getWeekRows();

  return (
    <View style={styles.container}>
      <CalendarHeader
        year={year}
        month={month}
        onPrev={() => moveDate(-1, calendarMode === "month")}
        onNext={() => moveDate(1, calendarMode === "month")}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.dateGrid, animatedStyle]}>
          {rowsToRender.map((week, rowIdx) => (
            <View key={rowIdx} style={styles.weekRow}>
              {week.map((cell: CalendarCellType) => (
                <CalendarCell
                  key={cell.date.toISOString()}
                  date={cell.date}
                  isCurrentMonth={isSameMonth(cell.date, viewDate)}
                  isSelected={isSameDate(cell.date, selectedDate)}
                  onPress={() => handleDatePress(cell.date)}
                />
              ))}
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateGrid: {
    marginTop: 12,
  },
});
