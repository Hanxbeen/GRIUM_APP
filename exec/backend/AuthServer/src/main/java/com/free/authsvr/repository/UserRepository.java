package com.free.authsvr.repository;

import com.free.authsvr.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {


//    Optional<User> findById(UUID id);

    User findByEmail(String email);

    Boolean existsByEmail(String email);

    User findByProviderId(String providerId);

    List<User> findAllByIdIn(List<UUID> uidList);

    List<User> findByNameContaining(String name);

    List<User> findAllByProviderIdIn(List<String> providerIdList);

}
