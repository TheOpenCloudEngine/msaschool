## 모노리스에서 마이크로 서비스로의 전환

모노리스 시스템을 마이크로 서비스로 분리하기 위해서는 다음과 같은 방법들을 고려 하여야 한다. 
 
1. API 를 어떻게 통합할 것인가?
2. 객체 참조를 어떻게 할 것인가?
3. 어떻게 (다시) 상호 연동시킬 것인가?
4. 중복된 기능과 데이터를 어떻게 할 것인가?
5. 서비스 분리에 따른 통합인증은 어떻게 할 것인가?

![](/img/03_Bizdevops/04/05/03_04_05_01.png)  


## **1. API 를 어떻게 통합할 것인가?**

모노리스 시스템에서는 서비스가 1개이기 때문에 ui 에서 api 를 호출할때 특정 ip 혹은 domain 을 호출하였었다. 그러나 마이크로 서비스에서는 서비스가 쪼개져서 각자의 ip 를 가지고, 개별 서비스는 scale out(확장) 가능하기에 여러 ip 들과 서비스를 매핑시키는 **Service Registry** 가 꼭 필요하다. 또한 ui 에서 호출을 할때는 하나의 ip 혹은 domain 만 호출을 할 수 있도록 진입점을 통일해주는 **Gateway** 가 필요하다.  

백엔드에서 통합과 분리가 이루어 진다고 하여도, 프론트엔드의 코드는 유지가 되어야 한다. 프론트는 우리가 만든 ui 일수도 있지만 우리의 서비스를 사용하고 있는 3rd party 어플리케이션일 수도 있다. 힘이 막강한 회사가 아니고서야 우리의 Api 주소가 변경 되었다고 각자의 서비스를 변경해 달라고 요청을 할 수는 없다. 혹시 변경되더라도 기존의 하위 호환성은 유지하여 api 를 설계 해야하기 때문에, 변경되는 서비스 최 상단에 proxy 를 두어서 api 패턴을 유지하는게 좋다. 여기에 사용되는 proxy 가 **Gateway** 이다.  

**Gateway** 는 진입점 통일 역활을 하여 마이크로 서비스를 찾아가는 라우팅 역할을 한다.  
또한 마이크로 서비스의 최상단에서 갑옷을 입는 역할을 한다. 보안(e.g: prevent DDOS Attack) , 인가(e.g: Access Token), ACL(Access Control List), CORS(Cross-Origin Resource Sharing) 등을 각자의 서비스에서 처리를 하지 않고, **Gateway** 에서 일괄적으로 처리를 함으로서 마이크로 서비스에서는 구현에 좀더 집중을 할 수 있는 환경을 만들어 준다.  

> Gateway 의 자세한 설명은 [[운영-API Gateway]](../07_운영/02_API%20Gateway) page 에서 참고 하면 된다.    


**Service Registry** 는 **Gateway** 에서 각 서비스를 찾아 갈 수 있도록 서비스와 ip 를 가지고 있는 맵 이라고 볼 수 있다. 
Service Registry 는 client/server side discovery , loadbalancer 라고 불리운다. 서비스를 찾고, 로드벨런싱 하는 역할을 한다.  

> Service Registry 의 자세한 설명은 [[구현-Service Discovery]](./06_Service%2Discovery) page 에서 참고 하면 된다.    

## **2. 객체 참조를 어떻게 할 것인가?**

쇼핑몰 시스템의 예를 들어보면 기존 모노리스에서는 주문을 할 때, 상품 객체를 바로 사용하였었는데, 서비스를 분리하고 나니 객체가 없는 문제가 발생한다. 즉 직접적인 메모리 기반 객체 참조는 불가능 하여 졌다. 이럴때 해결하는 방법은 **Shared-Kernel** 방법을 사용 할 수 있다.    

* 중복된 객체를 생성

    그러나 마이크로 서비스의 장점은 polyglot 환경에 있는데 Shared-Kernel 방법은 동일 언어에서만 사용 가능한 방법이다. Java 와 Python 시스템은 Shared-Kernel 이 성립을 할 수가 없다. 이럴때는 **중복된 객체를 생성** 하면 된다. 중복된 객체 생성을 할때 장점은 기존의 수많은 항목들은 필요가 없고, 내가 필요한 정보만 내가 파싱하여 사용할 수 있다. 

