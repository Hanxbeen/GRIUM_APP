package com.free.authsvr.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "relation")
public class Relation {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public Long relationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="self_uid")
    public User selfUid; // 본인 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="concern_uid")
    public User concernUid; // 관계자 ID

    public String relationName; // 관계 이름

    public boolean isDeleted; // 관계 연결 유무

    @Builder
    public Relation(User selfUid, User concernUid, String relationName, boolean isDeleted){
        this.selfUid = selfUid;
        this.concernUid = concernUid;
        this.relationName = relationName;
        this.isDeleted = isDeleted;
    }

}
