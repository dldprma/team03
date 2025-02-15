import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const DataDiv = styled.div`
  width: 850px;
  height: 300px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 400px 450px;
  margin-top: 50px;
  margin-left: 50px;
  margin-bottom: 30px;
  border: none;
`;

const DataArea = styled.div`
  background-color: transparent;
  display: grid;
  grid-template-rows: 40px 30px 20px 20px 145px 45px;
  color: black;
  align-items: center;
`;

const TextDiv = styled.div`
  font-size: ${(props) => {
    return props.size;
  }};
  font-weight: ${(props) => {
    return props.weight;
  }};
  cursor: pointer;
`;

const ImgTag = styled.img`
  width: 450px;
  height: 300px;
`;

const PriceDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > div:nth-child(2) {
    text-align: right;
    padding-right: 60px;
  }
`;

const ReservationCard = ({ hideDate }) => {
  const navi = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  function movePath() {
    // 현재 경로가 "/hostMenu/spaceReserv"이면 공간 예약 정보로 이동
    const isSpaceReserv = location.pathname.includes("spaceReserv");

    const detailPath = isSpaceReserv ? "spacedetail" : "staydetail";

    // 현재 경로의 끝에 '/'이 붙어 있다면 제거
    const basePath = location.pathname.replace(/\/$/, "");

    // 이동할 경로 생성 후 중복된 슬래시 제거
    const finalPath = `${basePath}/${detailPath}`.replace(/([^:]\/)\/+/g, "$1");

    navi(finalPath);
  }

  return (
    <>
      <DataDiv>
        <DataArea>
          <TextDiv size="15px">예약 확정</TextDiv>
          <TextDiv size="25px" weight="600">
            봉전다락
          </TextDiv>
          <TextDiv size="15px">2025.02.18 - 2025.02.19</TextDiv>
          <TextDiv size="13px">봉전다락 / 성인 2명</TextDiv>
          <div></div>
          <PriceDiv>
            {!hideDate && (
              <TextDiv onClick={movePath} size="15px">
                예약 상세 확인
              </TextDiv>
            )}
            <TextDiv size="20px">₩300,000</TextDiv>
          </PriceDiv>
        </DataArea>
        <ImgTag src="data:image/jpeg;base64,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" />
      </DataDiv>
    </>
  );
};

export default ReservationCard;
