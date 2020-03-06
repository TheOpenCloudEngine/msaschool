## Microservice Integration with by Event-Driven

이벤트 드리븐은 도메인에서 발생하는 **이벤트**를 비동기 호출로 상호 통신하는 방법입니다. 이 방법론이 마이크로 서비스에 적용되어 통합(Integration)을 수행하는 아키텍처를 이벤트 드리븐 마이크로 서비스(EDM) or 이벤트 드리븐 아키텍처(EDA)라고 부릅니다. 

이벤트 통신은 **비동기 메세지 통신**을 사용합니다.  

* **비동기 메세지 통신**은 서비스와 서비스간의 통신 사이에 메세징 큐 혹은 메세지 브로커를 통하여 통신을 합니다. 이벤트를 발송하는 부분을 publisher(게시자) or producer(제공자) 라고 부르고, 이벤트를 받아서 처리하는 부분을 subscriber(구독자) or receiver(수신자),consumer(소비자) 라고 부릅니다. 용어가 다양한 이유는 메세지 브로커 별로 호칭하는것이 다르기 때문입니다. 일반적으로 Pub/Sub(게시/구독) 모형이라고 호칭합니다.  

* **비동기 메세지 통신**은 '단일 수신자 메시지 기반 통신' 과 '다중 수신자 메시지 기반 통신' 두 가지가 있습니다. 

	- '단일 수신자 메시지 기반 통신' 채널을 통하여 제공자가 보낸 메세지를 수신자에게 정확히 전달을 하는 방법입니다. 수신자가 메세지를 못받거나 오류가 났을때, 재수신을 할 수 있어야 합니다. 

	- '다중 수신자 메시지 기반 통신'은 채널이 아닌 게시자가 방송(BroadCasting)을 하고 구독자는 해당 방송을 듣고 처리를 하는 방식입니다. 게시자는 구독이 정상적으로 하였는지에 대한 책임이 없기 때문에 서비스간의 커플링이 가장 적은 방법 입니다. 다만 메세지 브로커는 메세지가 정상적으로 게시 되었다는 것은 보장을 해줘야 합니다. 

* **비동기 메세지 통신**을 가능케 하는 메세지 브로커 솔루션은 여러가지가 있습니다. 그중 많이 쓰이는 솔루션은 RabbitMQ, Kafka, Active MQ 등이 있고, 각 클라우드 벤더사 (AWS, GCP 등) 도 개별 메세지 브로커 시스템(Amazon MQ, Cloud Pub/Sub 등)을 가지고 있습니다. 솔루션별로 특색이 있고, 솔루션은 항상 변화하기 때문에, 어느것을 쓰라고 정확히 말하지는 못하겠습니다. 다만, msaschool 에서는 Kafka 기반으로 예제를 작성하였습니다. Kafka 는 대용량 분산 메세지를 처리하는데 특화된 시스템으로 다른 메세지 솔루션에 비하여 빠르고 정확도가 높습니다.  

### 마이크로 서비스 아키텍처에서 가장 이상적인 모형은 내부 서비스 간에 비동기 메시징만을 사용하고, 클라이언트 앱에서 프런트 엔드 서비스(API 게이트웨이 + 첫 번째 수준의 마이크로 서비스)까지만 동기 통신(HTTP 같은)을 사용하는 것입니다.

<br/>

## Event-Driven 과 Request/Response 방식 비교

![](/img/03_Bizdevops/05/03/03_05_03_01.png)     

요청/응답 통신방법은 동기 통신에 단일 통신 방법입니다. 즉 요청자는 응답자의 주소를 알고 있어야 통신이 가능합니다. 이런 방식을 **Point to Point 방식**이라고 명칭합니다. 이 방식은 서비스가 늘어나고, 복잡해 질수록 기억해야 주소가 늘어납니다. 복잡하게 서비스들끼리 연결되어있다고 하여 **스파게티 네트워크(Spaghetti network)** 라고도 불리웁니다. 동기 통신이기 때문에 응답 서비스가 항상 떠있어야 하고, 응답서비스에서 오랜 시간을 소비하면 그만큼 응답이 늦어지기에 **Blocking Model** 입니다. 또한 요청 채인이 길어지면 **장애전파(Fault Spread)**의 위험성이 있습니다.

* 동기 통신
* Point to Point
* Spaghetti network
* Blocking Model
* 장애전파


이에 반하여 게시/구독(이벤트 드리븐) 통신 방법은 비동기 통신에 Broadcasting 이 가능합니다. 이벤트 게시자는 구독자의 주소를 몰라도 되고, 이벤트를 수신했는지 여부를 파악하지 않아도 되는 **Non-Blocking Model** 입니다. 수신자의 서비스가 항상 떠있지 않아도, 게시자는 메세지를 발송 할 수 있습니다. 이로 인하여 **장애가 격리(Fault Isolation)** 되어 집니다.

