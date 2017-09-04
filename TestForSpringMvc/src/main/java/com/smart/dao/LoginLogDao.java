package com.smart.dao;

import com.smart.domain.Board;
import com.smart.domain.LoginLog;
import org.springframework.stereotype.Repository;

/**
 * Post的DAO类
 *
 */
@Repository
public class LoginLogDao extends BaseDao<LoginLog> {
	public void save(Board loginLog) {
		this.getHibernateTemplate().save(loginLog);
	}

}
