import { FC, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Modal from "../Modal/Modal";
import "./DeliveryDateSelector.sass";
import DeliveryDateCard from "../DeliveryDateCard/DeliveryDateCard";
import Calendar from "../Calendar/Calendar";
import { useNextAvailableDeliveryDate } from "../../hooks/useNextAvailableDeliveryDate";
import { NonDeliveryDays } from "./constants";
import { TodaysDateConst } from "../Calendar/constants";

const DeliveryDateSelector: FC = () => {
  const nextAvailableDeliveryDate = useNextAvailableDeliveryDate(TodaysDateConst);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<Date>(nextAvailableDeliveryDate);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="delivery-date-selector">
      <h3>Choose your delivery day</h3>
      <span className="delivery-date-selector__fee-info">Delivery is always free</span>

      <DeliveryDateCard deliveryDate={selectedDeliveryDate} setShowCalendar={setShowCalendar} />

      <CSSTransition in={showCalendar} classNames="appear" unmountOnExit timeout={0}>
        <Modal>
          <Calendar
            date={selectedDeliveryDate}
            setDate={setSelectedDeliveryDate}
            invalidBeforeDate={nextAvailableDeliveryDate}
            disableWeekdays={NonDeliveryDays}
            setShowCalendar={setShowCalendar}
          />
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default DeliveryDateSelector;
