const { VITE_TOKEN } = import.meta.env;
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { DatePickerInput } from '@mantine/dates';
import { useMutation, useQuery } from '@tanstack/react-query'
import './Detail.css'
import { bookRoom } from "../APIS/Mutation";
import { getOneRoom, getUser } from '../APIS/query'
import { Visitor } from "../APIS/TypeChecks";
import ButtonLoading from "../../ButtonLoader/ButtonLoader";
import Swal from "sweetalert2";
const Detail: React.FC = () => {
  const navigate = useNavigate()
  const { roomId } = useParams()
  const { data } = useQuery(['getoneroom', roomId], getOneRoom, {
  })

  const [visitorType, setVisitorType] = useState<Visitor>({
    adult: '0',
    children: '0',
    infant: '0'
  })
  //  console.log(data?.data?.data)
  const handleVisitorType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisitorType({
      ...visitorType,
      [e.target.name]: e.target.value
    });
  };
  const oneRoomDetail = data?.data?.data
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setValue(dates);
  };
  const checkInDate = value[0];
  const checkOutDate = value[1];
  const numberOfNights = checkInDate && checkOutDate
    ? Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const nightlyPrice = oneRoomDetail?.price || 0;
  const updatedTotalPrice = numberOfNights * nightlyPrice;
  const {
    data: userData,
  } = useQuery(["getuser"], getUser, {
    enabled: !!localStorage.getItem(VITE_TOKEN),
    refetchOnWindowFocus: false,
    onSuccess: () => {
    },
    onError: () => {

    },
  });
  const userId: any = userData?.data?.data.id

  const { mutate, isLoading } = useMutation(['bookroom'], bookRoom, {
    onSuccess: (data) => {
      console.log(data)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data?.data?.data?.message,
        showConfirmButton: false,
        timer: 4000
      })
      setTimeout(() => {
        navigate('/')
      })
    },
    onError: () => {
    },
  });

  const handleBookRoom = () => {
    console.log('clicked')
    if (checkInDate && checkOutDate) {
      const bookingData = {
        checkIn: checkInDate.toISOString().split('T')[0],
        checkOut: checkOutDate.toISOString().split('T')[0],
        price: updatedTotalPrice,
        adult: visitorType.adult,
        children: visitorType.children,
        infant: visitorType.infant
      };
      console.log(checkInDate)
      console.log(checkOutDate)
      mutate({ bookingData, userId: userId, roomId: roomId });
      console.log(bookingData)
    }
  };

  // console.log(userValue)
  return (
    <div className="DetailsMainPages">
      <div className="DetailsMainWrap">
        <div className="Deatails_Left_Page">
          <img src={oneRoomDetail?.image} className="DetailsImage" />
        </div>
        <div className="Deatails_Right_Page">
          <div className="DetailsDetails">
            <p>Room Description: {oneRoomDetail?.roomDescription}</p>
            <p>Availability: {oneRoomDetail?.booked ? "booked" : "Available"}</p>
            <p> Room Number: {oneRoomDetail?.roomNumber}</p>
            <p>Room Price: ${oneRoomDetail?.price}</p>
            <div className="DetailsDateSelector">
              <DatePickerInput
                type="range"
                label="Slect a stay dates range"
                placeholder="Pick dates range"
                value={value}
                onChange={handleDateChange}
                // mx="auto"
                maw={260}
              />
            </div>
            <label>
              <p style={{ color: 'black' }}>Adult</p>
              <input
                type="number"
                placeholder="0"
                onChange={handleVisitorType}
              />
            </label>
            <label>
              <p style={{ color: 'black' }}>children</p>
              <input
                type="number"
                placeholder="0"
                onChange={handleVisitorType}
              />
            </label>
            <label>
              <p style={{ color: 'black' }}>children</p>
              <input
                type="number"
                placeholder="0"
                onChange={handleVisitorType}
              />
            </label>
            <div className="DetailsPaymentInfo1">
              <p>Total Price: ${updatedTotalPrice}</p>
              <button className="DetailMinusBttn" onClick={handleBookRoom}>pay</button>
            </div>
          </div>
          <div className="DetailsPaymentInfo2">
            <p>Total Price: ${updatedTotalPrice}</p>
            <button className="DetailMinusBttn" onClick={handleBookRoom}>{isLoading ? <ButtonLoading /> : 'pay'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Detail