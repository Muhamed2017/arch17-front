import { Modal } from "antd";

const SuccessModal = (message) => {
 Modal.success({
  content: message,
  icon: null,
  okButtonProps: { hidden: true },
  centered: true,
  closable: true,
  width: 480,
 });
};

export default SuccessModal;
