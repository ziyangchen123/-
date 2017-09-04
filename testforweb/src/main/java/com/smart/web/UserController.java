package com.smart.web;

import com.smart.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.ServletRequest;
import java.io.IOException;
import java.util.Date;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private User user;
    public ResponseEntity<User> handle51(HttpEntity<User> requestEntity){
        user =requestEntity.getBody();
        user.setUserId("1000");
        return  new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(path = "/handl42/{imageId}")
    public byte[] handle42(@PathVariable("imgeId") String imageId)throws IOException{
        System.out.println("load image of "+imageId);

        Resource resource = new  ClassPathResource("/image.jpg");
        byte[] data = FileCopyUtils.copyToByteArray(resource.getInputStream());
        return  data;
    }

    @RequestMapping(path = "/hanle61")
    public String handle61(@ModelAttribute("user") User user){
        user.setUserId("1000");
        return "/user/createSuccess";

    }
    @ModelAttribute("user")
    public User getUser(){
        User user =new User();
        user.setUserId("1001");
        return user;
    }

    @RequestMapping("/handle62")
    public String handle62(@ModelAttribute("user") User user){
        user.setUserName("tom");
        return "user/showUser";
    }

    @RequestMapping("/handle63")
    public String handle63(ModelMap modelMap){
        modelMap.addAttribute("testAttr","value1");
        User user=(User)modelMap.get("user");
        user.setUserName("tom");
        return "/user/showUser";
    }

    @RequestMapping("/handle71")
    public String handle71(@ModelAttribute("user")User user){
        user.setUserName("Jhon");
        return "redirect:handle72.html";
    }

    @RequestMapping("/handle72")
    public String handle72(ModelMap modelMap, SessionStatus sessionStatus){
        User user = (User)modelMap.get("user");
        if (user !=null){
            user.setUserName("Jetty");
            sessionStatus.setComplete();


        }
        return "/user/showUser";
    }
    @InitBinder
    public void InitBinder(WebDataBinder webDataBinder){
        webDataBinder.addCustomFormatter(User.class,new User());
    }
}
