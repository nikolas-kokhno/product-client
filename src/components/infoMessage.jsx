import { message } from "antd";

export const InfoMessage = (type, messageData) => {
  return message[type](messageData);
};
