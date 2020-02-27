# CI/ CD 설계

ES2CD 도구를 통해 모델링된 결과는 Bounded Context 에 설정한 이름별(Order, Delivery)로
마이크로서비스 코드가 생성 되고, 압축을 풀었을 때 아래와 같은 구조를 가진다.

   ![스크린샷%202019-11-28%20오전%2011](/img/03_Bizdevops/03/04/image68.png)

  - gateway는 기본 제공되는 템플릿으로 spring-cloud-gateway 를 설정하는 방법을 나타내고있다. 정상적으로
    사용시에는 gateway/src/main/resource 의 application.yaml 파일에서 routes 부분을
    수정하여 사용하여야 한다.

  - 파일 구조는 아래와 같이 스티커별로 기본 템플릿에 의하여 생성된다.  
    spring-boot 기반의 프로젝트 이며, maven 으로 리소스를 관리 한다.  
    파일 생성 위치나, 파일 안의 기본 내용을 생성시마다 변경을 하려면 ES2CD의 확장도구인 커스텀 템플릿 기능을 
    활용하면 된다.

> ![스크린샷%202019-11-28%20오후%2012](/img/03_Bizdevops/03/04/image69.png)

  - application.yaml
    
      - spring-boot 의 설정 파일이며, local 환경 변수와 Docker용 환경변수를 profile 설정으로
        분리 된다.
    
      - 이벤트 기반이기 때문에 메시지 처리를 위하여 spring-cloud-stream 라이브러리를 사용한다. 그 중에서
        브로커는 kafka 를 사용하도록 설정된다.

  - Dockerfile
    
      - Docker image 를 생성할 때 필요한 파일이다.
    
      - Docker 로 build 시, "--spring.profiles.active=docker"로 설정되어 있어서
        application.yaml 파일에서 설정한 프로파일을 읽게 된다.

  - cloudbuild.yaml
    
      - Google Cloud Build 에서 사용하는 pipeline 파일이다.
    
      - 기본설정으로 test-build-docker build-publish-deploy 단계가 설정된다.
    
      - Docker publish 단계에서는 GCR (Google Container Registry) 에 이미지를
        배포한다.
    
      - Deploy 단계에서는 GKE 에 배포를 하게 되는데 이때 주의사항은 클러스터 이름과 Zone 을 설정해 줘야한다.
        아래 3가지 항목을 사용자에 맞추어 필수적으로 변경을 해줘야 한다.
        
          - substitutions.\_PROJECT\_NAME: 항목에서 어떤 service 와 deploy 명으로
            배포를 할지 정해지는데, 해당 부분을 변경해 줘야한다.
        
          - CLOUDSDK\_COMPUTE\_ZON: 설정되어있는 Zone 은 도쿄(asia-northeast1-a)
            로 설정이 되어있다.
        
          - CLOUDSDK\_CONTAINER\_CLUSTER: 클러스터 이름은 standard-cluster-1 으로
            default 클러스터 이름이다.

## **선행사항**

  - maven 설치

  - local kafka 실행 – localhost:9092

## **실행**

  - 메이븐 프로젝트이기 때문에 mvn spring-boot:run 명령으로 실행 한다.

  - 정상적으로 실행이 되었다면 브라우저에 localhost:8081 (port 는 프로젝트별로 다르기 때문에 설정파일 참조)
    포트를 통해 Aggregate 에 설정한 속성값들이 HATEOAS 수준으로 정상적으로 나오는지를 확인한다.

  - Command 에 작성한 get, post 등의 메서드가 정상적으로 호출되는지 확인한다.

## **클라우드 배포**

생성된 소스코드를 Github 에 푸시하고 Google Cloud Platform의 GCB 트리거를 생성하여 자동 빌드 및
배포하는 방법을 소개한다.

