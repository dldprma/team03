import React from "react";
import styled from "styled-components";
import ReservationCard from "../../../components/reservationInfo/ReservationCard";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const StatusSpan = styled.span`
  font-size: 25px;
  margin-left: ${(props) => {
    return props.left;
  }};
`;

const BlankDiv = styled.div`
  height: 200px;
`;

//예약 확정/취소 List로 보내는 값 변경경
const SpaceResrv = () => {
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="280px">예약 확정</StatusSpan>
          <StatusSpan left="20px"> | </StatusSpan>
          <StatusSpan left="20px">예약 취소</StatusSpan>
        </div>
        <div>
          {/* map으로 반복 돌리기 / vo 보내기*/}
          <ReservationCard />
          <ReservationCard />
          <ReservationCard />
        </div>
      </MainDiv>
      <BlankDiv />
    </>
  );
};

export default SpaceResrv;
