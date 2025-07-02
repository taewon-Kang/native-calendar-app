import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { getCalendar, isSameDate, isSameMonth } from "../../utils/calendar";
import CalendarCell from "../../components/calendar/CalendarCell";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { CalendarCellType, CalendarMode } from "../../types/calendar.types";

export default function CalendarScreen() {
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [calendarMode, setCalendarMode] = useState<CalendarMode>("month");
  const [viewDate, setViewDate] = useState<Date>(today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const calendarRows = useMemo(() => getCalendar(year, month), [year, month]);

  useEffect(() => {
    if (calendarMode === "week") {
      if (isSameMonth(selectedDate, viewDate)) {
        const rows = getCalendar(viewDate.getFullYear(), viewDate.getMonth());
        const week = rows.find((week) =>
          week.some((cell) => isSameDate(cell.date, selectedDate))
        );
        if (week) {
          const midDate = week[Math.floor(week.length / 2)].date;
          setViewDate(midDate);
        }
      } else {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), 1));
      }
    }
  }, [calendarMode]);

  const weekRows = useMemo(() => {
    const week = calendarRows.find((week) =>
      week.some((cell) => isSameDate(cell.date, viewDate))
    );
    return week ? [week] : [calendarRows[0]];
  }, [calendarRows, viewDate]);

  const handleDatePress = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const moveMonth = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setViewDate(newDate);
  };

  const moveWeek = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setDate(newDate.getDate() + offset * 7);
    setViewDate(newDate);
  };

  const panGesture = Gesture.Pan()
    .onEnd((e) => {
      const { translationY, translationX } = e;
      if (translationY > 50) {
        setCalendarMode("month");
      } else if (translationY < -50) {
        setCalendarMode("week");
      } else if (translationX > 50) {
        if (calendarMode === "month") moveMonth(-1);
        else moveWeek(-1);
      } else if (translationX < -50) {
        if (calendarMode === "month") moveMonth(1);
        else moveWeek(1);
      }
    })
    .runOnJS(true);

  return (
    <View style={styles.container}>
      <CalendarHeader
        year={viewDate.getFullYear()}
        month={viewDate.getMonth()}
        onPrev={() => moveMonth(-1)}
        onNext={() => moveMonth(1)}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View>
          <View style={styles.dateGrid}>
            {(calendarMode === "month" ? calendarRows : weekRows).map(
              (week, rowIdx) => (
                <View key={rowIdx} style={styles.weekRow}>
                  {week.map((cell: CalendarCellType, colIdx: number) => (
                    <CalendarCell
                      key={colIdx}
                      date={cell.date}
                      isCurrentMonth={isSameMonth(cell.date, viewDate)}
                      isSelected={isSameDate(cell.date, selectedDate)}
                      onPress={() => handleDatePress(cell.date)}
                    />
                  ))}
                </View>
              )
            )}
          </View>
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
