import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { getCalendar, isSameDate } from "../../utils/calendar";
import CalendarCell from "../../components/calendar/CalendarCell";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import { CalendarCellType } from "../../types/calendar.types";

export default function CalendarScreen() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(today);

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

  const handleSelectDate = (date: Date, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    setSelectedDate(date);
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
            {week.map((cell: CalendarCellType, colIdx: number) => {
              return (
                <CalendarCell
                  key={colIdx}
                  date={cell.date}
                  isCurrentMonth={cell.isCurrentMonth}
                  isSelected={
                    cell.isCurrentMonth && isSameDate(cell.date, selectedDate)
                  }
                  onPress={() =>
                    handleSelectDate(cell.date, cell.isCurrentMonth)
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
