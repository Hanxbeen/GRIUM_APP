package com.free.util;

import com.free.entity.Dead;
import com.free.repository.DeadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class ScheduleTask {

    private final DeadRepository deadRepository;

    @Scheduled(cron = "1 1 1 * * *", zone = "Asia/Seoul")
    public void updateDeadInfoProgress() {
        log.info("updateDeadInfoProgress Scheduler");
        List<Dead> allByProgressCheck = deadRepository.findAllByProgressCheckAndImprintDateLessThan(true, LocalDate.now().toString()); // true인거 and 시간 비교
        allByProgressCheck.stream().forEach(dead -> dead.setProgressCheck(false));
        if (!CollectionUtils.isEmpty(allByProgressCheck)) deadRepository.saveAll(allByProgressCheck);
    }

}
