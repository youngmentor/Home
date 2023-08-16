import axios from 'axios';
// const { VITE_TOKEN } = import.meta.env;
const { VITE_ENDPOINT } = import.meta.env;
export const fetchSearchResults = async (data: string | undefined) => {
  return await axios.post(`${VITE_ENDPOINT}/hotel/search`, { searchValue: data });
};
export const verifyAdmin = async (data: string | undefined) => {
  // console.log(data)
  return await axios.patch(`${VITE_ENDPOINT}/manager/verify/${data}`);
};
export const verifyUser = async (data: any) => {
  const { id } = data
  return await axios.patch(`${VITE_ENDPOINT}/user/verify/${id}`);
};
export const adminForgotPassword = async (email: string) => {
  return await axios.post(`${VITE_ENDPOINT}/manager/forgotten`, { email })
};
export const resetAdminPassword = async (data: { id: string | undefined, password: string }) => {
  const { id, password } = data
  return await axios.patch(`${VITE_ENDPOINT}/manager/change/${id}`, { password: password })
};
export const adminSignUp = async (data: any) => {
  // console.log(data)
  return await axios.post(`${VITE_ENDPOINT}/manager/register`, data)
};
export const userSignUp = async (data: any) => {
  console.log(data)
  return await axios.post(`${VITE_ENDPOINT}/user/register`, data)
};
export const adminLogin = async (data: any) => {
  // console.log(data)
  return await axios.post(`${VITE_ENDPOINT}/manager/login`, data)
}
export const userLogin = async (data: any) => {
  return await axios.post(`${VITE_ENDPOINT}//user/login`, data)
}
export const addHotel = async (data: any) => {
  console.log(data)
  return await axios.post(`${VITE_ENDPOINT}/hotel/register/${data?.id}`, data?.formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
};
export const addRoom = async (data: any) => {
  console.log(data)
  return await axios.post(`${VITE_ENDPOINT}/room/register/${data?.adminId}/${data?.hotelId}`, data?.formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
};
export const logOutAdmin = async (id: number) => {
  console.log(typeof id)
  return await axios.post(`${VITE_ENDPOINT}/manager/logout/${id}`)
}