## Service Discovery

분산 환경 위에서 서로간의 서비스를 원격 호출하기 위해서는 각 서비스의 IP 주소와 PORT 를 알아야 호출이 가능하다.
요즘처럼 클라우드 기반의 MSA 어플리케이션인 경우에 네트워크 주소가 동적(dynamic)으로 할당된다.
따라서 클라이언트가 서비스를 호출하기위해서 서비스를 찾는 매커니즘(service discovery mechanism)이 필요하다.
Service registry 는 Service discovery 를 하기 위하여 중요한 역할을 한다. 
Service registry 는 사용가능한 서비스 인스턴스의 목록을 관리하고, 서비스 등록/해제/조회 등을 할 수 있는 API를 제공한다. 
Service discovery 를 하는 위치에 따라서 구현 방식이 달라지기에 client side 와 server side 로 분리한다.

## client side discovery , loadbalancing

![](/img/03_Bizdevops/04/06/03_04_06_01.png)

* 서비스 인스턴스의 네트워크 위치를 찾고 로드밸런싱하는 역할을 클라이언트가 담당하는 방식
* Netflix Eureka : Service registry
* Netflix Ribbon : Eureka 와 함께 동작하여 로드밸런싱된 요청(requests)을 생성

client side discovery 방식은 client 가 Service registry 에 물어서 서비스 위치를 찾은 후에 호출을 하는 방식이다. 

서비스에 맞는 로드밸런싱 방식을 각자 구현할 수 있다는 점이 장점이다.  
하지만 각 서비스마다 서비스 레지스트리를 구현해야 하는 종속성이 생긴다. 만약 서비스마다 다른 언어를 사용하고 있다면 언어별 또는 프레임워크별로 구현

## server side discovery , loadbalancing

![](/img/03_Bizdevops/04/06/03_04_06_02.png)

* 서버 쪽에서 디스커버리 로직을 구현한 방식
* aws ELB, 구글 로드 밸런서 : Service discovery
* etcd  : Service registry
* kubernetes DNS 서비스, kubernetes proxy : Service loadbalancer

서버 사이드 서비스 디스커버리 방식은 디스커버리 로직을 클라이언트에서 분리할 수 있다. 따라서 클라이언트 쪽에선 이런 로직을 몰라도 되고 따로 구현할 필요도 없다. 그리고 위에서 언급한 몇몇 배포 환경에서는 이런 로직을 무료로 제공하고 있습니다. 반면에 이 서비스 디스커버리가 죽으면 전체 시스템이 동작하지 않기 때문에 고가용성 등 더 많은 관리가 필요합니다



		
		


