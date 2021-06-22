package com.free.authsvr.service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {
    private AmazonS3 s3Client;

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    @PostConstruct
    public void setS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(this.region)
                .build();
    }

    public String upload(String path, MultipartFile[] files) throws IOException, StringIndexOutOfBoundsException {
        StringBuilder sb = new StringBuilder();
        for(MultipartFile file : files){
            String fileName = file.getOriginalFilename();

            assert fileName != null;
            // 파일이 없을 경우 StringIndexOutOfBoundsException
            String objectName = path + UUID.randomUUID() + fileName.substring(fileName.lastIndexOf('.'));

            s3Client.putObject(new PutObjectRequest(bucket, objectName, file.getInputStream(), null)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            sb.append(s3Client.getUrl(bucket, objectName).toString()+",");
        }

        return sb.substring(0,sb.length()-1);

    }
}