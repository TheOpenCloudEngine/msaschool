## 최종 트랜젝션 (Eventual Transaction)


![](/img/03_Bizdevops/05/05/evt_t01.png)

## CAP 이론

![](/img/03_Bizdevops/05/05/cap.png)

분산 시스템에서, 데이터 일관성(data consistency), 시스템 가용성(system availability), 네트워크 분할 허용성(network to partition-tolerance) 간의 고유한 균형이 존재한다. 시스템은 이들 세 특성 가운데 두 가지를 제공할 수 있지만, 세 가지 모두는 제공하지 않는다. 이를 CAP 추측(CAP conjecture)이라고 한다

일관성(Consistency) : 
	- 모든 노드가 같은 시간에 같은 데이터를 볼수 있는것을 의미합니다.
	- 만약 최신 데이터가 아니라면 에러를 돌려줘야 합니다.
	- 분산환경에서 가장 구현이 어려운 개념입니다.

가용성(Availability) : 
	- 모든 클라이언트가 읽고 쓸수 있어야 합니다. 즉 몇개의 노드가 죽어도 항상 시스템이 응답 가능한 상태를 뜻합니다.
	- 가용성을 보장한다는 말은 이전 데이터를 볼수도 있다는 말입니다.

분단 내성(Partition tolerance) : 
	- 데이터가 분산 환경에 나누어져 있는 환경에서도 잘 동작하는 것을 의미합니다.


마이크로 서비스는 분산 환경에서 작동하기 때문에 항상 P 를 만족해야 합니다. 이러한 상황에서 일관성(Consistency) 을 선택 할 것이냐, 가용성(Availability) 을 선택해야 합니다. 

만약 C + P 의 상황은 

이러한 상황에서 최종 일관성 (Eventual Consistency) 은 A + P 를 만족하는 상황에서 결론적으로 C 를 만족하는 방법입니다. 

이것은 순간적으로 과거의 상황을 볼 수 있지만, 결국은 일관성이 마추어 집니다.

![](/img/03_Bizdevops/05/05/evt_t02.png)
![](/img/03_Bizdevops/05/05/evt_t03.png)

## SAGA 패턴


## lab

![](/img/03_Bizdevops/05/05/lab01.png)
![](/img/03_Bizdevops/05/05/lab02.png)
![](/img/03_Bizdevops/05/05/lab03.png)