* 분리된 Aggregate 내부의 Entity 간에는 Key 값으로만 연결
    - Primary Key 를 통해서만 참조
    - HATEOAS link 를 이용
    
    객체를 중복 생성 하기 싫다면, 기존의 원격 호출 처럼 api 를 호출하여 파싱해서 가져 올 수 밖에 없다.  
    어그리게이트가 나누어져 있다는 것은 런타임과 트랜젝션이 다르다는 의미인데, 이럴때는 **Primary Key** 로 구분을 해야한다.
    혹은 **HATEOAS link 를 이용하여 객체를 참조** 할 수 있다. 다만 모든 api 를 HATEOAS 수준으로 메니징 하는 것은 높은 비용이 요구된다. 
    
    Entity 간에 Primary Key 를 이용하여 객체 참조를 할때 Aggregate Root 를 통해서만 호출을 하는 것이 좋다. Aggregate 는 수많은 Entity 를 포함하는데 그중 대표격인 것이 Aggregate Root 이다. 예를 들어 상품 이라는 Aggregate 가 있을때 속성으로는 상품 디테일, 재고, 가격비교 등을 하위 Aggregate 로 가지고 있을 수 있다. 이때 재고 라는 Aggregate 를 객체를 바로 외부에서 호출 하여 CUD 가 일어나게 된다면 데이터가 일그러지는 경우가 생긴다. 재고라는 Aggregate 를 객체를 접근 하고 싶을때는 상품이라는 Aggregate Root 를 통하여 호출하는 채널을 일원화 시켜야 한다.  
    
## **3. 어떻게 (다시) 상호 연동시킬 것인가?**

모노리스를 마이크로 서비스로 일괄적으로 변경하는 방법은 실패 가능성이 매우 크다. 리스크를 줄이기 위해서는 우선적으로 **Core Domain** 과 **Supportive Domain** 을 나눈 후에 **Supportive Domain** 을 조금씩 마이크로 서비스로 분리를 하는 방법이다. 서비스는 분리 하였지만 여전히 서로간의 통신은 하여야 하기 때문에 이런 경우에 사용하는 방법은 다음과 같다.

* Find the seams and replace with proxy
* Event Shunting  

### Strangler Pattern

스트랭글러 패턴이란 기존의 모노리스 시스템을 조금씩 쪼개서 마이크로 서비스로 변경하는 패턴이다. 스트랭글러 패턴은 스트랭글러 덩굴이 숙주 나무를 타고 자라다가 결국 숙주 나무를 죽이고 그 자리를 차지하는 방식에서 나오게 된 말이다. 마이크로 서비스들이 기존의 거대한 레거시 시스템을 변화시키면서 결국 모노리스 시스템을 모두 마이크로 서비스로 점진적으로 변화시키는 패턴이다. 이는 Biz 임팩트 최소화를 통한 구조적 변화이다. 

![Strangler Pattern](/img/03_Bizdevops/04/05/03_04_05_04.png)

기존에서 분리된 서비스 영역이 기존 모노리스와 연동 될 수 있도록 해 주는 것이 필요하다.    
연동은 다음과 같은 동기/비동기 방식으로 나누어 질 수 있다.  
동기 방식은 레거시 시스템으로 하여금 기존 소스코드 수정 요인이 높다. 따라서 이벤트 기반 비동기 연동 (CQRS) 을 추천한다.

### Find the seams and replace with proxy  

![seams](/img/03_Bizdevops/04/05/03_04_05_05.png)

