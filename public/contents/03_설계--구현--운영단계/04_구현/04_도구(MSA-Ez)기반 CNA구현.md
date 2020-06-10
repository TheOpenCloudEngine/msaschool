## 도구(MSA-Ez)를 활용한 CNA 개발

### type A. 도구 및 Local IDE 활용
<details>
<summary>type A. 도구 및 Local IDE 활용</summary>
<p>

- 시나리오 : 주문팀에서 주문 발생(Ordered)시, 배송팀에서 주문에 따른 배송을 생성하고, 배송 이벤트(Shipped)를 발행한다.
 
- Step-1. 도구를 통한 마이크로서비스 모델링
  - http://msaez.io/ 접속
  - 샘플 모델 http://msaez.io/#/storming/nZJ2QhwVc4NlVJPbtTkZ8x9jclF2/every/1da4daa3c330f0f4960de6aefbe48f16/-M71ZQnITgjFnat_EsHk
  - 참고 영상 :  https://youtu.be/C1B5O6CM9zs
  - 고려사항 
    - Project Name에 '-'과 같은 문자가 포함되지 않았는가 ?
    - 바운디드 컨텍스트에 객체가 제대로 포함되었는가 ?
    
- Step-2. 모델 상세정보 설정(모델 속성, 이벤트 속성 및 컨텍스트 매핑)
  - 참고영상 : https://youtu.be/oCWTze2KS7E
  - 고려사항 
    - Command와 Event에 매핑되지 않고 누락된 어그리게잇은 없는가?
    - 생성 이벤트(~등록됨, ~생성됨) 트리거를  PostPersist 시점으로 Hooking 하였는가 ?
    - 삭제 이벤트(~삭제됨) 트리거를 prePersist 시점으로 Hooking 하였는가 ?
    
- Step-3. 코드 Preview, Download, and Open in IntelliJ IDE
  - 참고영상 : https://youtu.be/S2ig_1AL8JE
  
- Step-4. CNA 구현에 필요한 Software 설치 및 테스트
  - 참고영상 :  https://youtu.be/bk9Sr1rZg5w
  - Kafka 설치 (Linux)
    curl -o kafka2.5.tgz -l http://mirror.navercorp.com/apache/kafka/2.5.0/kafka_2.13-2.5.0.tgz
    tar -xvf kafka2.5.tgz
  - zookeeper 실행
    cd  kafka_2.13-2.5.0/bin
    ./zookeeper-server-start.sh ../config/zookeeper.properties 
  - kafka 실행
    cd  kafka_2.13-2.5.0/bin
    ./kafka-server-start.sh ../config/server.properties
    
  - Topic을 통한 메세지 통신 예시
    - 토픽 생성
      cd  kafka_2.13-2.5.0/bin
      ./kafka-topics.sh --zookeeper localhost:2181 --topic eventTopic --create --partitions 1 --replication-factor 1
    - 토픽 리스트 보기
      ./kafka-topics.sh --zookeeper localhost:2181 --list
    - 이벤트 발행하기
      ./kafka-console-producer.sh --broker-list http://localhost:9092 --topic eventTopic
    - 이벤트 수신하기 
      ./kafka-console-consumer.sh --bootstrap-server http://localhost:9092 --topic eventTopic --from-beginning
      
- Step-5. order 서비스의 이벤트 Publish 
  - 참고영상 : https://youtu.be/-0qyOsDfnEQ
  - MSA가 ubuntu kafka Server를 사용하도록 설정
    - Ubuntu에서 ifconfig 실행 후, IP 정보를 windows hosts 파일에 등록
    - xxx.xx.xx.xxx    HOSTNAME.localdomain
    - application.yml 에도 broker IP설정
      - 16행, brokers: xxx.xxx.xx.xx:9092
  - order MSA 실행 및 REST 호출 
    - http POST http://localhost:8081/orders productId=1001 qty=3
    - kafka Consumer에서 이벤트 Publish 확인 
  - Trouble Shooting
    - [Error] org.springframework.messaging.MessageDeliveryException: Dispatcher has no subscribers..... 
      - Solution : PolicyHandler.java 에 아래 코드 추가
      
      @StreamListener(KafkaProcessor.INPUT)
      public void onEvent(@Payload String message) { }
      
    - Connection to node -1 could not be established. Broker may not be available.
      - Solution : Kafka Server를 인식하지 못해 발생, kafka Server의 실행 상태를 확인하거나, Windows hosts 화일에 kafka broker정보의 정상 등록 확인
      
      xxx.xx.xx.xxx    HOSTNAME.localdomain
      
    - An exception occurred while running. null: InvocationTargetException: Either 'name' or 'value' must be provided in @FeignClient
      - Solution : FeignClient가 사용된 코드의 name, 또는 value 확인
    - Port Binding 오류 시,
      - Solution : 실행 중인 서비스가 정상적으로 종료되지 않아 발생한 Port 충돌로, 종료되지 않은 프로세스를 확인하고 종료 후 재실행
      
      - 프로세스 확인 및 종료 방법
      netstat -ano | findstr PID :808
      taskkill /pid 18264 /f
      
      
