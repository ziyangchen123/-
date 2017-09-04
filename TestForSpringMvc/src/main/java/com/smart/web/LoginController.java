package com.smart.web;

import com.smart.cons.CommonConstant;
import com.smart.domain.User;
import com.smart.service.UserService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import sun.awt.geom.AreaOp;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;

@Controller
@RequestMapping("/login")
public class LoginController extends BaseController {
    @Autowired
    private UserService userService;

    @RequestMapping("/doLogin")
    public ModelAndView login(HttpServletRequest request, User user){
        User dbUser = userService.getUserByUserName(user.getUserName());
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("forward:/login.jsp");
        if (dbUser==null){
            modelAndView.addObject("errorMsg","用户不存在");

        } else if (!dbUser.getPassword().equals(user.getPassword())) {
            modelAndView.addObject("errorMsg","密码错误");

        } else if (dbUser.getLocked()==User.USER_LOCK) {
            modelAndView.addObject("errorMsg","用户被封了,(*^__^*) 嘻嘻……");
        }
        else {
            dbUser.setLastIp(request.getRemoteAddr());
            dbUser.setLastVisit(new Date());
            setSessionUser(request,dbUser);
            String tuURL=(String)request.getSession().getAttribute(CommonConstant.LOGIN_TO_URL);
            request.getSession().removeAttribute(CommonConstant.LOGIN_TO_URL);

            if (StringUtils.isEmpty(tuURL)){
                tuURL="/index.html";
            }
            modelAndView.setViewName("redirect"+tuURL);
        }
        return  modelAndView;
    }

    @RequestMapping("/logout")
    public String logout(HttpSession session){
        session.removeAttribute(CommonConstant.USER_CONTEXT);
        return "forward:/indx.jsp";
    }

}
