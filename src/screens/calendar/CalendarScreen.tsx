import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { getCalendar } from "../../utils/calendar";
import CalendarCell from "../../components/calendar/CalendarCell";
import CalendarHeader from "../../components/calendar/CalendarHeader";

export default function CalendarScreen() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  );

  const calendarRows = getCalendar(year, month);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const handleSelectDate = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    setSelectedDate(`${year}-${month + 1}-${day}`);
  };

  return (
    <View style={styles.container}>
      <CalendarHeader
        year={year}
        month={month}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />
      <View style={styles.dateGrid}>
        {calendarRows.map((week, rowIdx) => (
          <View key={rowIdx} style={styles.weekRow}>
            {week.map((cell, colIdx) => {
              const isSelected =
                cell.isCurrentMonth &&
                selectedDate === `${year}-${month + 1}-${cell.day}`;
              return (
                <CalendarCell
                  key={colIdx}
                  day={cell.day}
                  isCurrentMonth={cell.isCurrentMonth}
                  isSunday={colIdx === 0}
                  isSaturday={colIdx === 6}
                  isSelected={isSelected}
                  onPress={() =>
                    handleSelectDate(cell.day, cell.isCurrentMonth)
                  }
                />
              );
            })}
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
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateGrid: {
    marginTop: 12,
  },
});
