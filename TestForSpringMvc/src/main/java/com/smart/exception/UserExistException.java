package com.smart.exception;

import org.omg.CORBA.UserException;

public class UserExistException extends UserException {
    public UserExistException(String reason) {
        super(reason);
    }
}
