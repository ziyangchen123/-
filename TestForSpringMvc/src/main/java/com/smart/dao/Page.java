package com.smart.dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Page implements Serializable {
    private static int DEFAULT_PAGE_SIZE=20;
    private int pageSize=DEFAULT_PAGE_SIZE;
    private long start;
    private List data;
    private long totalCount;

    public Page(){
        this(0,0,DEFAULT_PAGE_SIZE,new ArrayList());
    }

    //分頁控制信息
    public Page(long start,long totalSize, int pageSize,List data){
        this.pageSize=pageSize;
        this.start=start;
        this.totalCount=totalSize;
        this.data=data;
    }

    //取总页数
    public long getTotalPageCount(){
        if (totalCount%pageSize==0)
            return totalCount/pageSize;
        else
            return totalCount/pageSize+1;
    }
    //取当前页码
    public long getCurrentPageNo(){
        return start/pageSize+1;
    }

    //是否有下一页
    public boolean isHasNextPage(){
        return this.getCurrentPageNo()<this.getTotalPageCount();
    }

    //是否有上一页
    public boolean isHasPreviousPage(){
        return this.getCurrentPageNo()>1;
    }
    //获取任意一页第一条数据在数据列中的位置.每页的条数采用默认值.
    protected static int getStartOfPage(int pageNo){
        return getStartOfPage(pageNo,DEFAULT_PAGE_SIZE);
    }
    //获取任意一页第一条数据在数据列中的位置
    public static int getStartOfPage(int pageNo,int pageSize){
        return (pageNo-1)*pageSize;
    }

    public List getData() {
        return data;
    }

    public void setData(List data) {
        this.data = data;
    }
}
