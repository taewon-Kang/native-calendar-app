import { CalendarCellType } from "../types/calendar.types";

export const getCalendar = (
  year: number,
  month: number
): CalendarCellType[][] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevMonthLastDay = new Date(year, month, 0);

  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const prevMonthDays = prevMonthLastDay.getDate();

  const calendarDays: CalendarCellType[] = [];

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthDays - i);
    calendarDays.push({
      date,
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  const totalCells = calendarDays.length > 35 ? 42 : 35;
  const nextDaysNeeded = totalCells - calendarDays.length;
  for (let i = 1; i <= nextDaysNeeded; i++) {
    calendarDays.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  const rows: CalendarCellType[][] = [];
  for (let i = 0; i < 42; i += 7) {
    rows.push(calendarDays.slice(i, i + 7));
  }

  return rows;
};

export const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isSameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
