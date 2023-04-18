import { WeekdayNamesEnum } from "./enums";

const TodaysDateConst = new Date();
const NumDaysInWeekConst: number = 7;
const WeekdayNamesConst: WeekdayNamesEnum[] = Object.values(WeekdayNamesEnum).filter((value) => isNaN(Number(value)));
const LocaleConst = "en-GB";

export { TodaysDateConst, NumDaysInWeekConst, WeekdayNamesConst, LocaleConst };
