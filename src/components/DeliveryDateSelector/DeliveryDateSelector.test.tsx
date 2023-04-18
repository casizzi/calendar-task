import { fireEvent, render } from "@testing-library/react";
import DeliveryDateSelector from "./DeliveryDateSelector";

describe("render Calendar onClick event", () => {
  const { getByTestId } = render(<DeliveryDateSelector />);
  test("render Calendar to DOM onClick of DeliveryDateCard", () => {
    fireEvent(getByTestId("delivery-date-card"), new MouseEvent("click", { bubbles: true, cancelable: true }));
    expect(getByTestId("calendar")).toBeInTheDocument();
  });
});
