package com.smart.dao;


import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.util.Assert;


import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.Statement;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.unitils.orm.hibernate.HibernateUnitils.getSession;

public class BaseDao<T> {
    private Class <T> entityClass;

    private HibernateTemplate hibernateTemplate;

    //通过反射获取子类确定的泛型类
    public BaseDao(){
        //当前对象的直接超类的 Type
        Type genType=getClass().getGenericSuperclass();
        //getGenericSuperclass()获得带有泛型的父类
        //Type是 Java 编程语言中所有类型的公共高级接口。它们包括原始类型、参数化类型、数组类型、类型变量和基本类型。
        //ParameterizedType参数化类型，即泛型
        Type[] params = ((ParameterizedType)genType).getActualTypeArguments();
        entityClass = (Class)params[0];


    }
    //根据ID加载PO实例
    public T load(Serializable id){
        return  (T) getHibernateTemplate().load(entityClass,id);
    }

    public T get(Serializable id){
        return (T) getHibernateTemplate().get(entityClass,id);
    }

    public List<T> loadAll(){
        return getHibernateTemplate().loadAll(entityClass);
    }

    public void save(T entity) {
        getHibernateTemplate().save(entity);
    }

    public void remove(T entity){
        getHibernateTemplate().delete(entity);
    }

    public void update(T entity){
        getHibernateTemplate().update(entity);
    }

    public List find(String hql){
        return this.getHibernateTemplate().find(hql);
    }

    public List find(String hql,Object... params){
        return  this.getHibernateTemplate().find(hql,params);
    }

    public void intitialzie(Object entiy){
        this.getHibernateTemplate().initialize(entiy);
    }

    public HibernateTemplate getHibernateTemplate() {
        return hibernateTemplate;
    }

    public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
        this.hibernateTemplate = hibernateTemplate;
    }

    //分页查询函数
    public Page pagedQuery(String hql,int pageNo,int pageSize,Object... values){
        Assert.hasText(hql);
        Assert.isTrue(pageNo>=1,"pageNo should start from 1");

        //count 查询
        String countQueryString ="select count(*) "+ removeSelect(removeOrders(hql));
        List countlist = getHibernateTemplate().find(countQueryString,values);
        long totalCount = (Long) countlist.get(0);
        if (totalCount<1)
            return new Page();
        int startIndex=Page.getStartOfPage(pageNo,pageSize);

        Query query = createQuery(hql,values);
        List list = query.setFirstResult(startIndex).setMaxResults(pageSize).list();
        return new Page(startIndex,totalCount,pageSize,list);

    }

    public Query createQuery(String hql,Object... values){
        Assert.hasText(hql);
        Query query = getSession().createQuery(hql);
        for (int i=0;i<values.length;i++){
            query.setParameter(i,values[i]);
        }
        return  query;
    }
    //对hql进行改造
    private static String removeSelect(String hql){
        Assert.hasText(hql);
        int beginPos = hql.toLowerCase().indexOf("from");
        Assert.isTrue(beginPos==-1,"hql"+hql+"must has a keyword 'from'");
        return hql.substring(beginPos);
    }

    private  static String removeOrders(String hql){
        Assert.hasText(hql);
        Pattern p = Pattern.compile("order\\s*by[\\w|\\W|\\s}\\S]*",Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(hql);
        StringBuffer sb = new StringBuffer();
        while (m.find()){
            m.appendReplacement(sb,"");
        }
        m.appendTail(sb);
        return sb.toString();
    }
}
