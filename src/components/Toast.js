import { notification } from 'antd';

export const messageError = (Message = "Error", Title = "Error", Duration=5) => {
    notification.error({
      message: Title,
      description: Message,
      duration: Duration
    });
  };