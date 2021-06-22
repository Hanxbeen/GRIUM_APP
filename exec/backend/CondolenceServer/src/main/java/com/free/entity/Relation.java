package com.free.entity;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity(name = "relation")
public class Relation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long relationId;
    @Column(columnDefinition = "BINARY(16)")
    private UUID selfUid;
    @Column(columnDefinition = "BINARY(16)")
    private UUID concernUid;
    private String relationName;
    @Column(columnDefinition = "boolean default false")
    private boolean isDeleted;
}
