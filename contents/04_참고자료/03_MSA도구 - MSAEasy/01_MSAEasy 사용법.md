## MSAEasy 사용법

예제 프로젝트는 주문 서비스와 배송 서비스 2개의 서비스를 EventStorming하여 Spring-boot로 실행되는 Java Project를 생성하고 이들을 구글 클라우드의 쿠버네티스에 자동 배포하는 과정입니다.

## **UI** 소개

### **\[UI 레이아웃\]**

EventStorming2Code 도구의 전체 화면 레이아웃은 다음과 같습니다.

![](/img/03_Bizdevops/03/03/image46.png)

| 번호 | 이름               | 기능 설명                                           |
| -- | ---------------- | ----------------------------------------------- |
| 1  | Zoom Panel       | 캔버스에 작성된 화면을 확대 및 축소 기능                         |
| 2  | Code Preview     | Code를 생성 및 확인 가능한 기능                            |
| 3  | Download Archive | Code를 생성 및 다운로드 가능한 기능                          |
| 4  | Project Name     | 프로젝트 명 입력 (Java의 경우 Package명)                   |
| 5  | Upload           | 저장된 Json형태의 EventStorming파일을 불러오는 기능            |
| 6  | Save             | Draw된 EventStorming파일을 Json파일로 저장함              |
| 7  | Sticker Palette  | EventStorming을 위한 Sticky note를 선택할 수 있는 Palette |
| 8  | Canvas           | Sticky note를 붙이는 Canvas                         |

## **Event**

스티커 팔레트에서 오랜지색 아이콘이 Event를 지칭합니다.

### **\[Event 추가하기\]**

스티커 팔레트에서 주황색 아이콘을 캔버스로 Drag & Drop하여 Event를 추가합니다.
![](/img/03_Bizdevops/03/03/image47.png)

![](/img/03_Bizdevops/03/03/image48.png)

### **\[Event 속성 설정\]**
 
추가된 Event 스티커를 더블 클릭하게 되면, 오른쪽에 아래와 같이 속성 창이 나타나며, 각 속성 설정에 대한 값은 아래와 같습니다.

![](/img/03_Bizdevops/03/03/image49.png)

| 번호 | 이름                   | 기능 설명                     |
| -- | -------------------- | ------------------------- |
| 1  | Event Name           | Event Sticky note에 작성될 이름 |
| 2  | Trigger              | Event가 발생할 때 발생할 Trigger  |
| 3  | Attribute            | Event의 Attribute들 등록      |
| 4  | Associated Aggregate | Event와 연결 될 Aggregate 선택  |

주문팀의 주문 시나리오에 따라 아래와 같이 기입합니다.

1.  Event Name에 “**OrderPlaced**” 라고 기입합니다.

2.  Trigger는 PrePersist를 선택합니다.

3.  Attribute는 Event에서 사용할 Entity를 등록합니다.  
    기본적으로는 아래의 4. 에서 Aggregate가 연결된다면 해당 Aggregate의 Entity정보를 참조합니다.

4.  연결될 Aggregate를 선택합니다. (이후에, Aggregate를 추가한 후에 선택하여 줍니다.)

배송팀은 배송 시나리오에 따라 Event를 생성하여 줍니다.

1.  Event Name에 “**DeliveryStarted**” 라고 기입합니다.

2.  Trigger는 PostUpdate를 선택합니다.

3.  Attribute는 Event에서 사용할 Entity를 등록합니다.  
    기본적으로는 아래의 4. 에서 Aggregate가 연결된다면 해당 Aggregate의 Entity정보를 참조합니다.

4.  연결될 Aggregate를 선택합니다. (이후에, Aggregate를 추가한 후에 선택하여 줍니다.)

## **Policy**

Policy는 스티커 팔레트에서 라일락색 아이콘이 지칭합니다.

### **\[Policy 추가하기\]**

스티커 팔레트에서 라일락색 아이콘을 캔버스로 Drag & Drop하여 Policy를 추가합니다.
![](/img/03_Bizdevops/03/03/image51.png)

