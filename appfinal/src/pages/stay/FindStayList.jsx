import React, { Fragment, useEffect, useState } from "react";
import Display from "../../components/FilterBar/Display";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { RiResetRightFill } from "react-icons/ri";
import StayListCard from "./stayComponent/StayListCard";
import SortDropdown from "../../components/listcomponents/SortDropdown";
import {
  getAttachment,
  getStayListAll,
} from "../../components/service/stayService";
import {
  setReset,
  setSort,
  setStayData,
  setStayLoginMemberNo,
} from "../../redux/staySlice";
import { useDispatch, useSelector } from "react-redux";
import { setResetFilter, setStayReservationDate } from "../../redux/roomSlice";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 100px 100px 80px 100px 1fr;

  & > h1 {
    text-align: center;
  }
`;

const InnerLayoutDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 40px 1fr 100px 1fr;
  justify-content: center;
  align-items: center;

  & > div {
    margin: 50px;
    margin-bottom: 80px;
  }
`;
const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px;
`;
const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 100px 100px;
  grid-template-rows: 1fr;
  border-bottom: 2px solid #202020;
  margin-top: 70px;
`;

const SearchInput = styled.input`
  border: none;
  background-color: #fafafa;
  border-bottom: 1px solid #202020;
  width: 1000px;
  outline: none;
  font-size: 1.1rem;
  text-align: center;
`;

const Btn = styled.button`
  border: none;
  color: #202020;
  outline: none;
  background-color: inherit;
  cursor: pointer;
`;

const FilterText = styled.span`
  font-size: 1.1rem;
`;

const FilterTextMD = styled.span`
  font-size: 1.1rem;
  text-align: end;
`;

const FilterDiv = styled.div`
  margin-bottom: 20px;
  width: 500px;
`;

const FindStayList = () => {
  const [formData, setFormData] = useState({});
  const [stayVoList, setStayVoList] = useState([]);
  const [imgPath, setImgPath] = useState([]);
  const stayVo = useSelector((state) => state.stay);
  const roomVo = useSelector((state) => state.room);
  const reservationDate = useSelector((state) => state.room.reservationDate);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const location = useLocation();

  if (location.pathname) {
    localStorage.removeItem("roomdata");
  }

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const queryParams = new URLSearchParams({
    datedata: stayVo.reservationDate || "", // undefined 방지
    people: (roomVo.adult || 0) + (roomVo.child || 0) + (roomVo.baby || 0), // undefined 방지
    area: stayVo.address || "", // undefined 방지
    sort: stayVo.sort || "latest", // 기본값 설정
    title: stayVo.title || "",
  }).toString();

  const AttachmentData = async () => {
    const attachmentData = await getAttachment();
    // console.log("먼저 가져와야할 데이터::", attachmentData);
    const listData = await getStayListAll(queryParams);
    // console.log(
    //   "보내는 요청 URL: ",
    //   `http://localhost:8080/stay/list?${queryParams}`
    // );
    // console.log("queryParams :: ", queryParams);
    // console.log("sort 값 확인: ", stayVo.sort);
    console.log("꺼내온 데이터 ::", listData);
    setStayVoList(listData);
    dispatch(setStayData(listData));

    //
    const arr = listData.map((vo) => {
      const matchingAttachments = attachmentData.filter(
        (att) => att.sno === vo.no
      );
      // console.log("matchingAttachments::", matchingAttachments);
      // console.log(vo.filePath);

      const imgPaths =
        matchingAttachments.length > 0
          ? matchingAttachments.map((att) => att.filePath)
          : null;
      imgPaths.unshift(vo.filePath);
      const dataObject = {
        [vo.no]: imgPaths,
      };
      return dataObject;
    });
    // 리턴값을 저장
    setImgPath(arr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch("localhost:8080/findstay", {
    //   method: "GET",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then((resp) => resp.text())
    //   .then((data) => {
    //     // console.log("data : ", data);
    //   });
  };

  useEffect(() => {
    AttachmentData();
  }, [queryParams]);

  return (
    <>
      <Layout>
        <h1>FIND STAY</h1>
        <Display isTimeMode={false} dateRange={reservationDate}></Display>
        <SearchWrapper>
          <form onSubmit={handleSubmit}>
            <SearchInput
              type="search"
              placeholder="원하는 숙소의 이름을 검색해보세요."
              onChange={handleChange}
            />
            <Btn type="submit">
              <IoMdSearch size={30} />
            </Btn>
          </form>
        </SearchWrapper>
        <FilterWrapper>
          <FilterDiv>
            <SortDropdown />
          </FilterDiv>
          <div></div>
          <div>
            <CiFilter size={18} />
            <FilterTextMD>필터</FilterTextMD>
          </div>
          <div>
            <Btn>
              <RiResetRightFill size={18} />
              <FilterText
                onClick={() => {
                  dispatch(setReset());
                  dispatch(setResetFilter());
                }}
              >
                초기화
              </FilterText>
            </Btn>
          </div>
        </FilterWrapper>

        <InnerLayoutDiv>
          {imgPath.length === 0 ? (
            <h1>목록이 없습니다.</h1>
          ) : (
            stayVoList.map((vo, idx) => {
              const voImgPaths = imgPath[idx][vo.no]; //<<<<<<<<<<<<<<객체로 담긴 배열을 풀어내는 과정입니다.

              return (
                <Fragment key={vo.no}>
                  <div></div>
                  <div>
                    <StayListCard
                      no={vo.no}
                      price={vo.price}
                      url={"findstay"}
                      imgPaths={voImgPaths}
                      // clickHandler={clickHandler}
                      title={vo.name}
                      min={vo.standardGuest}
                      max={vo.maxGuest}
                      address={vo.address}
                    ></StayListCard>
                  </div>
                </Fragment>
              );
            })
          )}
        </InnerLayoutDiv>
      </Layout>
    </>
  );
};

export default FindStayList;
