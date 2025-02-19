import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../../../components/table/Table";

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

const StayEnrollReq = () => {
  const [dataArr, setDataArr] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/admin/stayEnrollReqList", {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data);
      });
  }, []);
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="300px">숙소 입접 요청 목록</StatusSpan>
        </div>
        <div>
          <Table
            th1="이름"
            th2="이메일"
            th3="전화번호"
            th4="숙소명"
            dataArr={dataArr}
          />
        </div>
      </MainDiv>
    </>
  );
};

export default StayEnrollReq;
