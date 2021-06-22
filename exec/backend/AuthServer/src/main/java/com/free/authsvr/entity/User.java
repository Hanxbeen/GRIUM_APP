package com.free.authsvr.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@Entity(name = "user")
public class User {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(
            name = "uuid2",
            strategy = "uuid2"
    )
    @Column(name = "uid", columnDefinition = "BINARY(16)")
    private UUID id;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    private String name; // nickname

    private String email;

    private String imageUrl;

    private String accessToken;

    @JsonIgnore
    private String password;

    private AuthProvider provider;

    private String providerId;

    private String birthday; // 검수 후 birthyear 추가 및 변경 예정

    private String birthyear;

    private String commentForCondolence; // 조문객들에게 남길 말 (유언)

    private String backgroundMusic; // 배경음 설정

    private String alarmSetting; // 알람 설정

    private String jwt; // access token

    @Builder
    public User(String name, String providerId, AuthProvider provider, String accessToken
    ,String imageUrl, String birthday, RoleType roleType){
        this.name = name;
        this.providerId = providerId;
        this.provider = provider;
        this.accessToken = accessToken;
        this.imageUrl = imageUrl;
        this.birthday = birthday;
        this.roleType = roleType;
    }



//    @Transient
//    private String birthday;
//
//    @Transient
//    private String birthyear;
//
//    @Access(AccessType.PROPERTY)
//    public String getBirthday(){
//        return birthday + birthyear;
//    }

}

