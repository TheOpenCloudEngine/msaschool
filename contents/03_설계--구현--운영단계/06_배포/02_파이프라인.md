## 파이프라인

"CI/CD 파이프라인" 은 어플리케이션의 **통합** 및 **테스트 단계**에서부터 **제공 및 배포**에 이르는 어플리케이션의 라이프사이클 전체에 걸쳐 **자동화**와 **모니터링**을 제공하는 프로세스들의 묶음을 의미 합니다. **자동화**를 세부적으로 표현하자면 빌드 자동화(Build Automation)/지속적 통합(Continuous Integration), 테스트 자동화(Test Automation), 배포 자동화(Deployment Automation) 로 구분이 됩니다. 

### 지속적인 통합

먼저 **지속적인 통합**(Continuous Integration) 의 단계를 살펴 보겠습니다. 
CI 는 보통 소스코드를 병합, 빌드, 테스트 단계까지를 칭하지만 컨테이너화 단계가 있다면 컨테이너를 빌드, 테스트 까지 하는 단계까지 포함하곤 합니다. 즉 개발환경에 배포하기 바로 전 단계까지 입니다. 

#### 성공적인 CI 를 구성하기 위해서는 다음의 기능이 필요합니다.

* **CI 결과물로 만들어진 패키지 혹은 컨테이너는 신뢰 할 수 있어야 합니다.**
	- 즉 테스트 자동화가 이루어져, 바로 실행 가능해야 합니다.
	- 자동화된 단위테스트가 필요합니다.
* **빌드에 번호가 매겨지고, 반복 가능해야 합니다.**
* **매일 빌드를 성공적으로 실행해야 합니다.**

#### CI 를 구성할때 주의 사항은 다음과 같습니다.

* **코드 저장소에 모든것을 넣어야 합니다.**
	- 응용 프로그램과 시스템을 구축하고 구성하는 데 필요한 모든 것이 리포지토리에 있어야합니다. 
* **빌드 프로세스는 완전 자동화 되어야 합니다.**
	- 수동 단계는 휴먼에러를 발생 시킵니다.
