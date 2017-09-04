package com.smart.service;

import com.smart.dao.LoginLogDao;
import com.smart.dao.UserDao;
import com.smart.domain.User;
import com.smart.exception.UserExistException;
import org.omg.CORBA.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private LoginLogDao loginLogDao;

    public void  register(User user)throws UserException{
        User u =this.getUserByUserName(user.getUserName());
        if (u!=null) {
            throw new UserExistException("用户名已存在!");
        } else {
            user.setCredit(100);
            user.setUserType(1);
            userDao.save(user);
        }
    }
    public User getUserByUserName(String username){
        return userDao.getUserByUserName(username);
    }

    public User getUserById(int userId){
        return userDao.get(userId);
    }

    public void lockUser(String userName){
        User user =userDao.getUserByUserName(userName);
        user.setLocked(User.USER_LOCK);
        userDao.update(user);
    }
}
