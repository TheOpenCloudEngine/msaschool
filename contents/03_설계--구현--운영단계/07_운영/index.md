## 운영(Operation) 단계

어플리케이션의 설계와 개발을 잘하였어도, 운영을 잘못하면 결국 어플리케이션의 수명은 짧아집니다. 

MSA 에서 마이크로서비스는 분산환경에서 운영을 하고 그 숫자가 많기 때문에 서비스들의 상태를 일일이 모니터링 하고, 이슈에 대응하는 것은 쉽지 않습니다. 그리하여 Telemetry (원격측정) 기술을 사용하여 서비스들을 모니터링 할 수 있는 환경을 만들어 주어야 합니다. 

Telemetry 를 구성하는 방법으로는 Grafana, Prometheus, EFK와 같이 오픈소스로 직접구현하는 방법, Datadog와 같은 상용 솔루션을 이용하는 방법, 그리고 AWS Cloud watch, GCP Stackdriver와 같이 public cloud의 SaaS를 이용하는 방법이 있습니다. 

이번 단계에서는 MSA 에서 Outer 아키텍처에 해당하는 Telemetry 의 구성 요소인 모니터링, 로깅, 트레이싱 을 Stackdriver 를 사용하여 살펴보는 시간을 가지겠습니다.

![Telemetry](/img/03_Bizdevops/07/cncfmonitor.png)

> 이미지 : https://landscape.cncf.io/

---