// PictureSlide.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeCard from "./HomeCard";

const SlideContainer = styled.div`
  position: relative;
  width: ${(props) => props.w || "400"}px;
  height: ${(props) => props.h || "230"}px;
  overflow: hidden;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${(props) => -props.index * 100}%);
`;



const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? "left: 10px" : "right: 10px")};
  transform: translateY(-50%);
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0);
  color: red;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
`;



const HomeMainSlide = ({ w, h, imgPaths, main }) => {
  console.log("img path ~~~ ::: ", imgPaths);

  // 화면넘길때마다 가질 인덱스 구성
  const [slideIdx, setSlideIdx] = useState(0);

  // 화면 넘기면 인덱스에 1값 더해서 인덱스 1로 만든뒤 슬라이드 창으로 나눠서 마지막페이지 구하기
  const goToNextSlide = () => {
    setSlideIdx((props) => (props + 1) % imgPaths.length);
  };

  const goToPreviousSlide = () => {
    setSlideIdx((props) => (props - 1 + imgPaths.length) % imgPaths.length);
  };

  useEffect(() => {
    if (!main) {
      return;
    }

    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % imgPaths.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [main, imgPaths]);

  if (!imgPaths || imgPaths.length === 0) {
    return (
      <>
        <h1>null</h1>
      </>
    );
  }

  return (
    <SlideContainer w={w} h={h}>
      <Slide index={slideIdx}>
              <HomeCard imgPath={imgPaths}/>
      </Slide>
      <ArrowButton left onClick={goToPreviousSlide}>
        ❮
      </ArrowButton>
      <ArrowButton onClick={goToNextSlide}>❯</ArrowButton>
    </SlideContainer>
  );
};

export default HomeMainSlide;
