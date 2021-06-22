# Welcome to Grium 🌕

![logo](https://user-images.githubusercontent.com/60593545/119283903-4f27b880-bc79-11eb-9268-720eb1602078.png)

> 그리움 (Grium) 어플리케이션

## 🏠 Android 출시
<img src="https://user-images.githubusercontent.com/38396374/119348279-9c3a7780-bcd7-11eb-985d-06e72811f6ae.png" height="500px"/>
<br/>
~~현재는 서버 유지 비용 문제로 close..~~

<br>

## 👨‍👩‍👦팀원소개

![image](https://user-images.githubusercontent.com/60593545/119286578-a9c41300-bc7f-11eb-8742-fdd071a61514.png)



**Min Jung Kim**

- 🐲Github: [@kimmj0920](https://github.com/kimmj0920)

**Jong Hui Lee**

- 🍒Github: [@hie6953](https://github.com/hie6953)

**Yong Ryeol Bae**

- 🧙‍♂️Github: [@GreenCheese-dev](https://github.com/GreenCheese-dev)

**June Young Jo**

- 🐷Github: [@juneyoung-jo](https://github.com/juneyoung-jo)

**Han Been Jo**

- 🐰Github: [@Hanxbeen](https://github.com/Hanxbeen)

**Jae Hee Han**

- 🐼Github: [@HanJaehee](https://github.com/HanJaehee)

<br>

## 📆 프로젝트 개요

- **진행 기간**: 2021.04.12 ~ 2021.05.21
- **목표**
  - 나의 생전 모습을 기록하고 공유하고 싶은 사람,
  - 손쉽게 고인과의 생전 추억을 공유하고 싶은 사람,
  - 간편하게 부조금을 송금하고 싶은 사람,
  - 투명하게 부조금을 관리하고 싶은 사람,
  - :star: 이 모든 사람들을 위한 서비스 만들기
- **어플리케이션 이름**: Grium (그리움)
  - 고인을 추모하는 모바일 장례 및 추모 서비스
- **슬로건**: '소중한 사람을 오래도록 기억할 수 있는 서비스, 그리움'


## 📒 Tech Log
<ul>
    <a href="https://www.notion.so/2e462f8e0a75469baf29d57e64c04fc0?v=0fdb88e7f21b47ba8af09c61358fa757">
    <li>그리움 회의록</li></a>
    <a href="https://www.notion.so/c7ef04d785d44ce4b63c1fa8e5fd697a">
    <li>Git Convention</li></a>
    <a href="https://www.notion.so/fdd8728399ed4eb0b640c236f551091c">
    <li>그리움 Proposal</li></a>
    <a href="https://www.notion.so/UseCase-579ef97333444430851dde60d564697c">
    <li>그리움 UseCase</li></a>
    <a href="https://docs.google.com/presentation/d/1JxlPMIDtC__NCvT0ChVudRGe4AhB03ixQ3CE1M9wKX8/edit#slide=id.g714a506a68_0_257">
    <li>그리움 Presentation</li></a>
    <a href="UCC">
    <li>그리움 UCC</li></a>

</ul>

## 🔧 Tech Stack

<details>
    <summary>Front-App 자세히 살펴보기</summary>
    <ul>
	    <li>React : 17.0.1</li>
        <li>React-native : 0.64.0</li>
        <li>Recoil : 0.2.0</li>
    </ul>
</details>

<details>
    <summary>Front-Web 자세히 살펴보기</summary>
    <ul>
        <li>Vue : 2.6.11</li>
        <li>Vue router : 3.5.1</li>
        <li>Vuex : 3.6.2</li>
        <li>Vue-slide-tabs : 1.1.3</li>
        <li>Vuetify : 2.5.0</li>
        <li>SweetAlert2 : 10.16.7</li>
        <li>axios : 0.21.1</li>
    </ul>
</details>

<details>
    <summary>Back 자세히 살펴보기</summary>
    <ul>
        <li>Swagger : 3.0.0</li>
        <li>Spring Boot</li>
        <li>Spring Security</li>
        <li>Spring Jenkins</li>
        <li>Spring Cloud</li>
        <li>Netflix OSS</li>
        <li>NGINX</li>
        <li>EC2</li>
        <li>Docker</li>
        <li>Mysql</li>
    </ul>
</details>

<br>

## ⚙️ Install and Usage

### Frontend-App

> 모바일 설치 방법

- frontend/android/app/release/app-release.apk 설치

- (주의) 서버 통신 불가 시 URL 변경 후 재 빌드 필요!
  - exec/frontend/api/http.js 에서 각 서버 별 baseURL을 변경해주세요 ( 로컬 실행 시 인증 서버의 경우, http://localhost:8443)
  - 각 서버별 포트는 백엔드에 소개

> 프론트엔드 에뮬레이터 실행방법

- 안드로이드 스튜디오에서 가상장치 설정
- 
	 ```bash
		#관련 모듈 설치
		$ yarn install
	
		#파일을 빌드후 실행
		$ yarn android
   ```

	-   gradle 버전 관련 오류 발생시 [](https://yoonho-devlog.tistory.com/165)[https://yoonho-devlog.tistory.com/165](https://yoonho-devlog.tistory.com/165)
	-   가상장치 커스텀 [](https://csc0705.tistory.com/60)[https://csc0705.tistory.com/60](https://csc0705.tistory.com/60)

### Frontend-Web
- web 폴더로 들어와 필요한 패키지를 설치합니다.

  - ```bash
    $ npm install
    ```

- web 폴더 (vue 프로젝트)를 실행합니다.
  - ```bash
    $ npm run serve
    ```

### Backend
- 포트
  - AuthServer(인증 서버) : 8443
  - CondolenceServer(고인 서버) : 8001
  - TransactionServer(거래 서버) : 8081
#### 로컬에서의 백엔드 실행 방법

- 각 서버간 호출 함수들이 존재합니다. 해당 주소들은 모두 localhost 기반으로 변경해놓았고, 배포 환경에서는 변경 해주어야 함.

1. AuthServer 빌드 및 실행 
2. CondolenceServer 빌드 및 실행
3. TransactionServer 빌드 및 실행

ex) AuthServer 의 경우

```
cd exec/backend/AuthServer
./gradlew build
cd build/libs
nohup java -jar authsvr-0.0.1-SNAPSHOT.jar > auth.log 2>&1 &
```

-이외의 서버(Spring Cloud Zuul, Eureka, Config)들은 클라우드 전용세팅이라 로컬에선 실행 안함


> **ECS 실행화면**

**ECS Cluster**

![ECS_Cluster.png](Documentation/Image/ECS_Cluster.jpeg)

**ECS Task**

![ECS_Task.png](Documentation/Image/ECS_Task.jpeg)

> **DB 설정 및 실행**

**Mysql DB 설정**

- 각각 서버의 application.yml에 db와 jpa설정을 해줍니다.
```java
spring:
  application:
    name: authserver
  datasource:
    url: jdbc:mysql://k4c104.p.ssafy.io:3306/{Database Name}?useSSL=false&useUnicode=true&serverTimezone=Asia/Seoul
    username: {db username}
    password: {db password}

  jpa:
    show-sql: true
    hibernate:
      # create : drop + create, create-drop : drop + create + drop, update : compare > diff > update, validate : compare > diff > end application
      ddl-auto: {ddl 설정, 위 주석과 같이 동작함}
      naming-strategy: org.hibernate.cfg.ImprovedNamingStrategy
      use-new-id-generator-mappings : true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL5InnoDBDialect
        format-sql: true
```

**DB 테이블 생성**

- 첫번째 방법 : 서버를 실행하면 JPA가 Entity로 등록된 테이블을  자동으로 생성해줍니다.
- 두번째 방법 : [grium.sql](https://lab.ssafy.com/s04-final/s04p31c104/blob/master/exec/grium.sql "grium.sql")을 이용하여 DB 테이블을 생성합니다.

**KAKAO API**

- 로그인 : https://github.com/react-native-seoul/react-native-kakao-login 내 문서 참조
- PAY : https://developers.kakao.com/docs/latest/ko/kakaopay/common 내 문서 참조( 해당 프로젝트는 REST API로 구현되어 있음 )

<br>

## ✨개발목표

> 고인을 추모할 수 있는 소셜 네트워크 서비스

#### 고인을 추모할 수 있는  '기억공간'

- 고인의 영정사진, 유언, 생전 사진들, 방문객의 사진들, 방문록을 통하여 고인을 기릴수 있습니다.

#### 카카오 페이를 이용한 간단한  '부조금 송금'

- 카카오 페이를 이용하여 빠르게 상주에게 부조금을 송금할 수 있습니다.

#### 비회원에게 공유하기 위한  '웹 미리보기'

- URL을 통하여 웹으로 미리보기 페이지를 공유할 수 있습니다.

<br>

## ⭐️ 주요 기능

### 로그인

> 카카오 api를 이용한 로그인

- 로그인
  -  카카오계정과 애플리케이션을 연결하고 사용자 정보로 서비스 회원가입



### 메인 탭 (하단 탭바, 왼쪽 집 모양 아이콘)

> 유저들의 기억공간을 모아 놓은 공간

- 지인 / 공개 탭
  -  지인 탭 
    - 이 앱을 사용중인 카카오 친구들 중 친구 관계를 추가한 사람 혹은 가족 관계로 추가한 사람들의 기억공간 출력
    - 지인이 없을 경우 친구 관리 페이지로 유도
  - 공개 탭
    - 기억공간 생성 시 공개를 선택한 기억공간들을 출력
- 캐러셀
  - 지인 / 공개 선택에 따른 기억공간 데이터 표시 및 장례 진행 중일 경우 리본 뱃지 표시
- 기타
  - 좌측상단 돋보기 버튼
    - 검색 페이지 이동
  - 우측상단 종 버튼
    - 알람 페이지 이동
    - 알람이 있을 경우 갯수 표시



### 검색 페이지

> 유저 이름 입력을 통한 기억공간 검색

- 검색
  - 이름 입력을 통해 검색
  - x 버튼을 눌러 입력 텍스트 비우기
  - 기억공간 버튼을 통해 해당 유저의 기억공간으로 이동 가능



### 알림 페이지

> 친구 요청 또는 관계 요청이 있을 경우 알림

- 관계 요청
  - 요청을 수락한 경우 서로 친구 관계 또는 가족 관계가 형성



### 기억공간 페이지

> 한 사람이 기억될 정보와 사진, 글들이 담긴 공간

- 고인 정보
  - 이름, 생몰일, 유언 표시
- 애도하기
  - 애도하기 버튼(하트) 클릭 시 카운트 증가
- 장례 정보 탭
  - 장례 중일 경우 장례식장 위치 출력, 장례 후는 장지 위치 출력
  - 고인의 가족관계 출력
  - 마음전달 버튼을 통해 부조금 전달 페이지로 이동
- 고인 앨범
  - 고인이 생전에 올린 사진 출력
- 공유 앨범
  - 지인들이 올린 사진 출려
  - 사진 올리기 (지인만 가능)
- 방명록
  - 지인들이 올린 글 출력
  - 방명록 작성 (지인만 가능)
- 게시물
  - 작성자는 게시물을 수정 및 삭제 가능
  - 게시물 신고 기능
    - 게시물에 신고 5회 카운트 시 해당 게시물 출력x
  - 게시물 좋아요
    - 좋아요 누른 게시물 상단에 출력
- 공유 버튼
  - 웹 페이지 공유 링크를 클립보드에 복사



### 고인 등록 탭

> 가족 관계로 등록된 유저가 별세 시 해당 유저의 기억공간을 등록하는 기능

- 가족관계 선택 단계
  - 가족으로 관계가 등록된 유저 중 고인 등록을 할 유저를 선택함.
  - 가족 관계는 사전에 "추가기능" 탭 안에서 가족관리를 통해 등록할 수 있음.
  - 가족 관계가 등록이 안된 유저는 고인 등록 자격이 없음 .
- 고인 정보 및 장례 정보 선택 단계
  - 고인의 영정사진 등록
    - 고인이 된 유저가 사전에 등록해놓은 영정사진이 있다면, 등록된 영정사진을 변경할 수 없음.
  - '고인 성함', '별세일', '발인일', '장례식장 위치', '장지 위치' 입력
    - 주소 API를 활용하여 장례와 관련된 장소 검색 기능 제공
- 기억공간 공개범위 선택 및 가족관계 확인 단계
  - 고인의 기억공간을 '공개', '지인' 선택가능
    -  지인 선택 시 카카오톡 친구이면서 그리움의 유저들끼리만 접근 가능
  - 고인의 가족관계 최종 확인 가능



### 추가 기능 탭

> 기억공간, 알림, 나의 그리움, 설정

- 나의 기억 공간 꾸미기 페이지 이동 버튼
- 관계 요청이 들어온 리스트 페이지
- 상주로 등록된 고인 정보 리스트 페이지
- 기타 설정 페이지



### 나의 기억 공간

> 생전에 나의 기억공간을 꾸밀 수 있는 기능

- 나의 정보 수정 기능 제공
  - 생년월일
  - 유언

- 남기고 싶은 사진게시글 업로드 및 삭제 기능 제공
  - 기억공간의 고인앨범 탭에 저장됨
- 가족 관리 기능 제공
  - 가족 관리 버튼을 통해서 카카오톡 친구 중 가족으로 요청 가능
  - 상대방 수락 시에만 관계 형성
- 나의 영정사진 등록
  - 영정사진 등록 시 사후 영정사진으로 고정
- 친구 관리 기능 제공
  - 카카오톡 친구 리스트 중 친구로 등록 및 삭제 가능
- 고인 앨범 등록
  - 유저가 기억되고싶은 사진 게시글을 등록하는 기능
- 기억공간 미리보기 기능 제공
  - 고인 앨범 외 기능 제한



### 나의 그리움

> 상주로서 등록한 가족 리스트 제공

- 고인 기억공간 바로가기 버튼 제공

- 부조현황 버튼을 눌러 카카오페이로 결제된 내역 확인 가능

  

### 마음 전달(조의금) 전달 페이지

> 고인의 기억공간에서 조의금으로 마음을 전달하는 기능

- 부조금 전달 기능 제공
  - 고인의 가족관계로 등록된 유저만 선택 가능
- 카카오 페이 연동



## 👀 페이지 소개

![grium 동작상세](https://user-images.githubusercontent.com/28583368/119314453-bb251380-bcaf-11eb-95dc-dad7b72ad391.jpg)
![grium 동작상세2](https://user-images.githubusercontent.com/28583368/119314467-bfe9c780-bcaf-11eb-9463-274c9ec247e6.jpg)
![grium 동작상세3](https://user-images.githubusercontent.com/28583368/119314473-c1b38b00-bcaf-11eb-914b-5e40818c04ea.jpg)
![grium 동작상세4](https://user-images.githubusercontent.com/28583368/119314477-c2e4b800-bcaf-11eb-8040-ae9d56b09381.jpg)
![grium 동작상세5](https://user-images.githubusercontent.com/28583368/119314484-c415e500-bcaf-11eb-8a2d-41d761783f60.jpg)
![grium 동작상세6](https://user-images.githubusercontent.com/28583368/119314490-c4ae7b80-bcaf-11eb-9302-72a15f07f92d.jpg)
![grium 동작상세7](https://user-images.githubusercontent.com/28583368/119314491-c5dfa880-bcaf-11eb-84c7-d698a1215391.jpg)
![grium 동작상세8](https://user-images.githubusercontent.com/28583368/119314495-c6783f00-bcaf-11eb-8d1f-2bab9e885a8f.jpg)
![grium 동작상세9](https://user-images.githubusercontent.com/28583368/119314497-c710d580-bcaf-11eb-81ea-f6358dc232f7.jpg)
![grium 동작상세10](https://user-images.githubusercontent.com/28583368/119314501-c8420280-bcaf-11eb-9ba9-0735f76fc8b0.jpg)
![grium 동작상세11](https://user-images.githubusercontent.com/28583368/119314506-c9732f80-bcaf-11eb-8b9e-c726ecae12bb.jpg)
![grium 동작상세12](https://user-images.githubusercontent.com/28583368/119314511-caa45c80-bcaf-11eb-991e-04d20b0f7f3e.jpg)
![grium 동작상세13](https://user-images.githubusercontent.com/28583368/119314515-cbd58980-bcaf-11eb-91e6-84b0bf482906.jpg)
![grium 동작상세14](https://user-images.githubusercontent.com/28583368/119314523-cd06b680-bcaf-11eb-83c3-82ed6655adae.jpg)





## 🎞 최종산출물

- [최종발표 UCC](https://lab.ssafy.com/s04-final/s04p31c104/blob/master/Documentation/UCC/%EA%B7%B8%EB%A6%AC%EC%9B%80_%EC%9E%90%EC%9C%A8_UCC.zip)
- [최종발표 PDF](https://lab.ssafy.com/s04-final/s04p31c104/blob/master/Documentation/Presentation/%EA%B7%B8%EB%A6%AC%EC%9B%80_%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C.pdf)

