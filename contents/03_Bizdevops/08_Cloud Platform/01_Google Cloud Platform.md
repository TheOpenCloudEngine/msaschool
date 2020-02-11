# Google Cloud Platform

대표적인 퍼블릭 클라우드 중 하나인 GCP(Google Cloud Platform)는 2008년에 공개된 Google App
Engine(GAE)이 GCP의 기원이 되는 첫 번째 클라우드 서비스로써, 개발한 애플리케이션 프로그램 코드를 업로드(배포)하면
컨테이너를 기반으로 한 독자적인 실행 환경에서 동작하는 PaaS 서비스이다.

이어 2013년에 가상 머신 환경 기반인 Google Compute Engine(GCE)이 제공되었고, 2014년부터 MySQL의
관리형(Managed) 서비스인 Cloud SQL을 서비스하여 기업들이 온프레미스 서버 환경을 비교적 쉽게 GCP로 옮길 수 있는
환경을 제공하였다.

현재 GCP에서는 GCE가 제공하는 가상 머신 환경과 GAE가 제공하는 PaaS 환경의 중간에 위치하는 서비스로
GKE(Google Kubernetes Engine)가 제공되는데, GKE는 오픈소스 소프트웨어인 Kubernetes를 이용한
컨테이너 오케스트레이션 플랫폼으로, 컨테이너식 애플리케이션 배포를 위한 관리형 프러덕션 환경을 제공한다.

<table>
<thead>
<tr class="header">
<th></th>
<th>GCE</th>
<th>GKE</th>
<th>GAE</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>제공되는 환경</td>
<td>가상 머신</td>
<td>Kubernetes를 사용한 컨테이너 클러스터</td>
<td>독자적인 애플리케이션 실행환경</td>
</tr>
<tr class="even">
<td><p>애플리케이션</p>
<p>배포 방법</p></td>
<td>게스트 OS위에 애플리케이션을 설치</td>
<td>Docker 이미지에서 컨테이너를 배포</td>
<td>애플리케이션 코드를 배포</td>
</tr>
<tr class="odd">
<td><p>주요</p>
<p>이용 방법</p></td>
<td>가상머신을 사용해서 기존의 애플리케이션 실행환경을 구축</td>
<td>컨테이너 기반의 마이크로서비스 실행환경을 구축</td>
<td>확장성과 개발효율이 중시되는 애플리케이션 개발과 실행환경으로 제공</td>
</tr>
<tr class="even">
<td><p>벤더</p>
<p>종속성 여부</p></td>
<td>없음</td>
<td>없음</td>
<td>Lock-In(락인)</td>
</tr>
<tr class="odd">
<td><p>적합</p>
<p>애플리케이션</p></td>
<td><p>MSA부적합 어플리케이션</p>
<p>(Lift &amp; Shift)</p></td>
<td>MSA전환 가능 어플리케이션</td>
<td><p>PaaS 기반 어플리케이션</p>
<p>(Serverless)</p></td>
</tr>
</tbody>
</table>

**GCP 환경에서의 기술스텍
(예시)**

| 항 목                | 솔루션/ 툴                    | 서비스 유형             | 비고           |  |
| ------------------ | ------------------------- | ------------------ | ------------ |  |
| Java Framework     | Spring Boot 2.x           | OSS                | 개발 Framework |  |
| Compute Engine     | Google Kubernetes Engine  | GCP managed        |              |  |
|                    | Google Compute Engine     | GCP managed        |              |  |
| RDBMS              | MySQL                     | GCP managed        |              |  |
| NoSQL              | MongoDB                   | OSS                |              |  |
| Storage            | Google Persistent Disk    | GCP managed        |              |  |
| Git Repository     | Cloud Source Repository   | GCP managed        |              |  |
| Container Registry | Google Container Registry | GCP managed        |              |  |
| CI/CD              | Source Builder            | Google Cloud Build | GCP managed  |  |
|                    | Deployment                | Spinnaker          | OSS          |  |
| API Gateway        | Spring Cloud Gateway      | OSS                |              |  |
| Service Mesh       | Istio                     | OSS                |              |  |
| Streaming          | Apache Kafka              | OSS                |              |  |
| Logging            | Stackdriver logging       | GCP managed        |              |  |
| Monitoring         | Stackdriver monitoring    | GCP managed        |              |  |
| Tracing            | Stackdriver tracing       | GCP managed        |              |  |

\* OSS : Open Source Software

기술스텍을 선정하기 위한 기준으로, 단순히 OSS 제품을 사용한다면 얻을 수 있는 이득은 가격적인 측면과 종속성을 줄일 수 있다는
장점이 있는 반면, 유지보수 시 기술지원 한계의 단점이 있다. 반대로 CSP 제품의 경우 가격적인 부담과 Lock-in에 대한
우려가 있지만, 지속적인 지원을 받을 수 있다는 장점이 있다. 따라서 최근에는 서로 다른 제품을 혼합하여 배치하는 추세로
가고 있다.

**GCP 클러스터 구성**

GCP 클러스터란, 쿠버네티스(Kubernetes) 클러스터로 ‘컨테이너화된 어플리케이션을 실행하기 위한 VM인스턴스의 관리형
그룹’을 말하며 GKE(Google Kubernetes Engine)상에서 MSA를 실행하고 운영하기 위한 최상위 물리적
구분 단위라고 이해하면 된다. 일반적으로 개발환경과 운영환경(필요시, 검수환경) 클러스터로 나누고 각 클러스터내에 서비스
모듈별로 구획(이하, 네임스페이스, namespace)을 세분화하여 각 구획별로 서비스를 제어함으로써 관리 운영된다.
(\* 쿠버네티스 클러스터 reference :
[<span class="underline">https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-admin-overview?
hl=ko\#top\_of\_page</span>](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-admin-overview?%20hl=ko#top_of_page))

‘네임스페이스(Namespace)’는 한 쿠버네티스 내의 논리적 구분 단위로 네임스페이스별로 쿠버네티스 오브젝트를 관리하거나
사용자의 권한 역시 이 네임스페이스별로 부여가 가능하다. (\* 네임스페이스 reference :
[<span class="underline">https://kubernetes.io/ko/docs/concepts/overview/working-with-objects/namespaces/</span>](https://kubernetes.io/ko/docs/concepts/overview/working-with-objects/namespaces/))

하나의 클러스터 내에서 개발 및 운영환경을 나누어 구성 가능하나, 네임스페이스는 논리적인 분리 단위이지 물리적이나 기타 장치를
통해 환경을 분리(Isolation)한 것이 아니므로 다른 네임스페이스간에 통신이 가능하다.

물론, 네트워크 정책을 이용하여 네임스페이스간의 통신을 막을 수 있지만 높은 수준의 분리 정책을 원하는 경우에는 클러스터 자체를
분리하는 것이 바람직하다.
