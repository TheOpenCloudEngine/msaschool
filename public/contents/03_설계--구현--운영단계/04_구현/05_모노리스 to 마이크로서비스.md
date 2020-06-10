## 모노리스 서비스를 마이크로 서비스로 전환 실습

이번 시간은 Monolith 로 되어 있는 서비스를 마이크로 서비스로 분리하는 실습을 할 것 입니다.  
실습 순서는 Monolith 서비스를 기동하여 본 후, 그중 Delivery 부분을 신규 마이크로 서비스로 떼어내는 작업을 할 것입니다.  
떼어내고 난 후, 두개의 서비스를 연결 하기 위하여 Request/Response 방식이 필요한데, **도메인의 변화를 최소화 시킬 수 있는 방식인 Feign 을 사용**하여 서비스 끼리의 통신을 구현 하도록 하겠습니다.  

1. 가장먼저 예제 서비스인 Monolith 를 가지고 와서 소스코드를 살펴 보겠습니다.
	- git clone https://github.com/event-storming/monolith.git
	- cd monolith
	- mvn spring-boot:run

2. Monolith 서비스는 주문,배송,상품 서비스가 하나의 서비스로 구현 되어 있는 예제 입니다. 서비스의 작동 방식을 확인 하기 위하여 주문을 생성 하고, 각각의 주문,배송,상품의 상태값을 확인 하여 보겠습니다.
	
	- 해당 서비스는 8088 포트로 기동이 됩니다.
		- http localhost:8088
	
	- 주문 데이터를 확인 합니다. 주문이 이루어 진적이 없기때문에, 초기값은 없습니다.  
		- http http://localhost:8088/orders

	- 배송 데이터를 확인 합니다. 주문이 이루어 진적이 없기때문에, 초기값은 없습니다.  
		- http http://localhost:8088/deliveries

	- 초기 상품데이터가 셋팅 되어있습니다.  
		- http http://localhost:8088/products

	- 주문을 합니다.
		- http localhost:8088/orders productId=1 quantity=3 customerId="1@uengine.org" customerName="홍길동" customerAddr="서울시"

	- 주문 후 배송 상태를 확인 합니다. 두개의 Entity 가 연결되어 있기 때문에 배송링크에서 주문상태를 볼 수 있습니다.
		- http http://localhost:8088/deliveries
		![code01](/img/03_Bizdevops/04/05/03_04_05_11.png)
		
		- http http://localhost:8088/deliveries/1/order
		![code02](/img/03_Bizdevops/04/05/03_04_05_12.png)

3. Feign 방식은 넷플릭스에서 만든 Http Client 입니다. Feign 방식은 Http call 을 할 때, 도메인의 변화를 최소화 하기 위하여 inferface 로 구현체를 추상화 한 것입니다. 이것을 스프링 클라우드에서 사용하기 쉽도록 openfeign 이라는 이름으로 라이브러리 화 되어있습니다. 아래 작업을 실행하여 FeignClients를 사용할 준비를 합니다.

	- FeignClient 를 사용하기 위하여 pom.xml 에 해당 디펜던시를 추가 합니다.
	```xml

	<!-- feign client -->
	<dependency>
	   <groupId>org.springframework.cloud</groupId>
	   <artifactId>spring-cloud-starter-openfeign</artifactId>
	</dependency>
	```

	- monolith 프로젝트의 Application.java 파일에 @EnableFeignClients 추가합니다.
	```java
 
	@SpringBootApplication
	@EnableFeignClients
	public class Application {
		// do something
	}
	```


4. 주문이 발생시 배송 지시를 내리는 코드는 Order.java 의 @PostPersist 에 매칭이 되어있습니다.  
	내부 메서드의 배송 시작을 하는 부분은 startDelivery 메서드 인데 실제 구현은 DeliveryServiceImpl 에 되어있습니다.

	#### Order.java
	```java
 
	@PostPersist
    private void callDeliveryStart(){
    	...
		// 배송 시작
        DeliveryService deliveryService = Application.applicationContext.getBean(DeliveryService.class);
        deliveryService.startDelivery(delivery);
    }
	```

	#### DeliveryService.java
    ```java
    
    @Service
	public interface DeliveryService{
	    public void startDelivery(Delivery delivery);
	}
    ```
    
    #### DeliveryServiceImpl.java
    ```java
    
    @Service
	public class DeliveryServiceImpl implements DeliveryService{

	    @Autowired
	    DeliveryRepository deliveryRepository;

	    /**
	     * 배송 시작
	     */
	    public void startDelivery(Delivery delivery){
	        deliveryRepository.save(delivery);
	    }
	}
    ```

5. 실제 호출을 FeignClient 로 변경하기 위하여 아래와 같은 작업을 진행 합니다.
	
	- DeliveryServiceImpl.java 파일의 모든 내용을 주석 처리 합니다.

	- DeliveryService.java 파일의 @FeignClient 와 @RequestMapping 의 주석을 해제 합니다.

    #### DeliveryService.java
	```java

	@FeignClient(name ="delivery", url="${api.url.delivery}")
	public interface DeliveryService {
	    @RequestMapping(method = RequestMethod.POST, value = "/deliveries", consumes = "application/json")
	    void startDelivery(Delivery delivery);
	}
	```

	- interface 앞에 @FeignClient 어노테이션을 사용하였습니다. @FeignClient 에는 url 값을 넣을 수 있는데, 보통 호출하려는 서비스의 base url 이 됩니다. 세부 api 를 아래 @RequestMapping 에 매핑을 시키게 됩니다.
	- 위의 메서드는 만약 api.url.delivery 이 localhost:8082 라면  "http://localhost:8082/deliveries" 로 호출을 하게 됩니다.

	- spring-boot 에서 어노테이션에 ${} 부분은 설정값에 있는 변수를 가져오는 부분입니다. 도메인 주소는 변경될수 있고, 로컬과 클러스터별로 다를 수 있기 때문에, application.yaml 에서 관리를 하였습니다.

	- application.yaml 파일의 api.url.delivery 값을 설정 합니다.
	```yaml
 
	api:
	  url:
	    delivery: http://localhost:8082
	```