모노리스 서비스에서 일부 기능을 마이크로 서비스로 떼어낸다면, 기존에는 내부 객체를 호출하던 부분을 Request/Response or Event Driven 방식으로 변경을 해줘야 한다. 이때 변경되는 부분을 해석해 주는 부분이 필요해 진다. 이 부분을 DDD 에서는 Anti-Corruption Layer 라고 부른다. 두개의 서비스를 해석해주는 Layer 라는 의미이다.  
여기서 새로운 서비스를 Request/Response 방식으로 호출을 한다면, 동기식 방식이 된다. 동기식 방식은 기존 코드를 모두 api 호출하는 방식으로 바꾸기 때문에 소스코드의 수정이 많다. 이 소스코드의 수정을 최소화 시키려는 노력으로 Netflix 에서는 Feign Client 방식으로 Service 를 변경하는 방식을 제공한다.  

#### Feign Client  

Feign Client 의 사용 방법을 알아 보겠다.

먼저 모노리스 시스템이 아래와 같이 구현되어 있다. Order.java 에서 주문이 들어왔을때 배송을 시작하도록 하는 코드 이다.

```java
public class Order {
    /**
     * 주문이 들어옴
     */
    @PostPersist
    private void callDeliveryStart(){
        // 배송 시작
        DeliveryService deliveryService = Application.applicationContext.getBean(DeliveryService.class);
        deliveryService.startDelivery(delivery);
    }
}
```

```java
public interface DeliveryService {
    void startDelivery(Delivery delivery);
}
```

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

해당 부분을 Feign Client 로 변경 한다면, DeliveryServiceImpl.java 는 더이상 필요가 없고, DeliveryService.java 에 @FeignClient 어노테이션이 붙게 되어진다. 그리고 Aggregate 인 Order.java 는 변경이 없다.  


```java
/**
 * 주문이 들어옴
 */
public class Order {
    @PostPersist
    private void callDeliveryStart(){
        // 배송 시작
        DeliveryService deliveryService = Application.applicationContext.getBean(DeliveryService.class);
        deliveryService.startDelivery(delivery);
    }
}
```

```java
@Service
 @FeignClient(name ="delivery", url="${api.url.delivery}")
public interface DeliveryService {
    @RequestMapping(method = RequestMethod.POST, value = "/deliveries", consumes = "application/json")
    void startDelivery(Delivery delivery);
}
```

관련 소스는 다음을 참고하면 된다.  
[모노리스 소스코드]: https://github.com/event-storming/monolith  
[모노리스에서 delivery 를 원격 호출하는 order 서비스]: https://github.com/event-storming/reqres_orders  


### Event Shunting  

![Event Shunting](/img/03_Bizdevops/04/05/03_04_05_06.png)  

새로운 서비스를 Event Driven 방식으로 호출을 한다면 비동기식 방식이 된다. 이 방식은 기존의 호출 코드는 남겨 놓고, 마지막에 이벤트를 발송하는 코드를 심어 주면 된다. 이러한 방식을 이벤트를 심어서 분기한다는 의미로 Event Shunting 이라고 부른다.  

이 방식은 기존 레거시 시스템에 이벤트 발송하는 부분만 추가를 하기 때문에 레거시 시스템에 소스코드 변경이 적고, 에러가 발생할 확률이 줄어든다. 이렇게 발송한 이벤트를 신규 서비스에서는 사용을 하면 된다.

만약 기존의 레거시 시스템을 전혀 수정을 할 수 없는 상황이라면 CDC (Change Data Capturing) 이 대안이 된다. CDC 기능은 소스코드가 아닌 DB 에서 변경되는 Log 를 모니터링 하여서 Event 로 자동 퍼블리시 하는 방식이다. 현재 대부분의 DB 에서 이 방식을 지원하고 있고, 오픈소스로는 Debezium, Eventuate Tram 등이 존재 한다.


## **4. 중복된 기능과 데이터를 어떻게 할 것인가?**
모노리스 시스템을 개발 할때, 우리는 공통된 기능들을 처리 하기 위해서 Util 등을 만들어 사용하였고, 혹은 공통 프레임워크를 적용하기 위하여 공통된 Library 를 만들어서 사용하곤 했었었다. 모노리스를 마이크로 서비스로 전환하게 됨으로서 이러한 공통 기능들을 어떻게 처리해야할지 고민해야 한다. 재사용 통한 경제성(SOA사상, 디펜던시발생)과 **자율적 창발** (낮은 간섭과 빠른 출시)의 트레이드 오프에서 후자의 전략을 선택 하는 것을 추천한다. **재사용하지 않고 중복 구현하는 것이 MSA 스러운 것** 이라고 할 수 있다. 또한 마이크로 서비스로 분리를 하면서 Polyglot 환경으로 간다면 고민을 할 필요가 없이 새로 구현을 해야 한다. java library 를 사용하였었는데 python 에서는 사용 할 수 없는 원리랑 같다.  

