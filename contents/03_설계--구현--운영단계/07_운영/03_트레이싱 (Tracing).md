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

Tracing 화면은 HTTP 메소드 및 Metric 기준 정보에 따라 추적 분석 보고서를 만드는 메인 영역으로 구성됩니다.

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/tracing02.jpg)

</div>

<br/>

### 12st 쇼핑몰 Tracing(추적) 하기

GCP 추적 메뉴의 '추적 목록'을 선택합니다.

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/tracing03.jpg)

</div>

<br/>

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/tracing04.jpg)

</div>


<br/><br/>