import { LeadDaysConst } from "../components/DeliveryDateSelector/constants";

export const useNextAvailableDeliveryDate = (date: Date) => {
  let nextAvailableDeliveryDate = new Date(date);
  nextAvailableDeliveryDate.setDate(nextAvailableDeliveryDate.getDate() + LeadDaysConst);
  return nextAvailableDeliveryDate;
};
