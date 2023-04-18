import { useEffect, useState } from "react";
import { WeekdayNamesConst, NumDaysInWeekConst, LocaleConst, TodaysDateConst } from "../components/Calendar/constants";
import { WeekdayNamesEnum } from "../components/Calendar/enums";

export const useCalendarEntries = (monthIndex: number) => {
  const [calendarEntries, setCalendarEntries] = useState<(Date | null)[]>([]);

  useEffect(() => {
    TodaysDateConst.setMonth(monthIndex);

    const currentMonth = TodaysDateConst.getMonth();
    const currentYear = TodaysDateConst.getFullYear();
    const numDaysInCurrMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const firstWeekdayOfCurrMonthName = new Date(currentYear, currentMonth, 1).toLocaleDateString(LocaleConst, { weekday: "long" });
    const lastWeekdayOfCurrMonthName = new Date(currentYear, currentMonth, numDaysInCurrMonth).toLocaleDateString(LocaleConst, {
      weekday: "long",
    });

    const numBlankEntriesAtStartMonth = WeekdayNamesConst.indexOf(firstWeekdayOfCurrMonthName as WeekdayNamesEnum);
    const numBlankEntriesAtEndMonth = NumDaysInWeekConst - (WeekdayNamesConst.indexOf(lastWeekdayOfCurrMonthName as WeekdayNamesEnum) + 1);
    const totalNumCalendarEntriesToCreate = numBlankEntriesAtStartMonth + numDaysInCurrMonth + numBlankEntriesAtEndMonth;

    const calendarEntriesArray: (Date | null)[] = [];
    for (let i = 1; i <= totalNumCalendarEntriesToCreate; i++) {
      calendarEntriesArray.push(
        i > numBlankEntriesAtStartMonth && i <= totalNumCalendarEntriesToCreate - numBlankEntriesAtEndMonth
          ? new Date(currentYear, currentMonth, i - numBlankEntriesAtStartMonth)
          : null
      );
    }
    setCalendarEntries(calendarEntriesArray);
  }, [monthIndex]);

  return calendarEntries;
};
