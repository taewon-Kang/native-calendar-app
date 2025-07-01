import { CalendarCell } from "../types/calendar.types";

export const getCalendar = (year: number, month: number): CalendarCell[][] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  const calendarDays: CalendarCell[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevLastDay.getDate() - i,
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: true });
  }

  const totalCells = calendarDays.length > 35 ? 42 : 35;
  const notCurrentCnt = totalCells - calendarDays.length;

  for (let i = 1; i <= notCurrentCnt; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false });
  }

  const rows: CalendarCell[][] = [];
  for (let i = 0; i < totalCells; i += 7) {
    rows.push(calendarDays.slice(i, i + 7));
  }

  return rows;
};