다만 예외 상황도 발생 할 수 있다. 모든 서비스에서 공통적으로 사용하게 되는 (데이터 참조에 intensive 한 서비스 (인증정보 등)) Utility 서비스 성격으로 구현 하는 것이 좋다.  

## **5. 서비스 분리에 따른 통합인증은 어떻게 할 것인가?** 

![token](/img/03_Bizdevops/04/05/03_04_05_07.png)  

통합 인증은 "어떻게하면 흩어져 있는 Application 들의 인증 관리를 중앙에서 쉽게 할 것인가” 하는 것인데, 이것을 푸는 방식 중 대표적인 것이 바로 OAuth2 이다. OAuth2 는 웹, 모바일 어플리케이션에서 타사의 API 권한 획득을 위한 프로토콜이다. Google, Facebook 등을 비롯한 대부분의 인터넷 기반 Application들이 OAuth2 또는 그 변종을 사용하여 스스로를 인증하거나 누군가에게 인증 서비스를 제공하고 있다. 또, 근래에는 OpenID Connect라는(예전의 URL 기반 OpenID와는 다르다) 것이 등장하여 OAuth의 개념을 보다 편리하게 쓸 수 있도록 한 기술도 등장한 상태이다.  

기존의 모노리스 시스템에서는 서버측에 유저 정보를 저장하는 서버기반 인증을 많이 사용하였다. 서버기반 인증의 문제점은 사용자가 늘어났을때 메모리 사용량이 늘어난다. 또 마이크로 서비스에서 서버에서 인증을 처리하게 되면, 각 서비스마다 인증로직을 구현해야 한다. 이러한 방식을 해결하기 위하여 토큰 기반 인증 방식을 사용한다.  
토큰 기반 인증 방식은 인증 서버에 토큰을 요청 하여 토큰이 발행되면 해당 토큰을 Client 에서 저장을 하고 서버에 요청을 할때마다 토큰을 함께 서버에 전달을 한다. 그리고 서버는 요청이 올때마다 토큰을 검증하는 방식이다.  
Token 은 무의미한 문자열로, 기본적으로 정해진 규칙에 의해 발급된 것이 아니다. 그래서 증명확인이 필요할 때마다, 인증서버에 DBMS 접근이든 또다른 API를 활용하든 접근하여 유효성을 확인해야 한다. 이 Token 을 좀더 손쉽게 사용하기 위하여 나온 방식이 JWT (JSON Web Token) 이다. 매번 토큰의 유효성을 확인하는 과정을 건너뛰고 토큰 안에 위조여부 확인을 위한 값, 유효성 검증을 위한 값, 심지어는 인증정보 자체를 담아서 제공함으로써, Token 확인 단계를 인증서버에게 묻지 않고도 할 수 있도록 만든 것이다.

토큰 기반 인증 방식의 장점은 다음과 같다.  
- 확장성이 뛰어나다. 
- 서버가 늘어나도 토큰을 인증하는 방식만 알고 있다면 영향이 없다.
- JWT는 웹표준 RFC7591에 등록되어 있다. 따라서 여러 환경에서 지원이 가능하다. (.NET, Ruby, Java, Node.js, Python 등)
  
단점은 토큰을 Client 에 저장을 하기 때문에, 토큰을 탈취 당한다면 토큰의 유효시간 안에 인증이 유효하게 되어진다. 이를 해결하기 위하여 토큰의 유효시간을 조금 가져가고, refresh token 으로 토큰을 새로 요청하는 등의 방식을 사용한다.

[implementation-인증/인가](./07_인증--인가) page 에서 Oauth2.0 과 JWT 를 사용하는 방식에 대하여 자세히 설명한다.  
 
  


