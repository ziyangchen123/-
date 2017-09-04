package com.smart.domain;

import org.apache.commons.lang.builder.ToStringBuilder;

import java.io.Serializable;

public class BaseDomain implements Serializable{
    public String toString(){
        return ToStringBuilder.reflectionToString(this);
    }
}
