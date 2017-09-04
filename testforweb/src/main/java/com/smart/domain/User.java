package com.smart.domain;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamAsAttribute;
import jdk.nashorn.internal.runtime.regexp.joni.Regex;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.stereotype.Service;
import javax.validation.constraints.*;

import javax.annotation.MatchesPattern;
import java.util.Date;

@Service
public class User {

    @XStreamAsAttribute
    @Pattern(regexp = "w{3,4}")
    private String userName;
    @XStreamAsAttribute
    private String password;
    @XStreamAsAttribute
    private String realName;
    @XStreamAlias("id")
    @XStreamAsAttribute
    private String userId;

    @DateTimeFormat(pattern="yyyy-mm-dd")
    private Date birthday;

    @NumberFormat(pattern = "#,###.##")
    private  long salary;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public long getSalary() {
        return salary;
    }

    public void setSalary(long salary) {
        this.salary = salary;
    }
}
