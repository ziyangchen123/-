package com.smart.web;

import com.smart.cons.CommonConstant;
import com.smart.domain.User;
import org.springframework.util.Assert;

import javax.servlet.http.HttpServletRequest;

public class BaseController {
    protected static final String ERROR_MSG_KEY="errorMsg";

    protected User getSessionUser(HttpServletRequest httpServletRequest){
        return (User)httpServletRequest.getSession().getAttribute(CommonConstant.USER_CONTEXT);
    }

    protected void setSessionUser(HttpServletRequest request,User user){
        request.getSession().setAttribute(CommonConstant.USER_CONTEXT,user);
    }

    public final String getAppbaseUrl(HttpServletRequest request,String url){
        Assert.hasLength(url,"url不能为空");
        Assert.isTrue(url.startsWith("/"),"必须以/开始");
        return request.getContextPath()+url;
    }
}
