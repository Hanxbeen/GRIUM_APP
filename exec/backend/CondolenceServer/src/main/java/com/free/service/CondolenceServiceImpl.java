package com.free.service;

import com.free.entity.Condolence;
import com.free.entity.key.CondolenceId;
import com.free.payload.request.condolence.CondolenceRequest;
import com.free.payload.response.condolence.CondolenceInfoResponse;
import com.free.repository.CondolenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CondolenceServiceImpl implements CondolenceService {

    private final CondolenceRepository condolenceRepository;

    @Override
    public boolean checkCondolence(CondolenceId condolenceId) {
        return condolenceRepository.findById(condolenceId).map(condolence -> true).orElseGet(()->false);
    }

    @Override
    public int getCondolenceCount(UUID deadId) {
        return condolenceRepository.getCount(deadId).size();
    }

    @Override
    public CondolenceInfoResponse addCondolence(CondolenceRequest condolenceRequest) {

        CondolenceId condolenceId = CondolenceId.builder()
                .deadId(UUID.fromString(condolenceRequest.getDeadId()))
                .userId(UUID.fromString(condolenceRequest.getUserId()))
                .build();

        Boolean flag = condolenceRepository.findById(condolenceId).map(condolence -> {
            condolenceRepository.delete(condolence);
            return false;
        }).orElseGet(() -> {
            condolenceRepository.save(Condolence.builder()
                    .condolenceId(condolenceId)
                    .build());
            return true;
        });

        return CondolenceInfoResponse.builder()
                .condolenceCheck(flag)
                .build();
    }
}
