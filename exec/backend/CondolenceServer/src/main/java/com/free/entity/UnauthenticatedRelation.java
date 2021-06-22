package com.free.entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "unauthenticated_relation")
public class UnauthenticatedRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long unauthRelationId;

    @Column(columnDefinition = "BINARY(16)")
    private UUID deadId;

    private String relationName;
    private String name;
}
