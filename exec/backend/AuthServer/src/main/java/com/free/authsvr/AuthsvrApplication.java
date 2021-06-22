package com.free.authsvr;

import com.free.authsvr.config.AppProperties;
import com.free.authsvr.entity.AuthProvider;
import com.free.authsvr.entity.User;
import com.free.authsvr.controller.ProposeController;
import com.free.authsvr.payload.request.relation.RelationRequest;
import com.free.authsvr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
//public class AuthsvrApplication implements CommandLineRunner {
public class AuthsvrApplication{
    public static void main(String[] args) {
        SpringApplication.run(AuthsvrApplication.class, args);
    }


//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    ProposeController proposeController;

//    @Override
//    public void run(String... args) throws Exception {
//        User user1 = null, user2 = null, user3 = null, user4 = null;
//        if (userRepository.findByProviderId("1698873642") == null) {
//            user1 = User.builder()
//                    .name("김민중")
//                    .providerId("1698873642")
//                    .provider(AuthProvider.kakao)
//                    .build();
//            userRepository.save(user1);
//        }
//
//        if (userRepository.findByProviderId("1698875294") == null) {
//            user2 = User.builder()
//                    .name("배용렬")
//                    .providerId("1698875294")
//                    .provider(AuthProvider.kakao)
//                    .build();
//
//            userRepository.save(user2);
//        }
//
//        if (userRepository.findByProviderId("1697572858") == null) {
//            user3 = User.builder()
//                    .name("한재희")
//                    .providerId("1697572858")
//                    .provider(AuthProvider.kakao)
//                    .build();
//            userRepository.save(user3);
//        }
//        if (userRepository.findByProviderId("1698871730") == null) {
//            user4 = User.builder()
//                    .name("조준영")
//                    .providerId("1698871730")
//                    .provider(AuthProvider.kakao)
//                    .build();
//
//            userRepository.save(user4);
//        }
//
//        if(user1 == null || user2 == null)
//            return;
//
//        System.out.println("user2: " + user2.getProviderId());
//
//        proposeController.addPropose(
//                RelationRequest.builder()
//                        .senderId(user1.getId())
//                        .receiverId(user2.getId())
//                        .senderToReceiver("형")
//                        .receiverToSender("동생")
//                        .build()
//        );
//        proposeController.addPropose(
//                RelationRequest.builder()
//                        .senderId(user2.getId())
//                        .receiverId(user1.getId())
//                        .senderToReceiver("동생")
//                        .receiverToSender("형")
//                        .build()
//        );
//    }
}
