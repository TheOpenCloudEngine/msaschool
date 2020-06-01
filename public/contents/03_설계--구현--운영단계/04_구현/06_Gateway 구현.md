## 게이트웨이 구현 실습

이번 시간은 각 마이크로 서비스의 최 앞단에서 모든 API 서버들의 엔드포인트를 단일화하고, 라우팅을 시켜주는 게이트웨이를 다뤄 보겠습니다. 게이트웨이의 구현 프로젝트는 여러개가 있지만 그중 spring cloud 에서 사용하는 Spring Cloud Gateway 를 사용 하여 구현 실습을 진행 하겠습니다. 

> Gateway 의 자세한 이론 설명은 [[참고자료-MSA Outer 아키텍처-API Gateway]](/#/참고자료/05_MSA%20Outer%20아키텍처/02_API%20Gateway) page 에서 참고 하면 됩니다. 


1. 스프링 부트를 처음 시작할때 가장 좋은 방법은 https://start.spring.io/ 에서 시작하는 것입니다. 브라우저에서 접속 다음 사이트를 접속하여 스프링 부트를 시작합니다
	- https://start.spring.io/

2. Maven Project 와 Java 를 선택하고 Artifact 이름을 gateway 로 변경합니다. 그 후, 디펜던시에 다음을 추가하여 Generate 버튼을 클릭하여 프로젝트를 생성 합니다.

	- Gateway : 스프링 클라우드의 게이트웨이 디펜던시를 추가합니다.
	
	![code01](/img/03_Bizdevops/04/05/03_04_05_15.png)

3. IDE(intellij 등) 에서 열고 application.properties 파일의 확장자를 application.yml 로 변경합니다.
	- yaml 파일은 xml 이나 json 처럼 정보를 적재하는 방식인데, 그중에서 읽고 쓰기 쉽게 만들어진 형식입니다.

4. 이제 gateway 의 라우팅 연습을 해보겠습니다. 라우팅 방법은 java 파일에서 설정을 할 수도 있고, yaml 파일에서 설정을 할 수도 있습니다. 그중 외부에서 데이터를 주입할 수 있고, 읽기 쉬운 yaml 파일에서 라우팅 설정을 하는 방법이 많이 쓰입니다.

	- application.yml 내용에 아래를 입력합니다.
	- yaml 파일을 설정할때 중요한 것은 indent 입니다. 보통 스페이스바 2번, 혹은 탭(tab) 으로 indent 를 맞춥니다.

	```yaml

	spring:
	  cloud:
	    gateway:
	      routes:
	        - id: google
	          uri: http://google.com
	          predicates:
	            - Path=/drive
	        - id: facebook
	          uri: http://facebook.com
	          predicates:
	            - Path=/groups
	```

	- 위의 설정은 url path 에 따라서 서로다른 url 로 라우팅을 시키는 예제 입니다.
	- 설정 후 서버를 실행 후 브라우저를 열고 아래와 같은 url 을 입력하여 봅니다.
	- mvn spring-boot:run
		- 서버를 실행 합니다. 8080 포트로 서버가 실행됩니다.
	- http://localhost:8080/drive
		- 구글 드라이브로 이동합니다.
	- http://localhost:8080/groups
		- 페이스북 그룹으로 이동합니다.

	- 위의 단순한 라우팅은 뒤에 path 는 변경이 없고, localhost:8080 이 uri 로 변경 되는 것을 확인 할 수 있습니다.

5. 이번엔 라우팅을 할때 url 을 변경 하여 보겠습니다. 이때 filters 라는 값이 추가 됩니다. 필터는 게이트웨이에 요청이 왔을때, 라우팅을 다루는 값입니다. 파라미터를 추가하거나, url 을 변경하거나 하는 다양한 작업들이 있습니다.

	- application.yml 파일에 아래와 같이 입력 합니다.
	
	```yaml

	spring:
	  cloud:
	    gateway:
	      routes:
	        - id: google
	          uri: http://google.com
	          predicates:
	            - Path=/google/{param}
	          filters:
	            - RewritePath=/google(?<segment>/?.*),/search
	            - AddRequestParameter=q,{param}
	        - id: naver
	          uri: http://search.naver.com
	          predicates:
	            - Path=/naver/{param}
	          filters:
	            - name: RewritePath
	              args:
	                regexp: /naver(?<segment>/?.*)
	                replacement: /search.naver
	            - name: AddRequestParameter
	              args:
	                name: query
	                value: "{param}"
	```

	- 설정 후 서버를 재 실행 후 브라우저를 열고 아래와 같은 url 을 입력하여 봅니다.
	- mvn spring-boot:run
		- 서버를 실행 합니다. 8080 포트로 서버가 실행됩니다.
	- http://localhost:8080/google/검색어
		- "검색어" 라는 명칭을 구글에서 검색합니다.
	- http://localhost:8080/naver/검색어
		- "검색어" 라는 명칭을 네이버에서 검색합니다.

	- 구글에서 검색을 하는 url 은 https://www.google.com/search?q= 형식입니다. 해당 도메인으로 라우팅을 시키고, 여러 검색엔진을 사용하기 위하여 filters 에서 path 를 다시 설정 하고, url path 를 파라미터로 받는 작업이 실행 되었습니다.  

6. 이번에는 실제 게이트웨이 예제에서 어떻게 쓰였는지 보겠습니다.

	- https://github.com/event-storming/gateway/blob/master/src/main/resources/application.yml

	```yaml

	cloud:
	    gateway:
	      routes:
	        - id: product
	          uri: http://localhost:8085
	          predicates:
	            - Path=/product/**,,/products/**,/goods/**
	        - id: order
	          uri: http://localhost:8081
	          predicates:
	            - Path=/orders/**
	        - id: delivery
	          uri: http://localhost:8082
	          predicates:
	            - Path=/deliveries/**
	        - id: servicecenter
	          uri: http://localhost:8084
	          predicates:
	            - Path=/surveys/**
	        - id: mypage
	          uri: http://localhost:8086
	          predicates:
	            - Path=/users/**,/mypage/**
	        - id: oauth
	          uri: http://localhost:8090
	          predicates:
	            - Path=/oauth/**
	      globalcors:
	        corsConfigurations:
	          '[/**]':
	            allowedOrigins:
	              - "*"
	            allowedMethods:
	              - "*"
	            allowedHeaders:
	              - "*"
	            allowCredentials: true
	```

	- 위의 샘플은 로컬 환경에서 다양한 서비스를 라우팅 한 결과 입니다.
	- 하나의 서비스에는 path 가 여러개 있을 수 있습니다. 그때 ,(콤마) 로 각 path 들을 설정하여 줍니다.
	- path 가 1개만 있지 않기 때문에 path 뒤에 /** 을 사용하여 해당 path 뒤쪽에 오는 모든 url 을 받겠다고 선언 하였습니다.
	- globalcors 라는 설정으로 cors 처리를 할 수 있습니다.



### 실습 리뷰
간단하게 라우팅과 필터에 대하여 spring-cloud-gateway 를 사용하여 설정하여 보았습니다.  
게이트웨이는 마이크로 서비스 아키텍처 패턴에서 외부와 내부를 연결하는 중요한 역할을 담당합니다.

게이트 웨이는 라우팅이 기본이지만, 인증/인가 처리나 Rate Limiting 등의 처리등이 가능합니다.
좀더 다양한 기능은 아래 링크를 통하여 좀더 살펴 보실 수 있습니다.

> https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.2.RELEASE/reference/html/


<br/>





