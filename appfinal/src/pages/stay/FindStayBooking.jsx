import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PackageDetailCard from "../../components/package/PackageDetailCard";
import Btn from "../../components/Btn";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./stayComponent/noti/Notification";
import RoomDetailCard from "../room/roomComponent/RoomDetailCard";
import { getRoomDetail } from "../../components/service/roomService";
import {
  setRoomData,
  setRoomVo,
  setStayReservationDate,
} from "../../redux/roomSlice";
import { setStayVo } from "../../redux/staySlice";
import Calendar from "../../components/FilterBar/Calendal";
import { FaAngleDown } from "react-icons/fa6";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 60px 700px 150px 150px 150px 100px 1fr;

  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
  }
`;

const DateDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #d9d9d9;

  & > div:nth-child(1) {
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 500px 600px 500px;
  }

  & > div:nth-child(1) > div:nth-child(1) {
    font-weight: 600;
    font-size: 25px;
  }

  & > div:nth-child(1) > div:nth-child(3) {
    display: flex;
    place-content: end;
  }
`;

const CalendarLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  & > div:nth-child(1) {
    font-size: 20px;
  }
`;

const ThirdDiv = styled.div`
  border-bottom: 2px solid #d9d9d9;
`;

const ContentLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  border-bottom: 2px solid #d9d9d9;
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 24px;
`;

const IconLayoutDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 155px);
  justify-content: center;
  align-items: center;
`;

const FindStayBooking = () => {
  const { x } = useParams();
  const [selectDate, setSelectDate] = useState("");
  const dispatch = useDispatch();
  const stayVo = useSelector((state) => state.stay);
  const roomVo = useSelector((state) => state.room);
  const reservationDate = useSelector((state) => state.room.reservationDate);
  const navigate = useNavigate();

  const StayBooking = async () => {
    const setRoomDetail = await getRoomDetail(x);
    dispatch(setRoomVo(setRoomDetail));
    dispatch(setStayVo(setRoomDetail));
    dispatch(setRoomData(setRoomDetail));
  };

  const handleDateChange = (selectedDate) => {
    if (
      !reservationDate ||
      reservationDate[0] !== selectedDate[0] ||
      reservationDate[1] !== selectedDate[1]
    ) {
      console.log("📌 변경된 날짜:", selectedDate);
      dispatch(setStayReservationDate(selectedDate)); // Redux 저장
    }
  };

  const handleReservation = () => {
    navigate(`/findstay/reservation/${x}`);
  };

  useEffect(() => {
    StayBooking();
  }, [x]);

  return (
    <Layout>
      <div>
        <h1>BOOKING</h1>
      </div>
      <DateDiv>
        <div>
          <div>{roomVo.stayName}</div>
          <CalendarLayout>
            <Calendar type="text" setDateRange={handleDateChange}>
              <span>
                {reservationDate[0] && reservationDate[1]
                  ? `${reservationDate[0]} ~ ${reservationDate[1]}`
                  : "날짜를 선택해주세요."}
              </span>
            </Calendar>
          </CalendarLayout>
          <div onClick={handleReservation}>
            <Btn w={300} h={50} bg={"#049DD9"} size={"15px"}>
              예약하기
            </Btn>
          </div>
        </div>
      </DateDiv>
      <ThirdDiv>
        <RoomDetailCard
          title={roomVo.name}
          imgPaths={roomVo.attachmentFilePaths}
          price={roomVo.price}
          max={roomVo.maxGuest}
          min={roomVo.standardGuest}
          introduction={roomVo.introduction}
          queen={roomVo.queenSize}
          double={roomVo.doubleSize}
          single={roomVo.singleSize}
        />
      </ThirdDiv>
      <ContentLayout>
        <TitleDiv>FEATURES</TitleDiv>
        <IconLayoutDiv>
          {roomVo.features?.map((vo, idx) => (
            <div key={idx}>{vo}</div>
          ))}
        </IconLayoutDiv>
      </ContentLayout>
      <ContentLayout>
        <TitleDiv>AMENITIES</TitleDiv>
        <IconLayoutDiv>
          <div>세탁기</div>
          <div>건조기</div>
          <div>세탁세제</div>
          <div>헤어드라이기</div>
          <div>샴푸</div>
          <div>컨디셔너</div>
          <div>바디워시</div>
          <div>핸드워시</div>
          <div>타월</div>
          <div>일회용 칫솔</div>
          <div>일회용 치약</div>
          <div>빅테이블</div>
          <div>냉장고</div>
          <div>인덕션(하이라이트)</div>
          <div>전자레인지</div>
          <div>전기포트</div>
          <div>토스터기</div>
          <div>캡슐커피머신</div>
          <div>와인오프너</div>
          <div>와인잔</div>
          <div>조미료</div>
          <div>턴테이블</div>
          <div>스피커</div>
          <div>빔프로젝터</div>
        </IconLayoutDiv>
      </ContentLayout>
      <ContentLayout>
        <TitleDiv>ADD-ON SERVICES</TitleDiv>
        <IconLayoutDiv>
          <div></div>
        </IconLayoutDiv>
      </ContentLayout>
      <div></div>
      <Notification x={x} rooms={roomVo} stay={stayVo} />
    </Layout>
  );
};

export default FindStayBooking;
