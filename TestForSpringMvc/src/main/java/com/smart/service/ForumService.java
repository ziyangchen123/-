package com.smart.service;

import com.smart.dao.BoardDao;
import com.smart.dao.PostDao;
import com.smart.dao.TopicDao;
import com.smart.dao.UserDao;
import com.smart.domain.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

public class ForumService {
    @Autowired
    private TopicDao topicDao;
    @Autowired
    private  BoardDao boardDao;
    @Autowired
    private PostDao postDao;
    @Autowired
    private UserDao userDao;

    public  void addTopic(Topic topic){
        Board board = (Board)boardDao.get(topic.getBoardId());
        board.setTopic_num(board.getTopic_num()+1);
        topicDao.save(topic);

        topic.getMainPost().setTopic(topic);
        MainPost post = topic.getMainPost();
        post.setCreateTime(new Date());
        post.setUser(topic.getUser());
        post.setPostTitle(topic.getTopicTitle());
        post.setBoardId(topic.getBoardId());

        postDao.save(post);

        User user =topic.getUser();
        user.setCredit(user.getCredit()+10);
        userDao.save(user);
    }
//这种操作全靠数据表的定义支撑,其实很简单,重要的是理清业务逻辑,该做的事不能少.
    public void removeTopic(int topicId){
        Topic topic = topicDao.get(topicId);

        Board board = boardDao.get(topic.getBoardId());
        board.setTopic_num(board.getTopic_num()-1);

        User user = topic.getUser();
        user.setCredit(user.getCredit() - 50);

        topicDao.remove(topic);
        postDao.deleteTopicPosts(topicId);
    }

    public void addPost(Post post){
        postDao.save(post);
        User user=post.getUser();
        user.setCredit(user.getCredit()+5);
        userDao.update(user);

        Topic topic = topicDao.get(post.getTopic().getTopicId());
        topic.setReplies(topic.getReplies()+1);
        topic.setLastPost(new Date());

    }

}
