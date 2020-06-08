## 배포자동화 :  CI/CD 실습시 필요한 스크립트


### Aws CodeBuild
<details>
<summary>Aws CodeBuild</summary>
<p>


- CodeBuild 생성시 환경변수명
  - AWS_ACCOUNT_ID
  - KUBE_URL
  - KUBE_TOKEN
  
- CodeBuild 와 ECR 연결 정책설정
    ````
    
    "{
          "Action": [
            "ecr:BatchCheckLayerAvailability",
            "ecr:CompleteLayerUpload",
            "ecr:GetAuthorizationToken",
            "ecr:InitiateLayerUpload",
            "ecr:PutImage",
            "ecr:UploadLayerPart"
          ],
          "Resource": "*",
          "Effect": "Allow"
     }"
    ````

- CodeBuild 와 EKS 연결
  - 1. eks-admin-service-account.yaml 파일 생성하여 sa 생성
  
    ````yaml
    
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: eks-admin
      namespace: kube-system
    ````
    
  - 2. kubectl apply -f eks-admin-service-account.yaml
  - 혹은, 바로 적용도 가능함
  
    ````shell script
    
    cat <<EOF | kubectl apply -f -
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: eks-admin
      namespace: kube-system
    EOF
    ````

  - 3. eks-admin-cluster-role-binding.yaml 파일 생성하여 롤바인딩
    ````yaml
      
    apiVersion: rbac.authorization.k8s.io/v1beta1
    kind: ClusterRoleBinding
    metadata:
      name: eks-admin
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: ClusterRole
      name: cluster-admin
    subjects:
    - kind: ServiceAccount
      name: eks-admin
      namespace: kube-system
    ````

  - 4. kubectl apply -f eks-admin-cluster-role-binding.yaml
  - 혹은, 바로 적용도 가능함
    ````shell script
      
    cat <<EOF | kubectl apply -f -
    apiVersion: rbac.authorization.k8s.io/v1beta1
    kind: ClusterRoleBinding
    metadata:
      name: eks-admin
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: ClusterRole
      name: cluster-admin
    subjects:
    - kind: ServiceAccount
      name: eks-admin
      namespace: kube-system
    EOF
    ````
  - 만들어진 eks-admin SA 의 토큰 가져오기
    - kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep eks-admin | awk '{print $1}')



</p>
</details>
<hr />
<br />


### Azure Pipeline
<details>
<summary>Azure Pipeline</summary>
<p>


- azure shell 에서 클러스터 연결
- az aks get-credentials --resource-group (user01_resource_group) --name (user01_cluster)
- 연결 확인
- kubectl get all
- AKS와 ACR 연결
- az aks update -n [azure-cluster-name] -g [azure-resource-Group-name] --attach-acr [azure-acr-name]
- monolith --image=[your container registry].azurecr.io/monolith:$(Build.BuildId)
- copy file 에 다음과 같이 입력
  - Source Folder    : $(system.defaultworkingdirectory)    
  - Contents    : azure/* 
  - Target Folder : $(build.artifactstagingdirectory)
- image deployment/monolith monolith=[your-acr].azurecr.io/monolith:$(Build.BuildId)


</p>
</details>
<hr />
<br />
