package com.example.demo;

import com.example.demo.entity.Message;

import org.springframework.data.repository.CrudRepository;

public interface MessageRepository extends CrudRepository<Message, Integer>{
    
}
