import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
width: 100%;
height: 100%;
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 300px 150px;

&>a{
  text-decoration: none;
}
`;

const BackImgDiv = styled.div`
width: 450px;
height: 450px;
background-image: url(${props => props.img});
background-position: center;
background-size: cover;
`;

const PackageContentDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 20px 40px 40px;
  background-color: #2020207f;
  
  &> div{
    color: #FAFAFA;
    margin-left:10px;
  }
  &>div:nth-child(1){
    display: flex;
    justify-content:flex-start;
    align-items: end;
    
    font-size: 24px;  /* 기본 폰트 크기 */
    letter-spacing: 1px;
  }
  &>div:nth-child(2){
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    font-size: 13px;  /* 기본 폰트 크기 */
    letter-spacing: 1px;
  }
  &>div:nth-child(3){
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: end;
    font-size: 17px;  /* 기본 폰트 크기 */
  }
  &>div:nth-child(4){
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: 17px;  /* 기본 폰트 크기 */
    letter-spacing: 1px;
  }
  &>div>span{
    margin-right: 30px;
    margin-bottom: 5px;
    text-decoration: underline solid #FAFAFA;
  }
`;
const PackageReservationDone = ({img}) => {


  


  return (
    <BackImgDiv img={img}>
      <Layout>
        <div></div>
      
     
      </Layout>
    </BackImgDiv>
    
  );
};

export default PackageReservationDone;