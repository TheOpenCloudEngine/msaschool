## MSA 성숙도레벨

<table>
<tbody>
<tr class="odd">
<td></td>
<td><strong>Early (Lv1)</strong></td>
<td><strong>Inception (Lv2)</strong></td>
<td><strong>Expanding (Lv3)</strong></td>
<td><strong>Mature (Lv4)</strong></td>
</tr>
<tr class="even">
<td><p><strong>기능</strong></p>
<p><strong>분해</strong></p></td>
<td>기능과 유즈케이스 단위로 분리<br />
- 비즈니스 역량은 도출한 비즈니스 기능과 유즈케이스 단위로 분리가능</td>
<td>서비스별 인터페이스 정의<br />
- 추출 된 각 유스 케이스와 인터페이스를 통해 액세스 할 데이터에 대해 잘 정의 된 인터페이스를 가짐.</td>
<td><p>도메인 Context 분리</p>
<p>Ubiquitous language 가 다른 bounded context간의 커뮤니케이션 시, Anti-corruption layer를 통해 수행</p></td>
<td>도메인 기반 이벤트<br />
- 구체화된 보기, 읽기 쓰기를 위한 별도의 모델(CQRS) 구축</td>
</tr>
<tr class="odd">
<td><strong>데이터</strong></td>
<td>2PC 사용 가능<br />
- ACID 기반의 트랜잭션을 유지한다. Canonical Data Model 를 지향</td>
<td><p>Scheme per Service</p>
<p>- 각각의 서비스는 자신만의 Scheme를 가짐<br />
- 서비스들과 다중 엔터프라이즈 데이터 저장소 간의 트랜잭션이 적은 조정으로 이루어짐</p></td>
<td><p>DBMS per Service</p>
<p>- 완전히 분산된 데이터 관리<br />
- 서비스별 다른 유형의 DBMS 사용이 가능한 폴리글랏 퍼시스턴스를 지향</p></td>
<td><p>Event-Driven Archi.</p>
<p>- 이벤트 기반 데이터 관리, 이벤트 소싱 및 커멘드 쿼리<br />
- 일시적으로 데이터에 일관성이 없는 상태가 존재할 수 있으나, 일정 시간이 지나면, 데이터가 도착하여 다시 Consistency를 충족</p></td>
</tr>
<tr class="even">
<td><strong>SW<br />
아키텍처</strong></td>
<td>UI/UX : Server Side rendering,<br />
Session based 보안,<br />
단일 언어(eg. Spring framework)</td>
<td>UI/UX : Server Side rendering,<br />
Session cluster 적용,<br />
MSA 지향 언어(eg. Spring Boot)</td>
<td>UI/UX : Client Side rendering,<br />
Token based 보안, OAuth2,<br />
폴리글랏 Language</td>
<td>UI/UX : Client Side rendering+MVVM,<br />
Token based 보안, OAuth2,<br />
폴리글랏 Language + Service Mesh</td>
</tr>
<tr class="odd">
<td><p><strong>Infra</strong></p>
<p><strong>스트럭처</strong></p></td>
<td>지속적인 빌드, 지속적인 통합 운용</td>
<td>지속적인 딜리버리와 배포, 로그의 중앙 집중화</td>
<td>컨테이너 사용(도커), 컨테이너 오케스트레이터(k8s), 외부 구성(유레카, 주키퍼)</td>
<td>자동 프로비저닝을 갖춘 PaaS기반 솔루션</td>
</tr>
<tr class="even">
<td><strong>배포</strong></td>
<td>설치 스크립트 구동, 호스트 당 멀티 서비스 인스턴스</td>
<td>VM 당 하나의 서비스 인스턴스<br />
클라이언트 사이드 로드 벨런싱<br />
서버사이드 로드 벨런싱</td>
<td>Immutable 서버, 컨테이너 당 하나의 서비스 인스턴스, blue/green 배포</td>
<td>멀티 클라우드 및 멀티 데이터 센터 지원</td>
</tr>
<tr class="odd">
<td><strong>팀구조</strong></td>
<td>개발, QA,릴리즈, 운영이 분리된 하나의 기능 팀</td>
<td>공유된 서비스 모델로 팀 공동 작업<br />
내부 소스 공개</td>
<td><p>서비스별 프로덕트 팀(PO, UI/UX 디자이너, 개발자)</p>
<p>Cross Functional한 플랫폼 팀</p></td>
<td>업무 기능별 혹은 도메인별 팀들이 모든 관점에서 책임을 수반. &quot;네가 구축한 것은 네가 운영한다.&quot;</td>
</tr>
</tbody>
</table>

