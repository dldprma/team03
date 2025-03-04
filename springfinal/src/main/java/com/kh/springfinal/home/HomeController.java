package com.kh.springfinal.home;

import com.kh.springfinal.reservation.SpaceReservVo;
import com.kh.springfinal.reservation.StayReservVo;
import com.kh.springfinal.stay.StayVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("home")
public class HomeController {
    private final HomeService service;

    @GetMapping("spring")
    public List<StayVo> getSpringStay(){

        List<StayVo> SpringvoList = service.getSpringStay();
        return SpringvoList;
    }
    @GetMapping("summer")
    public List<StayVo> getSummerStay(){

        List<StayVo> summerVoList = service.getSummerStay();
        return summerVoList;
    }
    @GetMapping("autumn")
    public List<StayVo> getAutumnStay(){

        List<StayVo> autumnVoList = service.getAutumnStay();
        return autumnVoList;
    }
    @GetMapping("winter")
    public List<StayVo> getWinterStay(){

        List<StayVo> winterVoList = service.getWinterStay();
        return winterVoList;
    }
    @GetMapping("besthit")
    public List<StayVo> getBestHitStayByFive(){

        List<StayVo> voList = service.getBestHitStayByFive();
        return voList;
    }
    @PostMapping("bookmark")
    public int bookmark(@RequestBody StayReservVo vo){
        return service.bookmark(vo);
    }

    @PostMapping("bookmarkdel")
    public int bookmarkdel(@RequestBody StayReservVo vo){
        return service.bookmarkdel(vo);
    }



    @PostMapping("getbookmarkInfo")
    public boolean getbookmark(@RequestBody StayReservVo vo){
        System.out.println("vo = " + vo);
        int result = service.getbookmark(vo);
        System.out.println(result);
        if(result >= 1){
            return true;
        }else{
            return false;
        }

    }


}
