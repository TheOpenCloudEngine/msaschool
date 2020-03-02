## Service Discovery

분산 환경 위에서 서로간의 서비스를 원격 호출하기 위해서는 각 서비스의 IP 주소와 PORT 를 알아야 호출이 가능하다. 요즘처럼 클라우드 기반의 MSA 어플리케이션인 경우에 네트워크 주소가 동적(dynamic)으로 할당된다. 따라서 클라이언트가 서비스를 호출하기위해서 서비스를 찾는 매커니즘(service discovery mechanism)이 필요하다.

* Service registry 는 Service discovery 를 하기 위하여 중요한 역할을 한다. 
* Service registry 는 사용가능한 서비스 인스턴스의 목록을 관리하고, 서비스 등록/해제/조회 등을 할 수 있는 API를 제공한다. 
* Service discovery 를 하는 위치에 따라서 구현 방식이 달라지기에 Client-Side 와 Server-Side 로 분리한다.

Service discovery 기능은 기본적으로 서비스를 등록하고 등록된 서비스의 목록을 리턴하는 기능이지만 Health check 를 통해서 현재 서비스가 가능한 서비스를 판별한 후, 서비스가 가능한 서비스 목록만 보여 준다던가, 서비스간의 부하 분산 비율을 조정하는 등의 확장이 가능하다.  


## Client-Side discovery , loadbalancing

![client side discovery](/img/03_Bizdevops/04/06/03_04_06_01.png)

* 서비스 인스턴스의 네트워크 위치를 찾고 로드밸런싱하는 역할을 클라이언트가 담당하는 방식
* Netflix Eureka : Service registry
* Netflix Ribbon : Eureka 와 함께 동작하여 로드밸런싱된 요청(requests)을 생성

**Client-Side discovery 방식**은 client 가 Service registry 에 물어서 서비스 위치를 찾은 후에 로드밸런싱 알고리즘을 통해 호출을 하는 방식이다. 서비스가 구동될적에 Service registry 에 자신의 위치 ( ip,prot, 서비스명 등 ) 를 알리고, 종료시에  Service registry 에서 삭제를 한다.  

위 그림은 order-service 가 기동할때 각자 구현된 discovery library 에서 Service registry 가 제공하는 Registration API 를 호출하여 서비스를 등록한다. 이제 다른 서비스에서 order-service 를 호출하가 위해서는 Service registry 에 Query API 를 호출하여 타겟의 ip 와 port 등을 알아 낸 후 서비스를 호출한다. 호출시에는 discovery library 에서 로드밸런싱 방법을 선택하여 호출을 한다.  

대표적인 discovery library 는 Netflix 오픈소스인 Eureka,Ribbon 등이 있다. Eureka 는 Service registry 의 서버 역할을 하며 API 를 제공하여 주고, 클라이언트 라이브러리로 활용을 할적엔 API 를 호출하는 역할을 한다. Ribbon 은 Eureka 와 같이 쓰이면서 호출시 로드벨런싱 역할을 해준다. 

- Client-Side Discovery Pattern 장점
    - 비교적 간단하다. 
    - 호출하려는 서비스를 알고 있기 때문에 서비스에 맞는 로드밸런싱 방식을 각자 구현할 수 있다.

- Client-Side Discovery Pattern 단점
    - 각 서비스마다 서비스 레지스트리를 구현해야 하는 종속성이 생긴다. 
    - 만약 서비스마다 다른 언어를 사용하고 있다면 언어별 또는 프레임워크별로 구현해야 한다.

## Server-Side discovery , loadbalancing

![server side discovery](/img/03_Bizdevops/04/06/03_04_06_02.png)

* 서버 쪽에서 디스커버리 로직을 구현한 방식
* aws ELB, 구글 로드 밸런서 : Service discovery
* kube-dns + etcd : Service registry
* kubernetes proxy : Service loadbalancer

**Server-Side discovery 방식**은 client 가 플렛폼 라우터로 서비스를 호출하여 달라고 요청을 보내는 방식이다. 여기서 플렛폼 라우터는 aws ELB, 구글 로드 밸런서가 대표적이다. 이 플렛폼 라우터는 서비스 레지스트리에 문의(query)를 하여 서비스의 위치를 찾은 후에 이를 기반으로 라우팅을 한다. Client-Side discovery 와 동일하게 각 서비스는 Service registry 에 등록되고 해제된다

