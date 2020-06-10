## CNA(Cloud Native Application) 구현 프레임워크

MSA 에 관련한 여러가지 책을 내었던 영국의 마틴 파울러는 다음과 같은 말을 하였습니다. 
> "Software development is a learning process, working code is a side effect".  

즉 **'소프트웨어 개발은 "학습의 과정"이며, "실행 코드"는 그의 부산물입니다.** 라는 뜻입니다. 좋은 설계에서 나온 결과물이 코드와 매칭이 되고, 코드만 보았을때 비지니스 프로세스를 이해 할 수 있으면 잘 구현 되었다고 판단 할 수 있습니다.

이번 구현 파트에서는 이벤트 드리븐 아키텍처의 설계 기법인 이벤트 스토밍의 결과물을 구현 코드로 바꾸는 프레임워크에 대해 설명 하겠습니다. 

<br/>

## 이벤트 스토밍 결과를 코드로 변환

### **Aggregate (Yellow Sticker)**

1) 이벤트 스토밍의 첫번째 구현은 도메인 모델을 정의하는 단계입니다. 노란색 스티커로 붙여진 Aggregate 의 변화에 의하여 이벤트가 생성되고, 커맨드 요청을 받아서 Aggregate 가 변화를 하기 때문에, Aggregate 는 가장 중요하고, 가장 먼저 구현을 합니다.

1) Aggregate 를 구현 시, Java 언어로 Spring-boot 를 사용하여 구현을 한다면 아래와 같이 Java 클래스에 `@Entity` 어노테이션을 선언해 주면 준비가 완료 됩니다.
	- Entity 라는 말은 객체 혹은 개체 라는 의미로 사용되는데 연필이나 컴퓨터 처럼 서로 구별이 되는 하나하나의 대상을 지칭합니다. 즉 우리가 사용하는 도메인 언어입니다. 
	- Spring 에서는 이런 도메인 언어를 손쉽게 사용할 수 있도록 어노테이션을 제공하여 줍니다.
 
1) 어노테이션 선언 후에 Entity 구성에 필요한 속성들을 정의하여 주면 됩니다. 속성들은 java 언어에서는 변수로 선언을 해주면 됩니다.
 
1) 모든 Entity 는 생성되고, 변화되고, 사라지는 lifecycle 을 가지고 있고, 속성이 있기에 프로그래밍 언어로 보았을 때 데이터베이스와 API 와의 매칭이 당연시 됩니다.  
	- 해당 API 가 Command 가 됩니다.
 
1) Aggregate 에 포함된 특정 Entity 를 RootEntity 혹은 AggregateRoot 라고 부릅니다.  
 
아래 그림은 노란색의 이벤트 스토밍 스티커인 Aggregate 를 구현한 모습입니다.
 
> ![Aggregate](/img/03_Bizdevops/04/03/image90.png)

### **Command (Sky-Blue Sticker)**

1) Aggregate 를 구성하였으면, 해당 Aggregate 를 **변화**시키는 커맨드를 작성합니다.

1) 파란색 스티커에 해당하는 Command 는 구현관점으로 보았을 때 외부로부터 들어오는 API 에 해당 됩니다.
 
1) DDD 에서는 Aggregate 를 변화시키는 채널을 Repository 라고 합니다. 그리고 RootEntity 에서만
 Repository 를 제공하라고 가이드 되어 있습니다.
 	- 이는 하위 엔터티에서 Repository 를 제공하게 되면 해당 엔터티가 별도로 CRUD 가 이루어지게 되고, 이는 전체 Aggregate 의 라이프 싸이클이 깨지는 결과를 가져옵니다.
 
1) Spring-Data-Rest 에서는 Repository 를 구성하는 방법을 `@Repository` 라는 어노테이션
 선언하여 구성하거나 혹은 extends Repository 같은 방식으로 구현하면 됩니다.
 
