import axiosConfig from '../axiosConfig';


export const apiCreateRental = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'post',
        url: '/api/v1/rental/create',
        data,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
