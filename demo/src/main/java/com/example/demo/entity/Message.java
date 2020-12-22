package com.example.demo.entity;

import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="message")
public class Message{
    @Column(name="message")
    private String message;
    @Id
    @Column(name="id")
    private int id;
    
    public Message(String message, int id){
        this.message = message;
        this.id = id;
    }

    public Message(){

    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }


}