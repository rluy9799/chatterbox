package com.example.demo;

import java.util.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.example.demo.entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RequestController {

    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private MessageRepository messageRepository;

    @PostMapping(value = "login")
    public @ResponseBody Boolean test(@RequestBody Map<String, String> input){
        System.out.println("test");
        String user = input.get("username");
        String pass = input.get("password");
        // Login login = loginRepository.findById(user).get();
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("Login");
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        Login account = em.find(Login.class, user);
        em.getTransaction().commit();
        em.close();
        if(account != null && account.getPassword().equals(pass)){
            return true;
        }
        return false;
    }

    @PostMapping(value = "signup")
    public @ResponseBody Boolean signup(@RequestBody Map<String, String> input){
        System.out.println("sign up");
        String user = input.get("username");
        String pass = input.get("password");
        String email = input.get("email");
        System.out.println(user +", " + pass +", " + email);
        Login newUser = new Login(user,pass,email);
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("Login");
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(newUser);
        em.getTransaction().commit();
        em.close();
        // loginRepository.save(newUser);
        return true;
    }

    @PostMapping(value = "message/new")
    public @ResponseBody Boolean newMessage(@RequestBody Map<String, String> input){
        System.out.println("new");
        String message = input.get("message");
        String id = input.get("id");
        System.out.println(message +", " + id);
        Message newMessage = new Message(message, Integer.valueOf(id));
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("Message");
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(newMessage);
        em.getTransaction().commit();
        em.close();
        return true;
    }

    @GetMapping(value = "message")
    public @ResponseBody List<Message> messages(){
        System.out.println("prev");
        Iterable<Message> iterM = messageRepository.findAll();
        List<Message> messages = new ArrayList<>();
        for(Message m : iterM){
            messages.add(m);
        }
        Collections.sort(messages, (a,b) -> a.getId()-b.getId());
        return messages;
    }

}