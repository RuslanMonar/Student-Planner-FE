import { DefaultToast } from "react-toast-notifications";

export const ErrorNotification = ({ children, ...props }) => (
  <DefaultToast  {...props}>
    <span style = {{fontWeight:'bold',fontFamily:"16px"}}>{children.error}</span>
    <span>{children.message}</span>
  </DefaultToast>
);