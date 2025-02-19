package com.kh.springfinal.guest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/guest")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class GuestController {

    private final GuestService  service;

    //회원가입
    @PostMapping("join")
    public void join(@RequestBody GuestVo vo){
        try{
            GuestVo joinVo = service.join(vo);
            System.out.println("joinVo = " + joinVo);
        }catch(Exception e) {
            throw new IllegalStateException("[GUEST-JOIN] JOIN FAIL ...");
        }
    }

    //로그인
    @PostMapping("login")
    public void login(@RequestBody GuestVo vo){
        try{

            log.info("Login API called with email: {}", vo.getEmail());
            String token = service.login(vo);
            log.info("Generated Token in Controller: {}", token);
        }catch(Exception e) {
            throw new IllegalStateException("[GUEST-LOGIN] EMAIL-LOGIN FAIL ...");
        }
    }

    //아이디 찾기

    //비밀번호 찾기

    //새로운 비밀번호 생성하기

    //회원 수정하기

    //숙소 예약정보 불러오기

    //공간 예약 정보 불러오기

    //s-log 불러오기

    //북마크 불러오기


}