![](/img/03_Bizdevops/03/03/image52.png)

###  **\[Policy 속성 설정\]**

추가된 Policy 스티커를 더블 클릭하게 되면, 오른쪽에 아래와 같이 속성 창이 나타나며, 각 속성 설정에 대한 값은 아래와 같습니다.

![](/img/03_Bizdevops/03/03/image53.png)

| 번호 | 이름                   | 기능 설명                      |
| -- | -------------------- | -------------------------- |
| 1  | Policy Name          | Policy Sticky note에 작성될 이름 |
| 2  | Associated Aggregate | Policy와 연결 될 Aggregate 선택  |

해당 이벤트가 발생될 때의 업무에 따라서, 아래와 같이 기입합니다.

1.  Policy Name에 “**StartDeilvery**” 라고 기입합니다.

2.  연결될 Aggregate를 선택합니다. (이후에, Aggregate를 추가한 후에 선택하여 줍니다.)

## **Command**

Command는 스티커 팔레트에서 파란색 아이콘이 지칭합니다.

### **\[Command 추가하기\]**

스티커 팔레트에서 파란색 아이콘을 캔버스로 Drag & Drop하여 Command를 추가합니다.

![](/img/03_Bizdevops/03/03/image54.png)

![](/img/03_Bizdevops/03/03/image55.png)

### **\[Command 속성 설정\]**

추가된 Command 스티커를 더블 클릭하게 되면, 오른쪽에 아래와 같이 속성 창이 나타나며, 각 속성 설정에 대한 값은 아래와 같습니다.

![](/img/03_Bizdevops/03/03/image56.png)

| 번호 | 이름                   | 기능 설명                       |
| -- | -------------------- | --------------------------- |
| 1  | Command Name         | Command Sticky note에 작성될 이름 |
| 2  | Restful Type         | Restful API 의 CRUD Type을 선택 |
| 3  | Associated Aggregate | Command와 연결 될 Aggregate 선택  |

해당 이벤트가 발생될 때의 업무에 따라서, 아래와 같이 기입합니다.

1.  Command Name에 “**CreateOrder**” 라고 기입합니다.

2.  Restful Type은 POST로 설정합니다.

3.  연결될 Aggregate를 선택합니다. (이후에, Aggregate를 추가한 후에 선택하여 줍니다.)

## **어그리게잇 (Aggregate)**

Aggregate는 스티커 팔레트에서 노란색 아이콘이 지칭합니다.

### **\[어그리게잇 추가하기\]**

스티커 팔레트에서 노란색 아이콘을 캔버스로 Drag & Drop하여 Aggregate를 추가합니다.

![](/img/03_Bizdevops/03/03/image57.png)

![](/img/03_Bizdevops/03/03/image58.png)

### **\[어그리게잇 속성 설정\]**

추가된 Aggregate 스티커를 더블 클릭하게 되면, 오른쪽에 아래와 같이 속성 창이 나타나며, 각 속성 설정에 대한 값은 아래와 같습니다.

![](/img/03_Bizdevops/03/03/image59.png)

| 번호 | 이름             | 기능 설명                                   |
| -- | -------------- | --------------------------------------- |
| 1  | Aggregate Name | Aggregate Sticky note에 작성될 이름           |
| 2  | Attributes     | Aggregate Entity (Domain Entity)를 정의합니다. |

주문 서비스의 Aggregate(Domain Entity)를 정의하기 위해, 아래와 같이 기입합니다.

1.  Aggregate Name에 “**Order**” 라고 기입합니다.

2.  Aggregate의 Entity(Domain Entity)를 정의하여 줍니다.  
    해당 서비스에서는 Type은 String인 Name이라는 Entity를 추가하여 줍니다.

배송 서비스의 Aggregate(Domain Entity)를 정의하기 위해, 아래와 같이 기입합니다.

1.  Aggregate Name에 “**Delivery**” 라고 기입합니다.

2.  Aggregate의 Entity(Domain Entity)를 정의하여 줍니다.  
    해당 서비스에서는 Type은 String인 Address라는 Entity를 추가하여 줍니다.

