## 12st 쇼핑몰 트랜잭션 추적

Stackdriver Trace는 애플리케이션의 지연 시간 데이터를 수집해 Google Cloud Platform Console에 표시하는 분산 추적 시스템입니다. 

요청이 애플리케이션 전체로 확산되는 과정을 추적하고, 상세한 성능 정보를 거의 실시간으로 받을 수 있습니다. 

Stackdriver Trace는 모든 애플리케이션 trace를 자동으로 분석하고 상세 지연 시간 보고서를 생성하여 성능 저하 문제를 파악하고 모든 VM, 컨테이너 또는 App Engine 프로젝트의 trace를 캡처할 수 있습니다.

<br/>

### GCP Tracing 주요기능

GCP Tracing 은 추적과 관련된 기본 기능을 제공합니다.
> - 추적을 위한 Metric 설정
> - 분석 보고서 생성
> - 지연시간 변동 감지

추가 기능 및 상세한 설명에 대해서는 Google 온라인 문서를 통해 확인 가능합니다.

☞ [GCP Tracing 상세정보 보기](https://cloud.google.com/trace?hl=ko "GCP Tracing 상세정보 보기")

<br/>

### Tracing(추적) 화면 접속하기

GCP 메뉴의 'OPERATIONS > 추적 > 개요' 메뉴로 접속합니다.

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/tracing01.jpg)

</div>

Tracing 화면은 HTTP 메소드 및 Metric 기준 정보에 따라 추적 분석 보고서를 만드는 내용으로 구성됩니다.

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/tracing02.jpg)

</div>

<br/>

### 12st 쇼핑몰 Tracing(추적) 하기

12st 쇼핑몰을 구성하는 서비스들 사이의 동기 호출방식(Request & Response)을 적용할 수 있습니다. 동기 호출은 호출한 서비스가 응답이 돌아올 때까지 기다리는 방식입니다.  

GCP 추적 메뉴의 '추적 목록'을 선택합니다.

파란 색으로 표시되는 작은 원들이 User Requests 이며, Trace 필터를 적용하여 특정 서비스의 요청들만 선택하여 볼 수 있습니다. 

하나의 원 위에 마우스를 올려 보면 해당하는 URI 정보(여기서는 주문, Order)와 서버에서 수행된 총 시간(2,246 ms)이 표시됩니다. 

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/tracing03.jpg)

</div>
 
<br/>

하나의 요청(Request)을 클릭하면, 해당 요청이 클라이언트로 나가기까지 서버 내에서 수행한 호출 목록들이 간트 차트와 비슷한 형식의 순서대로 출력됩니다.

12st 쇼핑몰에서 사용자가 주문을 생성하면, 서버에서는 주문 서비스가 상품 서비스의 재고를 확인해 주문을 생성하고 배송 서비스를 호출합니다. 배송 서비스는 배송 정보를 생성하고, 주문 수량만큼 상품의 재고를 차감합니다.

모든 작업이 완료 된 후, 사용자에게 최종 주문완료 화면이 나타나는데까지 총 2,246 밀리초가 걸렸다는 추적 뷰를 표시하고 있습니다.
   

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/tracing04.jpg)

</div>


<br/><br/>