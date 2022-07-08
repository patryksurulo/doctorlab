package com.doctorlab.security.services;

import com.doctorlab.models.User;
import com.doctorlab.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Identity {

    private final UserRepository userRepository;
    public Identity(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User getCurrent(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> userOptional = userRepository.findByUsername(authentication.getName());
        return userOptional.orElse(null);
    }
}
