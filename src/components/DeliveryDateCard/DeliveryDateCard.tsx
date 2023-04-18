import { FC, Dispatch, SetStateAction } from "react";
import "./DeliveryDateCard.sass";
import { useNextAvailableDeliveryDate } from "../../hooks/useNextAvailableDeliveryDate";
import { LocaleConst, TodaysDateConst } from "../Calendar/constants";

interface DeliveryDateCardProps {
  deliveryDate: Date;
  setShowCalendar: Dispatch<SetStateAction<boolean>>;
}

const DeliveryDateCard: FC<DeliveryDateCardProps> = ({ deliveryDate, setShowCalendar }: DeliveryDateCardProps) => {
  const nextAvailableDeliveryDate = useNextAvailableDeliveryDate(TodaysDateConst);
  const deliveryDateIsNextAvailableDeliveryDate = deliveryDate.getDate() === nextAvailableDeliveryDate.getDate();

  const deliveryDateWeekday = deliveryDate.toLocaleDateString(LocaleConst, { weekday: "short" });
  const deliveryDateMonth = deliveryDate.toLocaleDateString(LocaleConst, { month: "short" });
  const deliveryDateDayNum = deliveryDate.toLocaleDateString(LocaleConst, { day: "numeric" });

  return (
    <div className="delivery-date-card" onClick={() => setShowCalendar(true)} data-testid="delivery-date-card">
      <div className="delivery-date-card__info">
        <p>
          <small>{`${deliveryDateWeekday} ${deliveryDateMonth} ${deliveryDateDayNum}`}</small>
        </p>
        {deliveryDateIsNextAvailableDeliveryDate && <span className="delivery-date-card__earliest-delivery">Earliest delivery</span>}
      </div>
      <div className="delivery-date-card__change-date">
        <span className="delivery-date-card__calendar">{deliveryDateDayNum}</span>
        <span className="delivery-date-card__change-date__copy">Change &gt;</span>
      </div>
    </div>
  );
};

export default DeliveryDateCard;
