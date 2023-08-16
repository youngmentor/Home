import axios from "axios"
const { VITE_ENDPOINT } = import.meta.env;
const { VITE_TOKEN } = import.meta.env;

export const getAdmin = async () => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.get(`${VITE_ENDPOINT}/manager/${token}`)
};
export const getAllRoom = async () => {
    return await axios.get(``)
};
export const getCheapRoom = async () => {
    return await axios.get(``)
};
export const getLuxuryRoom = async () => {
    return await axios.get(``)
};
export const getAllHotel = async (data: any) => {
    // console.log(data?.queryKey[1])
    return await axios.get(`${VITE_ENDPOINT}/manager/hotels/${data?.queryKey[1]}`)
};
export const getOneHotelRooms = async (data: any)=>{
    // console.log(data?.queryKey[1])
    return await axios.get(`${VITE_ENDPOINT}/hotel/hotels/${data?.queryKey[1]}`)
}