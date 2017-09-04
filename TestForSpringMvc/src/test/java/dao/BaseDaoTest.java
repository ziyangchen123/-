package dao;

import org.unitils.UnitilsTestNG;
import org.unitils.spring.annotation.SpringApplicationContext;

@SpringApplicationContext(value = {"classpath*:/xiaochun-dao.xml"})
public class BaseDaoTest extends UnitilsTestNG{
}
