## 실시간 로그 조회

Stackdriver Logging을 사용하면 Google Cloud Platform과 AWS(Amazon Web Services)의 로그 데이터 및 이벤트를 저장, 검색, 분석, 모니터링하고 알림을 받을 수 있습니다. 

API를 통해 소스에 상관없이 커스텀 로그 데이터의 수집도 가능합니다. Stackdriver Logging은 대규모로 실행되며 수천 개의 VM 에서 애플리케이션 및 시스템 로그 데이터를 수집할 수 있는 Full Managed Service 입니다. 

<br/>

### GCP 로그뷰어 주요 기능

GCP 가 제공하는 로그 뷰어는 실시간 로그 분석 이외에도 다양한 로그 관련 기능을 제공합니다.
> - 커스텀 로그 작성
> - 로그 이벤트 알림 (Log Alerting)
> - Fluentd 에이전트를 활용한 AWS 로그 통합
> - BigQuery를 사용한 로그 분석

추가 기능 및 상세한 설명에 대해서는 Google 온라인 문서를 통해 확인 가능합니다.

☞ [GCP Logging 상세정보 보기](https://cloud.google.com/logging?hl=ko "GCP Logging 상세정보 보기")

<br/>

### 로그 뷰어 접속하기

GCP 메뉴의 'OPERATIONS > 로그 기록 > 로그 뷰어' 메뉴로 접속합니다.

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/logging01.jpg)

</div>

로그 뷰어의 메인은 로그기반 측정항목을 포함 기본 메뉴영역(Left)과 리소스별 로그 정보를 탐색할 수 있는 메인 영역으로 구성됩니다.

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/logging02.jpg)

</div>

<br/>

### 12st 쇼핑몰 로그 보기

12st 쇼핑몰의 마이크로서비스 로그는 GCP 로그뷰어 화면 중앙의 리소스 필터를 설정하여 열람 합니다.
>
> 1. 최상위 리소스를 Kubernetes 컨테이너로 선택합니다.
> 2. 클러스터는 Cluster-1 을 선택합니다.
> 3. 네임스페이스는 default 를 선택합니다.
> 4. 컨테이너 리스트 팝업에서 '모든 container_name' 을 선택합니다.

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/logging03.jpg)

</div>

<br/>

12st 쇼핑몰 로그뷰어를 위한 리소스 선택이 끝나면, 모든 마이크로서비스 컨테이너에 대한 로그가 함께 출력됩니다.

'로그 스트리밍(Log Streaming)' 기능으로 실시간 모니터링이 가능하며, 로그 수준(중요: Critical, 오류: Error, 주의: Warning, 정보: Info, 디버그: Debug) 설정 및 로그 히스토리에 대한 시간대별 조회가 가능합니다. 

<div style="text-align: center;">

![](/contents/03_설계--구현--운영단계/07/logging04.jpg)

</div>

<br/><br/>