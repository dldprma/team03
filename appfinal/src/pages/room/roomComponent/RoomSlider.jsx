import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import RoomDisplay from "./RoomDisplay";
import { eachDayOfInterval, format, subDays } from "date-fns";

const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SliderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 한 번에 2개만 표시 */
  gap: 20px;
  width: 90%;
  max-width: 1500px;
`;

const ArrowBtnWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  left: -280px;
  display: flex;
  gap: 100px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #049dd9;
  &:disabled {
    color: #ccc;
    cursor: default;
  }
`;

const RoomSlider = ({ rooms, roomBlocked, reservationDate }) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleRooms = 2; // ✅ 최대 2개만 표시

  const handleNext = () => {
    if (startIndex + visibleRooms < rooms.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <SliderWrapper>
      <ArrowBtnWrapper>
        <ArrowButton onClick={handlePrev} disabled={startIndex === 0}>
          <IoIosArrowBack />
        </ArrowButton>

        <ArrowButton
          onClick={handleNext}
          disabled={startIndex + visibleRooms >= rooms.length}
        >
          <IoIosArrowForward />
        </ArrowButton>
      </ArrowBtnWrapper>
      <SliderContainer>
        {rooms.slice(startIndex, startIndex + visibleRooms).map((room) => {
          const blockedDates = roomBlocked[room.no] || [];

          const [checkIn, checkOut] = reservationDate || [];

          let isAvailable = true;

          if (checkIn && checkOut) {
            const selectedRange = eachDayOfInterval({
              start: new Date(checkIn),
              end: subDays(new Date(checkOut), 1),
            });

            const selectedDates = selectedRange.map((date) =>
              format(date, "yyyy-MM-dd")
            );

            const isBlocked = selectedDates.some((date) =>
              blockedDates.includes(date)
            );

            isAvailable = !isBlocked;
          }
          return (
            <RoomDisplay
              key={room.no}
              img={room.filePath}
              title={room.name}
              standard={room.standardGuest}
              max={room.maxGuest}
              price={room.price}
              url={`/findstay/staybooking/${room.no}`}
              isAvailable={isAvailable}
            />
          );
        })}
      </SliderContainer>
    </SliderWrapper>
  );
};

export default RoomSlider;
