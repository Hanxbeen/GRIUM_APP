//package com.ssafy.authsvr;
//
//import com.ssafy.authsvr.controller.ProposeController;
//import com.ssafy.authsvr.entity.FamilyRelation;
//import com.ssafy.authsvr.entity.User;
//import com.ssafy.authsvr.repository.FamilyRepository;
//import com.ssafy.authsvr.repository.UserRepository;
//import com.ssafy.authsvr.service.ProposeService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import java.util.List;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.is;
//
//
////@SpringBootTest
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//class AuthsvrApplicationTests {
//    /*
//    Tester : 재희
//    Date : 2021.04.22
//     */
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    FamilyRepository familyRepository;
//
//    @Autowired
//    ProposeService proposeService;
////    @Autowired
////    ProposeController proposeController;
//
//    @Test
//    void initDB() {
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
//        List<User> listUser = userRepository.findAll();
//        System.out.println(user1.getId());
//        assertThat(listUser.get(0).getName(), is("김정민"));
//        assertThat(listUser.get(1).getName(), is("박찬민"));
//
//        FamilyRelation relation = FamilyRelation.builder()
//                .selfUid(user1)
//                .concernUid(user2)
//                .relationName("삼촌")
//                .isDeleted(false)
//                .build();
//
//        familyRepository.save(relation);
//        List<FamilyRelation> relations = familyRepository.findAll();
//        System.out.println(relations.get(0).getSelfUid().getName());
//        assertThat(relations.get(0).getSelfUid(), is(listUser.get(0)));
//
//
//    }
//
//}
