package com.kh.springfinal.space;

import com.kh.springfinal.reservation.SpaceReservVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("space")
@CrossOrigin
public class SpaceController {

    private final SpaceService service;

    @GetMapping("list")
    public List<SpaceVo> spaceGetListAll(@RequestParam String area,String people, String datedata) throws InterruptedException {
        String date = datedata.replaceAll("-", "");
        List<SpaceVo> voList = service.spaceGetListAll(area,people,date);

//        System.out.println("vo :::"+ voList);
        return voList;

    }
    @GetMapping("attachmentlist")
    public List<AttachmentVo> spacegetattachment() throws InterruptedException {

        List<AttachmentVo> attachmentVoList = service.spaceGetAttachment();
//        System.out.println("attachmentVoList = " + attachmentVoList);
        return attachmentVoList;
    }
    @PostMapping("detail")
    public SpaceVo spaceGetDetailVo(@RequestBody Long no){
//        System.out.println(no);
        return service.spaceGetDetailVo(no);
    }

    @PostMapping("reservation")
    public int reservation(SpaceReservVo vo, String memberNo){
        System.out.println("vo::"+vo);
        String date = vo.getUseDay();
        String formattedDate = date.replaceAll("-", "");
        vo.setUseDay(formattedDate);
        int result = service.reservation(vo,memberNo);

        return result;

    }
    @PostMapping("isAvailable")
    public String[] getIsAvailable(@RequestBody String no){
        String[] date = service.getIsAvailable(no);
//        System.out.println("date :::"+date);
        return date;
    }

    @PostMapping("packagedone")
    public SpaceReservVo packageDone(String no, String useDay){
        String date = useDay.replaceAll("-", "");

        SpaceReservVo vo = service.packageDone(no,date);
        if(vo == null){
            return new SpaceReservVo();
        }
        return vo;

    }
    @PostMapping("getTimeNow")
    public SpaceReservVo m01(SpaceReservVo vo){
        String date = vo.getUseDay();
        String formattedDate = date.replaceAll("-", "");
        vo.setUseDay(formattedDate);
        SpaceReservVo getvo = service.getNowTime(vo);
        return getvo;
    }

}
