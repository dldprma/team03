package com.kh.springfinal.guest;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface GuestMapper {

    @Insert("""
            INSERT INTO MEMBER(NO, EMAIL, PWD, NAME , PHONE) VALUES(SEQ_MEMBER.NEXTVAL , #{email}, #{pwd} , #{name} ,#{phone})
            """)
    int join(GuestVo vo);

    @Select("""
            SELECT NO , EMAIL, PWD , PAGE_NICK
            FROM MEMBER
            WHERE EMAIL = #{email}
            """)
    GuestVo loginEmail(GuestVo vo);


    @Select("""
            SELECT *
            FROM MEMBER
            WHERE NAME = #{name}
            AND PHONE = #{phone}
            """)
    GuestVo findId(GuestVo vo);


    @Select("""
            SELECT *
            FROM MEMBER
            WHERE EMAIL = #{email}
            AND PHONE = #{PHONE}
            """)
    GuestVo findPwd(GuestVo vo);

}