- Step-6. delivery Policy(PolicyHandler.java) Biz-Logic 구현 및 테스트 
  - 참고영상 : https://youtu.be/3alTcOnkTdY
  - delivery PolicyHandler Code
    ````java
    
    @Autowired
    DeliveryRepository deliveryRepository;
    
    @StreamListener(KafkaProcessor.INPUT)
    public void wheneverOrdered_Ship(@Payload Ordered ordered){
    
        if(ordered.isMe()){
            Delivery delivery = new Delivery();
            delivery.setOrderId(ordered.getId());
            delivery.setStatus(Shipped);
    
            deliveryRepository.save(delivery);
        }
    }
    ````
  - delivery MSA 실행 및 REST 호출 
    - http POST http://localhost:8081/orders productId=1002 qty=3
    - kafka Consumer에서 이벤트 Publish 확인 
  - 테스트 고려사항 :
    - 테스트 수행 시, 파라미터의 Type이 제대로 지켜졌는가 ?
    - 포트를 통한 서비스 실행 확인 : netstat -ano | findstr PID :808
    
- Step-7. Gateway를 통한 서비스 라우팅
  - 참고영상 : https://youtu.be/JjoGQ-sg3nw
  - application.yml 화일 수정 : 18라인,  Path=/deliveries/**, /cancellations/** 
  - 포트를 통한 서비스 실행 확인 : netstat -ano | findstr PID :808
  
- Step-8. 동기호출(Request/Response) 
  - Order.java에서 FeignClient 구현
    Order.java 36행
    cancellation.setOrderId(this.getId());
    cancellation.setStatus(CANCELED);
  - http DELETE http://localhost:8081/orders/1
  
- Step-9. CQRS (Dashboard, Mypage,... ) 추가


</p>
</details>
<br />

<hr/>

### type B. 도구 및 Cloud IDE 활용

<details>
<summary>type B. 도구 및 Cloud IDE 활용</summary>
<p>


- 시나리오 : 주문팀에서 주문 발생(Ordered)시, 배송팀에서 주문에 따른 배송을 생성하고, 배송 이벤트(Shipped)를 발행한다.
 
- Step-1. 도구를 통한 마이크로서비스 모델링
  - http://msaez.io/ 접속
  - 샘플 모델 http://msaez.io/#/storming/VdykvRQp3sZo5sXWaKm6iy81wop2/mine/530eba2af53a4a0a2d63975e06b1d828/-M91BRFWY2cmCKGeHUh_
  - 참고 영상 :  https://youtu.be/C1B5O6CM9zs
  - 고려사항 
    - Project Name에 '-'과 같은 문자가 포함되지 않았는가 ?
    - 바운디드 컨텍스트에 객체가 제대로 포함되었는가 ?
    
- Step-2. 모델 상세정보 설정(모델 속성, 이벤트 속성 및 컨텍스트 매핑)
  - 참고영상 : https://youtu.be/oCWTze2KS7E
  - 고려사항 
    - Command와 Event에 매핑되지 않고 누락된 어그리게잇은 없는가?
    - 생성 이벤트(~등록됨, ~생성됨) 트리거를  PostPersist 시점으로 Hooking 하였는가 ?
    - 삭제 이벤트(~삭제됨) 트리거를 prePersist 시점으로 Hooking 하였는가 ?
    
- Step-3. fork and Open in Cloud IDE
  - 오른쪽 상단의 fork 버튼을 클릭하여 자신의 레파지토리로 이동합니다.
  - ![Event01](/img/03_Bizdevops/04/02/stmfork.png)

  - 오른쪽 상단의 'Code' 에 마우스를 올려서 Project IDE 를 클릭하여 IDE 화면으로 이동합니다.
  
- Step-4. IDE 카프카 테스트
  - 참고영상 :  https://youtu.be/bk9Sr1rZg5w
  - Topic을 통한 메세지 통신 예시

    - 토픽 생성
      /usr/local/kafka/bin/kafka-topics.sh --zookeeper localhost:2181 --topic eventTopic --create --partitions 1 --replication-factor 1

    - 토픽 리스트 보기
      /usr/local/kafka/bin/kafka-topics.sh --zookeeper localhost:2181 --list

    - 이벤트 발행하기
      /usr/local/kafka/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic eventTopic

    - 이벤트 수신하기 
      /usr/local/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic eventTopic --from-beginning
      
- Step-5. order 서비스의 이벤트 Publish 
  - 참고영상 : https://youtu.be/-0qyOsDfnEQ
  - order MSA 실행 및 REST 호출 
    - 터미널을 엽니다.
    - cd orders
    - mvn spring-boot:run

    - 새로운 터미널을 열어서 주문을 합니다.
    - http POST http://localhost:8081/orders productId=1001 qty=3
    
    - kafka Consumer에서 이벤트 확인 
      - /usr/local/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic shopide --from-beginning

    - [참고] 카프카의 --topic shopide 부분에 토픽명칭을 정확히 넣어야 합니다. 토픽 명칭을 확인하는 방법은 resources/appication.yml 파일의 spring.cloud.stream.bindings.event-out.destination 입니다.
      
      
- Step-6. delivery Policy(PolicyHandler.java) Biz-Logic 구현 및 테스트 
  - 참고영상 : https://youtu.be/3alTcOnkTdY
  - delivery PolicyHandler Code
    ````java
    
    @Autowired
    DeliveryRepository deliveryRepository;
    
    @StreamListener(KafkaProcessor.INPUT)
    public void wheneverOrdered_Ship(@Payload Ordered ordered){
    
        if(ordered.isMe()){
            Delivery delivery = new Delivery();
            delivery.setOrderId(ordered.getId());
            delivery.setStatus("Shipped");
    
            deliveryRepository.save(delivery);
        }
    }
    ````
  - delivery MSA 실행 및 REST 호출 
    - cd delivery
    - mvn spring-boot:run

    - http POST http://localhost:8081/orders productId=1002 qty=3
    - kafka Consumer에서 이벤트 확인 
  - 테스트 고려사항 :
    - 테스트 수행 시, 파라미터의 Type이 제대로 지켜졌는가 ?
    - Save 를 잘 하였는지 확인 (ide 상단의 파일에 하얀색 동그라미가 있으면 파일 수정 후 저장이 안된 것입니다.)
    
- Step-7. Gateway를 통한 서비스 라우팅
  - 참고영상 : https://youtu.be/JjoGQ-sg3nw
  - application.yml 화일 수정 : 18라인,  Path=/deliveries/**, /cancellations/** 
  - cd gateway
  - mvn spring-boot:run

  - 게이트웨이 주소를 통하여 주문 발송
  - http POST http://localhost:8088/orders productId=1002 qty=3
  - kafka Consumer에서 이벤트 확인 

  
- Step-8. 동기호출(Request/Response) 
  - Order.java에서 FeignClient 구현
    Order.java 36행
    cancellation.setOrderId("this.getId()");
    cancellation.setStatus("CANCELED");

  - external/CancellationService.java 파일의 11행 url 변경
    http://delivery:8080 -> http://localhost:8082

  - order 서비스 재실행 후 주문 및 주문 취소

  - 주문
    - http POST http://localhost:8081/orders productId=1001 qty=3
  - 주문 취소
    - http DELETE http://localhost:8081/orders/1

  - kafka Consumer에서 이벤트 확인 

  ```
  ## 결과 데이터

  {"eventType":"Ordered","timestamp":"20200605034240","id":1,"productId":"1001","qty":3,"me":true}
  {"eventType":"Shipped","timestamp":"20200605034240","id":4,"orderId":1,"status":"Shipped","me":true}

  {"eventType":"DeliveryCanceled","timestamp":"20200605034645","id":2,"orderId":"1","status":"CANCELED","me":true}
  {"eventType":"OrderCanceled","timestamp":"20200605034644","id":1,"productId":"1001","qty":3,"me":true}

  ```
  
- Step-9. CQRS (Dashboard, Mypage,... ) 추가



</p>
</details>
<br />

