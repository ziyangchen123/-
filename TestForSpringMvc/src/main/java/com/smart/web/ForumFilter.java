package com.smart.web;

import com.smart.domain.User;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static com.smart.cons.CommonConstant.LOGIN_TO_URL;
import static com.smart.cons.CommonConstant.USER_CONTEXT;

public class ForumFilter extends Filter {
    private  static final String FILTERD_REQUEST="@@session_context_filtered_request";

    private static final String[] INHERENT_ESCAPE_URI={"index.jsp"};

    public void  doFilter(ServletRequest request, ServletResponse response, FilterChain chain)throws IOException,ServletException{
        if (request!=null && request.getAttribute(FILTERD_REQUEST)!=null){
            chain.doFilter(request,response);
        }
        else {
            request.setAttribute(FILTERD_REQUEST,Boolean.TRUE);
            HttpServletRequest httpServletRequest = (HttpServletRequest)request;
            User user =getSessionUser(httpServletRequest);


            if (user==null && ! isURIlLogin(httpServletRequest.getRequestURI(),httpServletRequest))
            {
                String toURL = httpServletRequest.getRequestURI().toString();
                if (!StringUtils.isEmpty(httpServletRequest.getQueryString())){
                    toURL+="?"+httpServletRequest.getQueryString();
                }
                httpServletRequest.getSession().setAttribute(LOGIN_TO_URL,toURL);
                request.getRequestDispatcher("/login.jsp").forward(request,response);
            }
            chain.doFilter(request,response);

        }
    }

    protected User getSessionUser(HttpServletRequest request) {
        return (User) request.getSession().getAttribute(USER_CONTEXT);
    }

    private boolean isURIlLogin(String requestURL,HttpServletRequest httpServletRequest){
        if (httpServletRequest.getContextPath().equalsIgnoreCase(requestURL)
                || (httpServletRequest.getContextPath()+"/").equalsIgnoreCase(requestURL))
            return true;
        for (String uri:INHERENT_ESCAPE_URI){
            if (requestURL!=null && requestURL.indexOf(uri)>=0) return true;
        }
        return false;
    }

}
