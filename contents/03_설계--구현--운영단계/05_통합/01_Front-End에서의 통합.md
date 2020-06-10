## Microservice Integration by UI

마이크로 서비스의 통합을 위하여 기존에 Join SQL 등을 사용하지 않고 프론트-엔드 기술이나 API Gateway 를 통하여 서비스간 데이터를 통합해야 합니다. 그중 프론트엔드에서 데이터를 통합하기 위한 접근 방법으로는 W3C 의 Web Components 기법과 MVVM 그리고 REST API 전용 스크립트를 이용하는것이 유용 합니다. 

![ui](/img/03_Bizdevops/05/01/ui-integrate.png)

위 그림에서 왼쪽 그림이 마이크로 서비스에서 지향하는 ui 를 통하여 데이터를 통합 하는 모형입니다. Stateful or Stateless 서비스 들이 ui 에서 자신의 영역을 가지고 있는 것입니다. 자신의 영역을 가지고 있다는 말은 각 서비스들이 ui 까지 간섭을 한다는 의미입니다. 하지만 수많은 서비스들이 ui 를 간섭한다면 ui 에서는 혼란 스럽지 않을까? 이럴때 필요한 기술이 **Web Components 기법** 입니다.  

<br/>

### Web Components 기법

facebook 이나 amazon 같은 site 는 겉보기에는 하나의 통합된 site 이지만 내부적으로는 100개가 넘는 마이크로 서비스들을 호출하여 각각의 데이터를 가져 오고 있습니다. 각각의 서비스들은 꾸준히 업그레이드를 하고 있기에, 지속적으로 ui 나 data 가 변경이 될 것입니다. ui 를 담당하는 팀은 각 서비스들의 데이터를 잘 배치하고, 재사용성을 높이고, 꾸준히 업그레이드를 해줘야 하는데 이는 일반적인 HTML 로는 표현이 너무 복잡해 진다.  

웹 컴포넌트는 재사용을 원하는 어느곳이든 코드 충돌에 대한 걱정이 없는 캡슐화된 기능을 갖춘 다용도의 커스텀 엘리먼트를 생성하기 위해 만들어 졌다. 다음의 3가지 주요 기술을 가진다.  

* **Custom elements**: 사용자 인터페이스에서 원하는대로 사용할 수있는 사용자 정의 요소 및 해당 동작을 정의 할 수있는 JavaScript API 세트.  

* **Shadow DOM**: 캡슐화된 "그림자" DOM 트리 - 엘리먼트(메인 다큐먼트 DOM 으로부터 독립적으로 렌더링 되는)를 추가하고 연관된 기능을 제어하기 위한 JavaScript API 의 집합. 이 방법으로 엘리먼트의 기능을 프라이빗하게 유지할 수 있어, 다큐먼트의 다른 부분과의 충돌에 대한 걱정 없이 스크립트와 스타일을 작성할 수 있습니다.  

* **HTML 템플릿**: `<template>` 과 `<slot>` 엘리먼트는 렌더링된 페이지에 나타나지 않는 마크업 템플릿을 작성할 수 있게 해준다. 그 후, 커스텀 엘리먼트의 구조를 기반으로 여러번 재사용할 수 있습니다.

> 자세한 설명은 https://developer.mozilla.org/ko/docs/Web/Web_Components 를 참고  

![Web Components](/img/03_Bizdevops/05/01/03_05_01_01.png)

위와같이 Web Components 을 사용하여 Custom Tag 를 생성 한 후 해당 Tag 는 각각의 서비스에게 위임을 하는 형식으로 개발이 되고, 최종적으로 ui 를 담당하는 팀은 해당 태그를 적절한 위치에 배치를 시키면 됩니다. 예를 들어 '주문' 기능을 가진 버튼을 생성시, 주문 영역에 해당하는 부분을 `<order>` 라는 커스텀 태그로 선언하고, 해당 태그를 주문 팀에서 화면까지 만들도록 관리를 하는 것입니다.  

이와같이 Tag 로 만들시 장점은 재사용이 가능하고, ui 도 마이크로 서비스에서 처럼 분리된 영역으로 개발이 가능해 진다. 또한 재사용성이 늘어나니 테넌트별로 각기 다른 ui 를 표현 할 수 있습니다.  


<br/>

## Web Components 기법을 사용한 쇼핑몰 적용 예제

* 프론트 엔드를 개발 할때 package 를 나누어서 각 마이크로 서비스가 담당하도록 설계를 하였습니다.
    - order package 는 Order 서비스 팀에서 관리를 합니다.

<img src="/img/03_Bizdevops/05/01/03_05_01_03.png" alt="" title="" width="40%" height="30%" />  

* `<template>` 을 사용하여 소스코드는 템플릿화 시켜서 중복 사용하거나, 필요한 화면에서 태그로 호출하여 사용하도록 설정함

```html
<template>
    <v-dialog v-model="buyDialog" width="800">
        <order
                v-if="buyDialog"
                v-model="buy"
                @cancel="buyDialog=false"
        ></order>
    </v-dialog>

    <v-dialog v-model="editDialog" width="500" >
        <product-add
                v-if="editDialog"
                v-model="edit"
                @cancel="editDialog=false"
        ></product-add>
    </v-dialog>
</template>
```

참고 소스 코드 : 
[Client - UI]: https://github.com/event-storming/ui

<br/>

## UI 통합 개발시 주의 사항

UI 개발시 가장 하지 말아야 할 안티패턴으로 UI 에서 순차적인 호출로 트랜잭션을 묶으려는 방법입니다. 
주문이 성공 하고 난 후에 상품의 재고량을 바꾼다는 프로세스가 있을시, 클라이언트에서 순차적으로 호출을 한다면 위와 같은 그림이 나올 것입니다. 클라이언트의 네트워크는 언제든 끈길수 있고, 해킹의 가능성이 있으니 운이 좋으면 성공 할수도 있지만 **실패한다면 영원한 데이터의 불일치가 나올수 있으니 절대로 하면 안됩니다**. 두번째 호출시 네트워크가 끈긴다면 재고량이 수정이 안될것이고, 두번째 호출 url 만 알아내어 악의적으로 호출을 할 수도 있으니, 트랜잭션 관련한 호출은 서버단에서 한번에 처리를 해야 합니다.  

<img src="/img/03_Bizdevops/05/01/03_05_01_05.png" alt="" title="" width="70%" height="70%" />

 
<br/>
