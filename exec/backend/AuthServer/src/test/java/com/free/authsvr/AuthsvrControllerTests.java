//package com.ssafy.authsvr;
//
//import com.ssafy.authsvr.controller.FamilyController;
//import com.ssafy.authsvr.controller.ProposeController;
//import com.ssafy.authsvr.entity.User;
//import com.ssafy.authsvr.payload.request.relation.RelationRequest;
//import com.ssafy.authsvr.repository.FamilyRepository;
//import com.ssafy.authsvr.repository.UserRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//@SpringBootTest
//public class AuthsvrControllerTests {
//
//    @Autowired
//    FamilyController familyController;
//
//    @Autowired
//    ProposeController proposeController;
//
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    FamilyRepository familyRepository;
//
//    @Test
//    public void ControllerTest(){
//
//        User user1 = User.builder()
//                .name("김정민")
//                .build();
//        userRepository.save(user1);
//
//        User user2 = User.builder()
//                .name("박찬민")
//                .build();
//
//        userRepository.save(user2);
//
//        proposeController.addPropose(
//                RelationRequest.builder()
//                    .senderId(user1.getId().toString())
//                    .receiverId(user2.getId().toString())
//                    .senderToReceiver("형")
//                    .receiverToSender("동생")
//                    .build()
//        );
//        proposeController.addPropose(
//                RelationRequest.builder()
//                        .senderId(user2.getId().toString())
//                        .receiverId(user1.getId().toString())
//                        .senderToReceiver("동생")
//                        .receiverToSender("형")
//                        .build()
//        );
//    }
//}
