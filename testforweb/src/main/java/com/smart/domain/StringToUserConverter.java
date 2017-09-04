package com.smart.domain;



import org.springframework.core.convert.converter.Converter;

import javax.print.attribute.standard.NumberUp;

public class StringToUserConverter implements Converter<String,User> {

    public User convert(String source) {
        User user = new User();
        if (source!= null && source.length()>0){
            String[] items = source.split(":");
            user.setUserName(items[0]);
            user.setPassword(items[1]);
            user.setUserId(items[2]);
        }
        return user;
    }


}