* 비동기 통신
* Broadcasting
* Non-Blocking Model
* 장애격리


<br/>

## Event Publish / Subscribe (PubSub) 내부 통신 방법

![](/img/03_Bizdevops/05/03/03_05_03_02.png)

이벤트 기반 아키텍처를 구성하는 방법은 서비스간의 통신에 **Event Queue** 를 두는 방법입니다. 위 그림을 보면 주문 서비스에서 홍길동이라는 사용자가 주문을 시작하였을때, 이벤트 메세지가 Pub 됩니다. 이 Pub 된 메세지는 **Event Queue**로 보내진 후에 구독자는 메세지를 수신하여 각자가 처리를 합니다. 그림에서는 배송 서비스는 배송을 처리하고, 상품 서비스는 재고량을 수정하는 작업이 동시에 이루어 집니다.  

만약 배송 서비스가 서비스가 중지 되어있다고 하더라도, **Event Queue** 에 메세지가 남아있기 때문에 서비스가 다시 기동되는 시점에 못받은 메세지 부터 차근차근 처리를 하면 됩니다. 이러한 방식으로 인하여, 주문이 폭주를 하는 상황에도 다른 서비스들이 **Core Domain** 에게 리소스를 양보를 할 수 있습니다.

**Event Queue** 를 사용하는 메세지 통신은 내부 마이크로 서비스들간의 통신에 사용됩니다. 외부 서비스에서 메세지 시스템에 접속을 할수 있는 방법을 열어 줄수도 있지만, 추천은 하지 않는 방식입니다. 외부 서비스와는 API 통신을 하는것이 좋으며, 외부 서비스와 내부 서비스의 통신방식이 다르기 때문에 두개를 해석해주는 Anti-Corruption Layer 가 필요합니다.


**EDA(Event Driven Architecture)** 는 마이크로 서비스간에 coupling이 없기 때문에 신규서비스의 추가와 삭제에 열려있는 아키텍쳐 입니다. 신규 서비스가 추가가 되어도, Event Queue 에서 구독을 하면 바로 데이터를 받아서 처리가 가능합니다. 메세지 이력이 남아있을 경우 지난 이벤트까지도 모두 수신을 할 수 있기 때문에 신규로 상품 추천 서비스를 생성 하더라도, 지난 이벤트를 수신하여 특정 사용자의 주문 이력을 모두 확인 할 수 있습니다.  
마찬가지로, 배송서비스를 더이상 구현하지 않고, 외주를 맡긴다고 하여 서비스를 종료해도, 다른 서비스에 영향도가 없습니다.  

#### Adding a new service
![](/img/03_Bizdevops/05/03/03_05_03_03.png)    

#### Removing a service
![](/img/03_Bizdevops/05/03/03_05_03_04.png)     

<br/>

## 이벤트 드리븐 구현 샘플

#### 참고 소스코드
* https://github.com/event-storming/orders
* https://github.com/event-storming/products
* https://github.com/event-storming/delivery

#### 예제 설명  
주문(order) 서비스와 상품(product) 서비스, 배송(delivery) 서비스의 관계가 Event-Driven 방식으로 호출을 하여 쇼핑몰을 구성합니다. 
1. 사용자가 주문을 하였을때, OrderPlaced 라는 이벤트를 Kafka 에 발송 합니다.
2. 주문 서비스에서 OrderPlaced 라는 이벤트를 구독하여 재고량을 수정합니다.
3. 배송 서비스에서 OrderPlaced 라는 이벤트를 구독하여 배송 시작을 합니다.

#### Order 서비스 Order.java

```java

@Entity
public class Order {
    @PostPersist
    private void publishOrderPlaced(){
        OrderPlaced orderPlaced = new OrderPlaced(this);
        orderPlaced.publish();
    }
}
```


#### Product 서비스 ProductService.java

```java

@Service
public class ProductService {

    @StreamListener(KafkaProcessor.INPUT)
    public void onOrderPlaced(@Payload OrderPlaced orderPlaced) {
        // 재고량 수정
        Optional<Product> productOptional = productRepository.findById(orderPlaced.getProductId());
        Product product = productOptional.get();
        product.setStock(product.getStock() - orderPlaced.getQuantity());

        productRepository.save(product);
    }
}
```


#### Delivery 서비스 DeliveryService.java

```java

@Service
public class DeliveryService {

    @StreamListener(KafkaProcessor.INPUT)
    public void onOrderPlaced(@Payload OrderPlaced orderPlaced) {
        // 배송 시작 
        deliveryRepository.save(delivery);
    }
}
```