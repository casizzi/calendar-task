import ReactDOM from "react-dom";
import { FC, ReactElement } from "react";
import "./Modal.sass";

interface ModalProps {
  children: ReactElement;
}

const Modal: FC<ModalProps> = ({ children }: ModalProps) => ReactDOM.createPortal(<div className="modal">{children}</div>, document.body);

export default Modal;
