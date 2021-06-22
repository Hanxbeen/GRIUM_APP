package com.free;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CondolenceServerApplication{
    public static void main(String[] args) {
        SpringApplication.run(CondolenceServerApplication.class, args);
    }

}
