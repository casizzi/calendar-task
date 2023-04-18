import { Dispatch, FC, SetStateAction, useState } from "react";
import "./Calendar.sass";
import { useCalendarEntries } from "../../hooks/useCalendarEntries";
import { TodaysDateConst, LocaleConst, WeekdayNamesConst } from "./constants";
import { WeekdayNamesEnum } from "./enums";

interface CalendarProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  invalidBeforeDate?: Date;
  disableWeekdays?: WeekdayNamesEnum[];
  setShowCalendar: Dispatch<SetStateAction<boolean>>;
}

const Calendar: FC<CalendarProps> = ({ date, setDate, invalidBeforeDate, disableWeekdays, setShowCalendar }: CalendarProps) => {
  const [selectedMonthIndex] = useState(TodaysDateConst.getMonth());
  const calendarEntries = useCalendarEntries(selectedMonthIndex);
  const [newSelectedDate, setNewSelectedDate] = useState(date);

  const renderCalendarMonthYearTitle = `${TodaysDateConst.toLocaleDateString(LocaleConst, {
    month: "long",
  })} ${TodaysDateConst.toLocaleDateString(LocaleConst, {
    year: "numeric",
  })}`;

  const renderCalendarWeekDayInitials = WeekdayNamesConst.map((weekday: string) => (
    <li key={weekday} className="calendar__day">
      {weekday[0]}
    </li>
  ));

  const renderCalendarEntries = calendarEntries.map((date: Date | null, index: number) => {
    let isDateActive: boolean;
    let isDateSelected: boolean;

    const dateAsNumber = date?.setHours(0, 0, 0, 0);
    const newSelectedDateAsNumber = newSelectedDate.setHours(0, 0, 0, 0);
    const invalidBeforeDateAsNumber = invalidBeforeDate?.setHours(0, 0, 0, 0);

    if (date) {
      const isDateInvalid = invalidBeforeDateAsNumber && dateAsNumber ? dateAsNumber < invalidBeforeDateAsNumber : false;
      const isWeekdayDisabled = disableWeekdays
        ? disableWeekdays?.includes(date.toLocaleDateString(LocaleConst, { weekday: "long" }) as WeekdayNamesEnum)
        : false;

      isDateInvalid ? (isDateActive = false) : isWeekdayDisabled ? (isDateActive = false) : (isDateActive = true);
      isDateSelected = dateAsNumber === newSelectedDateAsNumber;
    } else {
      isDateActive = false;
      isDateSelected = false;
    }

    return (
      <li
        key={`calendarGridItem${index}`}
        className={`calendar__date calendar__date--${isDateSelected ? "selected" : isDateActive ? "available" : "unavailable"}`}
        onClick={date && isDateActive && !isDateSelected ? () => setNewSelectedDate(date) : undefined}
      >
        {date && date.toLocaleDateString(LocaleConst, { day: "numeric" })}
      </li>
    );
  });

  const handleSubmit = (): void => {
    setDate(newSelectedDate);
    setShowCalendar(false);
  };

  return (
    <div className="calendar-wrapper" data-testid="calendar">
      <div className="calendar">
        <h4 className="calendar__month-name">{renderCalendarMonthYearTitle}</h4>
        <ol className="calendar__grid">{renderCalendarWeekDayInitials}</ol>
        <ol className="calendar__grid">{renderCalendarEntries}</ol>
      </div>

      <div className="calendar__ctas">
        <span className="calendar__ctas__cancel" onClick={() => setShowCalendar(false)} data-testid="calendar-cancel">
          CANCEL, DON'T CHANGE
        </span>
        <button className="button" onClick={() => handleSubmit()}>
          CHANGE DATE
        </button>
      </div>
    </div>
  );
};

export default Calendar;