* **빌드 실패시 바로 수정이 되어야 합니다.**
* **테스트에 시간이 오래 걸리면 안됩니다.**
	- 테스트 실행은 10분이 상한선입니다. ([DORA's research](https://services.google.com/fh/files/misc/state-of-devops-2018.pdf?hl=ko#page=56))
	- 빌드가 오래 걸린다면 병렬로 실행, 리소스 추가, 빌드 분리 등을 도입해야 합니다.
* **코드는 자주 병합되어야 합니다.**
	- 병합 및 통합 주기가 길다면, 더 많은 오류의 발생 여지와 개발자에게 피드백이 늦게 갑니다.

#### 마이크로 서비스에서 일반적으로 구성하는 CI 구성은 다음과 같습니다.

* 소스코드 커밋
* 소스코드 빌드
* 소스코드 테스트
* Docker 빌드
* Docker 테스트


### 테스트 자동화

다음은 **테스트 자동화**(Test Automation) 단계를 살펴 보겠습니다. 
테스트의 단계에는 Unit, Component, Integration, API, UI test 등의 여러 단계가 있습니다. 이중에는 자동으로 할 수 없는 테스트도 존재 합니다. 예를들어 UI 에서 크로스 브라우징 테스트 같은 작업은 자동화가 불가능 합니다. 파이프 라인을 생성 할때 어떤 테스트를 자동화할지 결정해야합니다.  
마이크로 서비스 아키텍처에서는 사실상 End to End 테스트가 힘듭니다. 그 이유는 모든 서비스를 테스트 환경에 올려서 서로간의 통합 테스트를 해야하는데, 모든 서비스를 올리는 것도 쉽지 않고, 자동화 하기도 어렵습니다. 그리하여 가장 많이 하는 테스트는 Unit 테스트와 통합테스트 중에서 컨트랙트 테스트(Contract Test)를 대표적으로 실행합니다. 

* **Unit 테스트** : 응용 프로그램이 제대로 작동하고 있다고 확인할수 있는 테스트 입니다. 보통 Unit 테스트는 소스코드를 빌드 하는 단계에서 같이 실행 합니다.

* **컨트랙트(Contract) 테스트** : 다른 서비스와 계약서를 만든 후에 계약서를 유지시키는 테스트입니다. 예를 들어 'A' 서비스는 'B' 서비스의 API 를 사용중이라면, 'A' 서비스에서 'B' 서비스의 API 에 계약을 걸어, 'B' 서비스에서 API 를 변경 못하도록 합니다. 'B' 서비스는 소스코드 빌드시 API 를 변경하는 계약을 어겼다면 빌드가 실패하게 됩니다. 소스코드를 빌드 하는 단계에서 같이 실행 합니다.

* **회귀(Regression) 테스트** : 개선 사항 및 버그 수정으로 인해 발생할 수있는 버그를 발견하는 테스트 입니다. 이는 신규 기능을 개발하였을때, 발생하는 버그는 이전에 고쳐졌던 버그에서 발생하는 경우가 대부분이라는 경험에서 나오는 테스트입니다. 운영중에 버그가 발생했을 경우 이를 수정하면서 해당 버그를 발견할 수 있는 테스트 케이스를 만들고 이를 테스트 자동화에 적용하는 방법입니다.  

### 배포 자동화

**배포 자동화**(Deployment Automation) 단계는 CI 에서 생성된 패키지 or 컨테이너를 개발 환경과 운영 환경에 자동으로 배포를 하는 단계입니다. 운영환경 배포의 위험을 줄이기 위해서 자동화는 필수입니다.  

배포 자동화를 설계 할때 다음의 사항들을 고려해야 합니다.
* 개발/스테이징/운영 환경에 동일한 배포 프로로세스를 적용해야 합니다. 
	- 운영환경에 배포 전에 충분한 테스트가 가능합니다.

* 모든 환경에 동일한 패키지를 사용합니다. 
	- 개발환경과 운영환경의 소스코드가 다르다면, 자동화의 의미가 없습니다. 
	- 컨테이너 기술(Docker)을 사용하면 패키지가 변경될 일이 없습니다. 
	- 환경별 구성과 패키지를 다르게 유지해야 한다는 것을 의미합니다.

* 배포 이전의 정보로 모든 환경의 상태를 다시 구성할 수 있어야 합니다.
	- 즉 빠른 롤백이 가능하도록 구성이 되어야 합니다.
	- Blue/Green , Shadow 등의 배포 전략이 필요합니다.

* 배포 도구를 사용하면 좋습니다.
	- 각 환경의 빌드를 기록하는 도구
	- 배포를 모니터링 할 수 있는 도구
	- 많은 CI 도구들이 지원을 하고 있습니다.
	
<br/>

## 파이프라인 샘플
![](/img/03_Bizdevops/06/cicdTool01.png)

위 파이프라인은 GitLab + Jenkins + Docker + Spinnaker + Helm + Kubernetes  를 사용하여 구성한 예 입니다. 먼저 다양한 도구를 사용하였는데 사용한 도구 설명을 먼저 하겠습니다.

* GitLab - 소스코드 형상관리 도구
* Jenkins - CI 도구
* Docker - 컨테이너 도구
* Spinnaker - CD 도구
* Helm - 쿠버네티스 패키지 관리 도구
* Kubernetes  - 배포 플랫폼

#### 프로세스 설명

1. 사용자(개발자)는 Git 소스코드 저장소에 코드를 clone 받아서 개발을 하고 개발 완료시 commit/push 를 하게 됩니다. 
	- 소스코드를 push 하게 되면 저장소에 코드가 올라갑니다.
	- Jenkins 이때 trigger 가 동작하여 CI 프로세스 단계가 시작됩니다.

2. Jenkins CI 프로세스는 소스코드 빌드, 테스트 단계를 실행합니다. 
	- 위 그림상에서 테스트는 소스코드에서 실행하는 Unit 테스트와 빌드 완료 후 Curl 로 테스트를 하는 API 테스트를 실행하였습니다.

3. 빌드 완료후 나오는 패키지를 컨테이너로 만드는 단계 입니다. 
	- 컨테이너 도구로는 Docker 를 사용하였습니다. 
	- Docker 빌드를 하여 image 를 생성하고, 이미지를 저장소에 저장하는 publish 단계를 진행 합니다.
	- helm 은 쿠버네티스에 배포를 할때 손쉽게 설정과 필요 라이브러리들을 설정하고, 변수값들을 주입할 수 있는 관리 도구 입니다. 각 환경들에 대한 환경 설정값들과 배포 파일들을 생성 할 수 있습니다.
	- Jenkins를 사용한 CI 프로세스 단계가 마무리 되어집니다.

4. 개발 환경으로 배포를 하는 단계 입니다. 이 단계부터 CD 도구인 Spinnaker 를 사용하였습니다.
	- Spinnaker 는 CD 특화 도구로서, 다양한 배포 전략을 구성 할 수 있습니다.
	- CD 프로세스를 실행 시키는 가장 기본적인 trigger 방법으로는 컨테이너 레지스트리에 이미지가 등록되었을때 트리거를 실행 시킬 수 있습니다.
	- 개발 환경에 배포 후 자동화 테스트를 실행 합니다.

5. 스테이징 환경이 있다면 스테이징 환경으로 배포를 합니다.
	- 스테이징 환경은 보통 운영환경과 완전히 동일한 환경으로 구성 합니다.
	- 최종적으로 운영환경으로 릴리스 하기 전에 테스트를 하게 됩니다.

6. 운영환경으로 자동으로 배포할수도 있지만, 사용자의 의사결정 버튼으로 운영환경 배포를 결정 할수 있습니다.
	- 많은 CD 환경이 이러한 최종 의사 결정 UI 를 제공합니다.

<br/>

## Google Cloud Build 를 사용한 CI/CD 파이프라인 예제

각 클라우드 벤더사에서 제공하는 Managed Service 를 이용하면, 따로 툴을 설치해야하는 수고를 덜 수 있습니다. 기능은 전문적인 CI/CD 툴보다 약간 적을수 있지만, 만약 퍼블릭 클라우드 환경에서 서비스를 제공한다면, 저렴한 가격에 손쉽게 파이프라인을 만들어 사용할 수있는 장점이 있습니다.  

다음은 Google Cloud Build 파이프라인을 이용하여 Github 의 소스를 운영환경인 GKE(Google Kubernetes Engine) 에 배포하는 예제입니다.  

1. GCP 에 가입을 하여 Kubernetes 클러스터를 생성 합니다.  

    ![](/img/03_Bizdevops/06/gcpsample01.png)
    클러스터 생성시 '이름' 과 '위치' 는 추후 파이프라인에서 사용을 할 것입니다.

2. Google Cloud Build 의 사용 api 사용 설정을 합니다.

3. 예제 소스인 https://github.com/event-storming/reqres_orders 을 fork 합니다.

	![](/img/03_Bizdevops/06/gcpsample02.png)

4. GCB 에서 트리거를 생성 합니다.

	![](/img/03_Bizdevops/06/gcpsample03.png)
	
5. 트리거할 gitgub 소스를 선택 하고, 빌드 구성 방식을 Cloud Build 로 선택합니다.

	![](/img/03_Bizdevops/06/gcpsample04.png)
	
6. 트리거 실행 버튼을 클릭 or github 에서 소스코드를 push 하여 트리거를 실행합니다.

7. 트리거된 파이프라인은 cloudbuild.yaml 파일에 있는 CI/CD 프로세스를 실행 하고 빌드,배포 과정을 모니터링 해줍니다.

	![](/img/03_Bizdevops/06/gcpsample05.png)

	![](/img/03_Bizdevops/06/gcpsample06.png)
	
<br/>

### 예제 설명
위의 과정에서 GCB 에서 트리거를 생성하는 단계는 소스코드 형상 저장소인 Github 과 Google Cloud Build 와 연결 되는 과정입니다. 트리거를 생성할때 어떤 방식으로 트리거를 할지에 따라서 결정되지만 보통 개발환경에 배포할때는 master branch 에 코드가 push 되었을때 바로 실행되도록 트리거를 만듭니다. 개발과 동시에 개발환경에서 확인을 하는 방법입니다.

운영환경에 배포를 할때는 master branch 에 push 를 하는 방식으로 설정하면 안됩니다. git 을 사용한다면 Tag 를 하는 방법으로 운영환경에 자동 배포를 할 수도 있습니다.

이제 CI/CD 프로세스를 관리하는 cloudbuild.yaml 파일을 살펴 보겠습니다. 

> 전체 소스 : https://github.com/event-storming/reqres_orders/blob/master/cloudbuild.yaml
> GCB 설정 : https://cloud.google.com/cloud-build/docs

빌드 단계는 총 4단계로 구성하였습니다.
1. 소스코드를 빌드, 테스트, 패키징 단계

	```yaml

	steps:
	  ### Test
	  - id: 'test'
	    name: 'gcr.io/cloud-builders/mvn'
	    args: [
	      'test',
	      '-Dspring.profiles.active=test'
	    ]
	  ### Build
	  - id: 'build'
	    name: 'gcr.io/cloud-builders/mvn'
	    args: [
	      'clean',
	      'package',
	      '-Dmaven.test.skip=true'
	    ]
	```
	- GCB 의 파이프라인은 steps: 로 시작하여 하위 배열이 있는 구조입니다.
	- name 은 필수 값으로 단계에서 사용할 컨테이너를 지정합니다.
	- 즉 파이프라인은 개별 Docker 컨테이너를 실행하여 작업합니다.
	- args 는 명령어에 뒤에 이어질 입력값 입니다.
	- java 파일로 되어있는 프로젝트 이기때문에 메이븐으로 test 와 package 명령을 실행하여 소스코드를 패키징 합니다.

2. 패키징된 소스를 Docker 빌드 단계
	
	```yaml

	  - id: 'docker build'
	    name: 'gcr.io/cloud-builders/docker'
	    args:
	      - 'build'
	      - '--tag=gcr.io/$PROJECT_ID/$_PROJECT_NAME:$COMMIT_SHA'
	      - '.'
	```
	- 도커의 build 명령어를 실행하는 단계입니다.
	- $ 로 시작하는 부분은 GCB 에서 정의된 변수입니다.
	- $_ (언더바) 로 시작하는 변수는 사용자 주입 변수입니다.
	- $_PROJECT_NAME 프로젝트 이름은 결국 image 이름입니다. 이는 매번 변경되는 값이어서 변수처리를 합니다. 

3. 빌드된 Docker image 를 레지스트리에 publish 하는 단계

	```yaml

	  - id: 'publish'
	    name: 'gcr.io/cloud-builders/docker'
	    entrypoint: 'bash'
	    args:
	      - '-c'
	      - |
	        docker push gcr.io/$PROJECT_ID/$_PROJECT_NAME:$COMMIT_SHA
	```
	- 도커의 push 명령어를 실행하는 단계입니다.
	- entrypoint 옵션으로 bash 에서 실행하는 명령어를 그대로 사용할 수 있습니다.

4. 개발환경에 배포 단계

	```yaml

	  - id: 'deploy'
	    name: 'gcr.io/cloud-builders/gcloud'
	    entrypoint: 'bash'
	    args:
	      - '-c'
	      - |
	        PROJECT=$$(gcloud config get-value core/project)
	        gcloud container clusters get-credentials "$${CLOUDSDK_CONTAINER_CLUSTER}" \
	          --project "$${PROJECT}" \
	          --zone "$${CLOUDSDK_COMPUTE_ZONE}"
	        cat <<EOF | kubectl apply -f -
	        apiVersion: v1
	        kind: Service
	        metadata:
	          name: $_PROJECT_NAME
	          labels:
	            app: $_PROJECT_NAME
	        spec:
	          ports:
	            - port: 8080
	              targetPort: 8080
	          selector:
	            app: $_PROJECT_NAME
	        EOF
	```
	- 'gcr.io/cloud-builders/gcloud' 이미지를 사용하면 gcloud 명령어를 사용할 수있습니다.
	- GCB 는 CD 툴이 아니기 때문에 클러스터에 접속을 할때, gcloud 명령어를 사용하여 클러스터에 접근합니다. 명령어에는 클러스터 이름과 지역이 필요합니다. 물론 같은 GCP 의 프로젝트가 아니라면 이와같은 방법으로는 불가능 하고 쿠버네티스 토큰이나, 사용자 인증 단계를 거쳐야 합니다.
	- 클러스터에 배포를 하는 방법은 helm 을 사용하거나, yaml 파일을 만들어서 관리하거나 다양한 방법이 있지만, 예제 이기때문에 직접 쿠버네티스 배포파일을 만들었습니다.
	- cat <<EOF | kubectl apply -f - 명령으로 안쪽에 씌여진 내용을 바로 쿠버네티스에 적용을 하여 배포를 하는 방식입니다.

5. 빌드 환경 설정

	```yaml

	substitutions:
	    _PROJECT_NAME: orders
	options:
	  env:
	    #    # location/name of GKE cluster (used by all kubectl commands)
	    - CLOUDSDK_COMPUTE_ZONE=asia-northeast1-a
	    - CLOUDSDK_CONTAINER_CLUSTER=cluster-1
	```
	- 마지막으로 클러스터에 접근을 하기 위한 변수값 지정과 사용자 변수를 지정하는 부분입니다.
	- 클러스터 생성시 설정하였던 클러스터 이름과 지역을 설정하여 줍니다.
	
<br/>