Aggregate를 추가 하였다면 각 Event, Command, Policy들의 Associate Aggregate를 설정하여, Aggregate를 지정하여 줍니다.

## **Bounded Context**

Bounded Context는 스티커 팔레트에서 점선 모양의 아이콘이 지칭합니다.

### **\[Bounded Context 추가하기\]**

스티커 팔레트에서 점선 모양의 아이콘을 캔버스로 Drag & Drop하여 Bounded Context를 추가합니다.

![](/img/03_Bizdevops/03/03/image60.png)

![](/img/03_Bizdevops/03/03/image61.png)

### **\[Bounded Context 속성 설정\]**

![](/img/03_Bizdevops/03/03/image62.png)

| 번호 | 이름                   | 기능 설명                   |
| -- | -------------------- | ----------------------- |
| 1  | Bounded Context Name | Bounded Context에 작성될 이름 |

주문 서비스의 Bounded Context와 배송 서비스의 Bounded Context를 그린 후, 각각의 서비스에 맞게 EventStorming의 Sticky Note들을 각 Bounded Context에 Drag & Drop으로 넣어줍니다.

상기 작성된 4.2.2부터 4.2.6까지의 작업을 완료하면 아래와 같은 형태의 EventStorming 결과물이 나온다.

## **Relation**

Relation은Event 스티커에서 Policy 스티커로 연결되는 선을 지칭합니다.

### **\[Relation 추가\]**

Event 스티커에서 화살표 모양 아이콘을 선택, 또는 Drag 하여 연결될 Policy 스티커를 선택 또는 Drop하면 연결됩니다.

![](/img/03_Bizdevops/03/03/image63.png)

![](/img/03_Bizdevops/03/03/image43.png)

### **\[Relation 속성 설정\]**

![](/img/03_Bizdevops/03/03/image64.png)

| 번호 | 이름           | 기능 설명                                                                                     |
| -- | ------------ | ----------------------------------------------------------------------------------------- |
| 1  | Type         | Event-Driven형식의 Pub/Sub 방식을 사용할 것인지, 또는 Request & Response 방식의 Restful API 방식을 사용할 것인지 설정 |
| 2  | Restful Type | 1번의 Type이 Request & Response 방식일 경우 CRUD중 어떠한 것을 사용할 것인지 설정                               |

주문 서비스의 OrderPlaced의 이벤트가 발생할 경우 StartDelivery가 시작되도록 연결하는데, 어떠한 방식으로 StartDelivery를 시작하게 할 것인지를 설정하여 줍니다.

1.  Event-Driven 방식의 Pub/Sub 방식으로 설정하여 줍니다.

## **EventStorming 결과**

위의 이벤트 스토밍이 완료되면 아래 그림과 같이 나옵니다.

![](/img/03_Bizdevops/03/03/image65.png)

## **코드 프리뷰**

Code Preview를 선택하면 EventStorming 된 결과를 Code Preview를 통하여 Code로 변환된 결과를 확인 할 수 있습니다.

### **\[코드 프리뷰 레이아웃\]**

![](/img/03_Bizdevops/03/03/image66.png)

| 번호 | 이름              | 기능 설명                                                  |
| -- | --------------- | ------------------------------------------------------ |
| 1  | Select Template | Template 중에서 어떤 Template을 사용하여 코드 생성 및 코드 확인 할 것인지 선택. |
| 2  | Code List       | 선택된 Template에 따라서 생성된 폴더 구조와 파일들을 보여줌.                 |
| 3  | Code View       | 선택된 파일의 Code를 표시해 줌.                                   |

## **다운로드 아카이브**

Download Archive를 선택하면 Template을 선택할 수 있으며, EventStroming 된 결과를 Zip파일로 다운로드 받을 수 있습니다.

![](/img/03_Bizdevops/03/03/image67.png)

| 번호 | 이름              | 기능 설명                                                  |
| -- | --------------- | ------------------------------------------------------ |
| 1  | Select Template | Template 중에서 어떤 Template을 사용하여 코드 생성 및 다운로드 받을 것인지 선택. |