위 그림의 Deployment platform 은 Kubernetes 배포 환경으로 생각 하면된다. 만약 Kubernetes 와 aws ELB 를 사용한다면 클라이언트는 DNS 이름을 사용하여 ELB 에 요청을 보낸다. ELB 에서는 Kube-DNS 서비스에게 DNS 이름으로 문의(query)를 요청하면 Kube-DNS 는 쿠버네티스의 저장소인 etcd 를 조회하여 호출하려는 서비스의 ip와 port 정보를 넘겨준다. 즉 Service registry 역할을 Kube-DNS (API 제공) 와 etcd (목록 관리) 가 나누어서 한다. 넘겨받은 정보를 ELB 에서 호출을 할때 Kube-proxy 가 loadbalancer 역할을 하여 준다.  

- Server-Side Discovery Pattern 장점
    - 디스커버리 로직을 클라이언트에서 분리할 수 있다.
    - 따라서 클라이언트 쪽에선 이런 로직을 몰라도 되고 따로 구현할 필요도 없다.
    - 쿠버네티스 서비스 제공자(EKS, AKS, GKS 등) 에서는 이와 같은 기능을 무료로 재공 하고 있다. 

- Server-Side Discovery Pattern 단점
    - 로드벨런서는 배포 환경에 구축이 되어야 한다.
    - public cloud 에서 (예: aws, gcp) 로드 벨런서를 생성하면 각 환경에 맞는 로드벨런서 (aws ELB, 구글 로드 밸런서) 등이 자동 생성되지만, private cloud 에서는 로드벨런서를 직접 생성해 주어야 한다. (예: MetalLB 등)
    - 서비스 디스커버리가 죽으면 전체 시스템이 동작하지 않기 때문에 고가용성 등 더 많은 관리가 필요하다.

## registration 방식 

서비스들은 Service Registry 에 각 서비스를 등록/해제 해야한다. 이렇게 서비스를 등록하는 방식은 두가지 방식이 있다.   

**1. Self-Registration**  

서비스 인스턴스는 service registry에 스스로 등록/해제할 책임이 있다.  
필요하다면 등록정보가 만료되지 않게 하기위해 heartbeat를 service registry에 보내야한다.  
**Netflix OSS Eureka client** 가 대표적인 예 이다.  

Eureka client는 Eureka(service registry)에 서비스 등록/해제를 자동으로 처리한다.  
서비스의 Java Configuration 클래스에 @EnableEurekaClient 어노테이션만 달아주면 된다.  
    
    
* Self-Registration 장점  
    - 비교적 단순하다.
    - 별도의 시스템 컴포넌트가 추가될 필요가 없다.
    
* Self-Registration 단점
    - 서비스 인스턴스와 Service Registry간의 높은 결합도(coupling)이 생긴다.
    - 서비스에서 등록/해제 관련된 코드를 구현해야된다.



**2. 3rd party registration**

서비스 인스턴스가 직접 service registry에 등록/해제에 대한 책임이 없다.  
대신, 서비스 등록기(service registrar)가 service registry에 등록을 해준다.  
서비스 등록기는 실행중인 서비스 인스턴스들에 polling을 하거나 이벤트를 구독하는 등의 작업을 통해서 서비스의 변경을 감지하고, service registry에 등록/해제를 한다.  
[**Netflix Prana**](https://github.com/Netflix/Prana) 나 [**Registrator**](https://github.com/gliderlabs/registrator) 등이 이에 해당한다.  
쿠버네티스에서는 명식적인 Service registry 가 없어서 infrastructure 의 built-in registry 를 이용한다.  

> Netflix Prana : Non-JVM 시스템을 side-car 방식으로 같이 실행을 하여 Eureka 에 등록/해제 를 하여준다. 
> Registrator: Docker containers 를 다양한 (etcd, Consul) Service registry 에 등록/해제 하여 준다.  

* Third-Party Registration 장점
    - 서비스 인스턴스와 service registry가의 결합도를 끊을(decoupled) 수 있다.
    - 서비스에 별도의 등록/해제 로직을 구현할 필요가 없다.
    
* Third-Party Registration 단점
    - 운영환경에 추가적인 시스템 컴포넌트가 필요하다.
    - 이 시스템은 설치 및 관리되어야 하고, 고가용성을 유지해야 한다.
		
> 참고 : 
> https://www.nginx.com/blog/service-discovery-in-a-microservices-architecture/
> https://kihoonkim.github.io/2017/01/27/Microservices%20Architecture/Chris Richardson-NGINX Blog Summary/4. Service Discovery in a MSA/
> https://microservices.io/patterns/3rd-party-registration.html


