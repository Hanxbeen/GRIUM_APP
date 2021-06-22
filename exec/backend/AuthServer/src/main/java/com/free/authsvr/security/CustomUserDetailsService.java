package com.free.authsvr.security;


import com.free.authsvr.entity.User;
import com.free.authsvr.exception.ResourceNotFoundException;
import com.free.authsvr.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {


    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException("User not found with email : " + email);
        }

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(UUID id) {
//        System.out.println("id : " + id + " at loadUserbyId");
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()) {
            throw new ResourceNotFoundException("User", "id", id);
        }

        return UserPrincipal.create(user.get());
    }
}