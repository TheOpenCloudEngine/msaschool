## 12st 쇼핑몰 모니터링

GCP의 Stackdriver는 클라우드 기반 애플리케이션의 성능, 업타임, 전반적인 상태에 관한 모니터링 정보를 제공합니다. 

Stackdriver는 Google Cloud Platform, Amazon Web Services, 호스팅된 업타임 프로브, 애플리케이션 계측은 물론 Cassandra, Nginx, Apache 웹 서버, Elasticsearch 등의 다양한 공통 애플리케이션 구성요소에서 측정항목, 이벤트, 메타데이터를 수집합니다. 

Stackdriver는 이러한 데이터를 수집하고 대시보드, 차트, 알림을 통해 유용한 정보를 제공합니다. Stackdriver 알림은 Slack, PagerDuty 등과 통합되어 공동작업 시 유용하게 사용됩니다.

<br/>

### GCP 모니터링 주요기능

GCP 모니터링 도구는 플랫폼F에서 수집하는 Metric 정보를 기반으로 다양한 기능을 제공합니다.
> - 커스텀 대시보드 작성
> - E-Mail, SMS를 통한 알림 규칙 알림 (Log Alerting) 
> - 업타임 모니터링

추가 기능 및 상세한 설명에 대해서는 Google 온라인 문서를 통해 확인 가능합니다.

☞ [GCP Monitoring 상세정보 보기](https://cloud.google.com/monitoring?hl=ko "GCP Monitoring 상세정보 보기")

<br/>

### 모니터링 화면 접속하기

GCP 메뉴의 'OPERATIONS > 모니터링 > 모니터링 개요' 메뉴로 접속합니다.

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/monitoring01.jpg)

</div>

최초 접속시, Monitoring API 설정을 위한 초기화 작업이 이루어 집니다. 
<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/monitoring02.jpg)

</div>

초기화 작업 이후에 나타나는 GCP 모니터링 메인화면은 대시보드 생성과 알림의 메뉴 영역(Left)과 메인 영역으로 구성됩니다. 
<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/monitoring03.jpg)

</div>

<br/>

### 12st 쇼핑몰 모니터링 하기

GCP Stackdriver가 모니터링을 위해 제공하는 Metric 정보는 아주 다양합니다. 

12st 쇼핑몰 컨테이너들의 기본적인 CPU 및 메모리 사용현황 모니터링을 위해, 먼저 커스텀 대쉬보드를 생성하고 모니터링 할 차트(Portal 의 포틀릿 개념)를 하나 하나 추가해 줍니다.

1. 'New Dashboard Name' 창에서 새로운 이름을 입력합니다.
2. 새로운 Dashboard 창에서 우측 상단의 'ADD CHART'를 선택합니다.

><div style="text-align: center;">

> ![](/contents/03_설계--구현--운영단계/07/monitoring04.jpg)
  </div>
  
3. 차트 생성 화면에서 모니터링 할 리소스 유형과 메트릭 정보, 조회할 핕터 정보를 선택합니다.
 여기서는 "GKE Container", "CPU Usage", project_id = "Project-for-MSASchool"을 각각 선택합니다. 
 
4. 저장(SAVE)을 클릭합니다.

<div style="text-align: center;">

> ![](/contents/03_설계--구현--운영단계/07/monitoring05.jpg)

</div>

5. 설정한 메트릭 정보를 기반으로 한 대시보드 화면이 생성되고, 12st 쇼핑몰에 대한 통합 모니터링이 가능합니다. 
<div style="text-align: center;">

> ![](/contents/03_설계--구현--운영단계/07/monitoring06.jpg)

</div>

<br/>

### 12st 쇼핑몰 모니터링 알림 설정하기

운영 단계의 중요한 모니터링 요소 중 하나는 비정상적 운영에 대한 알림(Notification) 기능입니다. 
GCP Stackdriver 모니터링은 알림을 위한 리소스의 메트릭 설정 및 임계치 지정 기능을 제공합니다.     

<br/>

1. 모니터링 화면의 왼쪽 메뉴에서 '알림'을 선택하고 나타나는 화면에서 상단의 'CREATE POLICY'를 클릭합니다.
2. 새로운 알림정책 화면에서 조건을 지정하고, 알림을 수신할 채널 유형과 대상을 입력합니다.

<div style="text-align: center;">

> ![](/contents/03_설계--구현--운영단계/07/monitoring07.jpg) 

</div>

3. Notification 의 'ADD NOTIFICATION CHANNEL'을 선택하여 나타나는 창에서 알림 유형과 해당 정보를 입력합니다.

<div style="text-align: center;">

>![](/contents/03_설계--구현--운영단계/07/monitoring08.jpg)
>
</div>


<br/><br/>