## **Git 연동**

  - GCB 는 git repository 를 현재까지 github, google code, bitbucket 을 지원한다. 본
    가이드는 이중에서 github 에 코드를 넣는 방법을
    설명한다.

  - [<span class="underline">https://github.com/</span>](https://github.com/)
    에서 레파지토리를 생성한다.

  - 레파지토리를 생성 하고 git 주소가 생성이 된다

  - github 에 올리려는 프로젝트에서 아래와 같은 스크립트를 실행하여 github 에 source 를 push 한다.

  - git init

  - git commit –m ‘commit message’ .

  - git push \<github 주소\>

## **GCB Trigger 생성**

GCB 트리거 생성은 아래와 같은 순서대로 진행
한다.

###### GCP 의 GCB 메뉴로 들어가서 트리거 메뉴를 클릭한다.

![](/img/03_Bizdevops/03/04/image70.png)

###### 상단의 저장소 연결 버튼을 클릭한다

![](/img/03_Bizdevops/03/04/image71.png)

###### 저장소 선택에서 github을 선택한다.

![](/img/03_Bizdevops/03/04/image72.png)

###### 깃헙 인증을 하여 진행한다.

![](/img/03_Bizdevops/03/04/image73.png)

###### 연결할 프로젝트를 선택하여 저장소 연결을 마무리 한다.

![](/img/03_Bizdevops/03/04/image74.png)

###### 상단의 트리거 생성 버튼을 클릭하여 트리거를 생성한다.

![](/img/03_Bizdevops/03/04/image75.png)

###### 트리거 생성 화면의 하단에 빌드 구성을 CloudBuild 로 선택한다.

![](/img/03_Bizdevops/03/04/image76.png)

###### 트리거 만들기 버튼을 클릭하여 트리거생성을 완료한다. 오른쪽의 트리거 실행버튼으로 바로 트리거 실행을 할 수 있다. 

![](/img/03_Bizdevops/03/04/image77.png)

###### 위와 같이 트리거를 생성하였으면, github 에 push 명령을 실행할 때마다, 트리거가 작동하는 것을 확인 할 수 있다.

**쿠버네티스 배포**

##### **\[쿠버네티스 배포 확인\]**

  - 트리거가 정상적으로 실행을 하였으면 기록 메뉴에서 빌드 성공/실패 여부를 확인 할 수있다.

> ![](/img/03_Bizdevops/03/04/image78.png)

  - 빌드 기록에 녹색으로 성공화면이 떠있으면 GKE 에 성공적으로 배포가 된 것이다. GKE 메뉴의 작업 부하 항목에서 현재
    동작하는 서비스를 확인 할 수
있다.

> ![](/img/03_Bizdevops/03/04/image79.png)

##### **\[배포 실패시 해결방법\]**

###### 빌드 실패시 기록 항목에서 아래와 같이 빨간색으로 빌드 실패가 나타나고, 클릭시 어떤 step 에서 에러가 났는지 확인이 가능하다. 로그 다운로드 버튼을 눌러서 상세 로그를 확인하면서 해결이 가능하다.

![](/img/03_Bizdevops/03/04/image80.png)

![](/img/03_Bizdevops/03/04/image81.png)

###### deploy 단계에서 에러가 났을 경우 첫번째로 GCB 에서 GKE 로 배포를 하는 권한이 있는지 체크해 보고, 없을 때 권한 설정을 해준다.

> Cloud빌드 – 설정 메뉴에서 Kubernetes Engine 개발자가 사용설정됨 으로 상태가 보이는지 확인하고,
> 안되어있을시 사용 설정한다.

![](/img/03_Bizdevops/03/04/image82.png)

###### cloudBuild.yaml 파일의 option 부분에 클러스터 Zone 과 이름이 일치하는지 확인 한다.

```yaml
options:  
  env:  
  ## location/name of GKE cluster (used by all kubectl commands)  
  - CLOUDSDK\_COMPUTE\_ZONE=asia-northeast1-a  
  - CLOUDSDK\_CONTAINER\_CLUSTER=standard-cluster-1
```