1) Spring-Data-Rest 를 사용하여 Repository Pattern 으로 프로그램을 구현하면 Entity 의
 lifecycle 에 해당하는 기본적인 CRUD 가 바로 생성이 되고, 해당 CRUD 에 해당하는 API (커맨드) 가
 자동으로 생성됩니다.
 
1) Repository Pattern 으로 구성이 안되고 복잡한 비지니스 로직이 있으면 Spring 에서 MVC 패턴으로 나온
 Controller 와 Service 로 구현하면 됩니다.
 
아래는 파란색 스티커인 커맨드를 구현한 코드입니다.
 
> ![Command](/img/03_Bizdevops/04/03/image91.png)

### **Event (Orange Sticker)**

1)  주황색 스티커인 이벤트는 pojo 객체인 Java Class 로 생성을 합니다.

	- 실제로 메세지로 주고 받을 때는 json 객체 형식으로 통신하는 방법을 추천합니다. Json 객체를 직접 만들거나, String 변수처럼 바로 선언을 할 수도 있으나, 클래스 파일로 구성을 해 놓았을 시, 명시적이고 쉽게변경하기 어렵습니다.

> ![Event01](/img/03_Bizdevops/04/03/image92.png)

2) 이벤트는 Aggregate 의 변화에 의해서 발생하기 때문에, 이벤트를 보내는 로직은 Entity의 lifecycle 에 작성을 하게 됩니다. 물론 비지니스 로직의 중간중간에 이벤트를 발생시켜야 한다면, 따로 서비스에서 처리를 하는 것이 맞으나, DDD 에서 말하는 주요 문구인 '도메인을 보았을 때 비지니스가 보여야 한다'는 원칙에 맞추어 Entity 에서 이벤트를 발생하는 방법을 추천합니다.

3) JPA 에서는 이러한 Entity 의 lifecycle에 해당하는 listener 를 어노테이션으로 생성하여 놓았습니다. 대표적으로 `@PostPersist` (저장후) `@PrePersist`(저장전) `@PostUpdate` (업데이트후) 등이 있습니다. 
 
4) 메시지를 send 하는 방법은 라이브러리별로 사용법이 달라지지만, 메시지 브로커를 kafka 를 사용한다면 topic 을 설정하고, 마지막에 send 하는 형식으로 이벤트를 발행합니다. 
 
> ![Event02](/img/03_Bizdevops/04/03/image93.png)

### **Policy (Lilac Sticker)**

1) 보라색 스티커는 이벤트에 반응하여 작동하는 Policy 입니다. 

2) 이벤트에 반응하기 때문에 이벤트를 수신하는 리스너가 필요합니다. Spring-cloud-Stream 을 사용시 아래처럼 `@StreamListener` 어노테이션으로 선언을 하여 주면, 이벤트가 생성될 때마다 INPUT 으로 들어오는 데이터를 한 개씩 수신하게 됩니다.

> Porcessor.INPUT 은 메시지를 수신하는 채널인데, kafka 의 구현체를 가진다면 topic 을 의미합니다. 
> 만약 Topic 을 여러 이벤트에서 공유를 한다면 아래 리스너에서 내가 원하는 이벤트만 선별하여 작업을 해야하기 때문에 이벤트의 속성값에서 정해진 이벤트 명을 찾던가, header 에서 찾는 등 이벤트를 구분하는 로직이 필요합니다.

> ![Policy](/img/03_Bizdevops/04/03/image94.png)

### **Bounded Context**

이벤트 스토밍을 하고 난 후에 여러 Aggregate 들이 관련된 Context 끼리 묶여서 Bounded Context 가
형성이 됩니다. 이것은 마이크로 서비스 단위로 쪼갤 수 있는 후보가 됩니다.
  
마이크로 서비스는 java 언어로 구현 시 가장 적합한 프레임워크는 Spring-boot 입니다. 내장된 톰켓(Tomcat)으로 자체 서버를 띄울 수 있고, 라이브러리를 추가하는 방식으로 Chassis 구성을 손쉽게 할 수 있습니다.

<br/>


