package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.*;

@Repository
public interface LoginRepository extends CrudRepository<Login, String>{
    
}
