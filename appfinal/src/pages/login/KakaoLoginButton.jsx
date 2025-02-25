import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { login } from "../../redux/memberSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.button`
  border: none;
  background-color: #fafafa;
  cursor: pointer;
`;

const KakaoLoginButton = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init("c51dc700559a4d65e03a22a0cbc7ce27"); // 여기에 JavaScript 키 입력
    }
  }, []);

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      console.error("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log("카카오 로그인 성공:", authObj);
        sendTokenToBackend(authObj.access_token);
        navi("/");
      },
      fail: function (err) {
        console.error("카카오 로그인 실패:", err);
      },
    });
  };

  const sendTokenToBackend = async (accessToken) => {
    try {
      const response = await fetch("http://localhost:8080/oauth/kakao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      console.log("JWT:", token);

      const decoded = jwtDecode(token);
      dispatch(login(decoded)); // Redux 상태 업데이트
    } catch (error) {
      console.error("서버 요청 실패:", error);
    }
  };

  return (
    <Btn onClick={handleKakaoLogin}>
      <img src="/img/kakao_login_medium_wide.png" alt="카카오 로그인 버튼" />
    </Btn>
  );
};

export default KakaoLoginButton;
