package com.free.entity;

import com.free.entity.key.CondolenceId;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity(name = "condolence")
public class Condolence {
    @EmbeddedId
    private CondolenceId condolenceId;
}
