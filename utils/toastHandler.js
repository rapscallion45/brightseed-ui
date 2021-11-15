import { toast } from 'react-toastify';

const toastHandler = (variant, message) => {
  switch (variant) {
    case 'failure':
      toast.error(message, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      break;
    default:
    case 'success':
      toast.info(message, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      break;
  }
};
export default toastHandler;
