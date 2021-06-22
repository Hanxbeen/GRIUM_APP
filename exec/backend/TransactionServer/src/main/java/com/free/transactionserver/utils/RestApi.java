package com.free.transactionserver.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Component;

@Component
public class RestApi {

    public String get(String strUrl){
        String str = null;

        try {
            URL url = new URL(strUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);
            // conn.addRequestProperty("x-auth-token", apikey); //api 키값 설정
            conn.setRequestMethod("GET");
            conn.setDoOutput(false);

            StringBuilder sb = new StringBuilder();
            if(conn.getResponseCode() == HttpURLConnection.HTTP_OK){
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
                String line;
                while((line=br.readLine()) != null) {
                    sb.append(line).append("\n");
                }
                br.close();
                str = sb.toString();
                System.out.println(str);
            } else{
                str = conn.getResponseMessage();
                System.out.println(str);
            }
            conn.disconnect();
            return str;
        } catch (Exception e) {
            System.err.println(e.toString());
            return str;
        }
    }

    public String post(String strUrl, String jsonMessage){
        String str = null;
        try {
            URL url = new URL(strUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);
            // conn.addRequestProperty("x-auth-token", apikey); //api 키값 설정
            conn.setRequestMethod("POST");
            
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoInput(true);
            conn.setDoOutput(true);
            conn.setUseCaches(false);
            conn.setDefaultUseCaches(false);

            OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
            wr.write(jsonMessage);
            wr.flush();

            StringBuilder sb = new StringBuilder();
            if(conn.getResponseCode() == HttpURLConnection.HTTP_OK){
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
                String line;
                while((line=br.readLine()) != null) {
                    sb.append(line).append("\n");
                }
                br.close();
                str = sb.toString();
                System.out.println(str);
            } else{
                str = conn.getResponseMessage();
                System.out.println(str);
            }
            conn.disconnect();
            return str;
        } catch (Exception e) {
            System.err.println(e.toString());
            return str;
        }
    }
}