6. 다음 작업은 더이상 Delivery 를 내부 데이터베이스로 관리를 안 할 것이기 때문에 Order 와 Delivery 간의 관계를 제거합니다. 둘간의 관계는 @OneToOne 관계 인데, 해당 관계를 제거 하고 id 값을 넣어줍니다.

	- Order.java 의 @OneToOne Delivery delivery; 주석 처리 합니다.
	#### Order.java
	```java
	//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "order")
	//    @PrimaryKeyJoinColumn
	//    private Delivery delivery;

	... 하단의 get/set 부분 주석
	//    public Delivery getDelivery() {
	//        return delivery;
	//    }
	//    public void setDelivery(Delivery delivery) {
	//        this.delivery = delivery;
	//    }
	```

	- Order.java 의 callDeliveryStart() 메서드안쪽에서 delivery 에 Order 를 set 하였던 부분을 주석 처리하고, delivery.setOrderId(this.getId()); 를 주석 해제 하여, 객체가 아닌 id 값을 넘길수 있도록 준비합니다.
	#### Order.java
	```java

	//	  delivery.setOrder(this);
        delivery.setOrderId(this.getId());
	```

	- Delivery.java 의 @OneToOne Order order; 주석 처리 합니다.
	#### Delivery.java
	```java

	//    @OneToOne(cascade = CascadeType.ALL)
	//    @PrimaryKeyJoinColumn(name = "order_id", referencedColumnName = "deliveryId")
	//    private Order order;

	... 하단의 get/set 부분 주석
	//    public Order getOrder() {
	//        return order;
	//    }
	//    public void setOrder(Order order) {
	//        this.order = order;
	//    }

	```

	- Delivery.java 에서 주문 아이디를 받을 수 있도록 private Long orderId; 주석 해제 하고, get/set 메서드를 추가합니다.
	#### Delivery.java
	```java

	private Long orderId;
	public Long getOrderId() {
        return orderId;
    }
    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

	```

7. 위까지의 작업에서 monolith 서비스에서 주문 생성시, FeignClient 에 의하여 설정된 url 로 http call 을 실행 합니다. 이제 배송 서비스를 다운받아서 호출하여 보겠습니다. 
	- git clone https://github.com/event-storming/reqres_delivery.git

	- 소스코드를 다운 받은 후 한가지 작업이 필요합니다. 샘플 프로젝트에는 배송이 완료 된 후에 상품서비스의 데이터를 변경하는 코드가 들어 있습니다. 상품서비스는 다시 monolith 서비스를 호출 할 것이기 때문에 application.yaml 파일의 api.uri.product 부분을 http://localhost:8085 ->  http://localhost:8088 로 변경 합니다

	```yaml

	api:
	  url:
	    product: http://localhost:8088
	```

	- 서비스를 실행 합니다.
		- mvn spring-boot:run

	- 정상적으로 기동 되었는지 확인 합니다. 8082 포트로 서비스가 기동됩니다.
		- http http://localhost:8082/deliveries

8. monolith 서비스를 재시작 하고, 주문을 생성 하여 두개의 서비스에 데이터를 확인해 봅니다.
	- 주문을 합니다.
		- http localhost:8088/orders productId=1 quantity=3 customerId="1@uengine.org" customerName="홍길동" customerAddr="서울시"

	- 주문 후 모노리스 서비스의 배송 상태를 확인 합니다. 데이터를 넣은 적이 없기 때문에 값이 비어 있습니다.
		- http http://localhost:8088/deliveries

	- 새로 올린 배송 서비스에 데이터가 정상적으로 들어왔는지 확인 합니다. (port 확인)
		- http http://localhost:8082/deliveries
		![code03](/img/03_Bizdevops/04/05/03_04_05_14.png)

	- 배송서비스에서 상품 수량을 변경 하였기 때문에 아래와 같이 호출하여 상품수량이 변경 되었는지 확인 합니다.
		- http http://localhost:8088/orders/1/product


### 실습 리뷰

FeignClient 를 사용한 이번 실습의 핵심은 도메인에서 (Order.java) 기존의 호출 코드를 수정없이 신규 마이크로 서비스로 호출 하는 것입니다. deliveryService.startDelivery(delivery); 로 구현 되어있던 코드가 변경이 없이 인터페이스만 변경 하여 호출을 하였습니다.  

만약 FeignClient 를 안쓴다면, Springboot 의 RestTemplate 이나, httpClient 메서드를 직접 기존의 Impl 에서 구현을 하였을 것입니다. RestTemplate 을 사용하는 것이 더 쉬울 수 있으나, DDD 관점에서 FeignClient를 사용 하여 추상화 시켰다는 것이 이번 실습의 요지 였습니다.


<br/>










