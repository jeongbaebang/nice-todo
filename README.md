<img width="1440" alt="스크린샷 2024-08-20 오후 5 38 06" src="https://github.com/user-attachments/assets/16730914-1cd6-4ebd-9b80-7eee0e197fc2">

---

### 배포 주소

Link: https://jeongbaebang.github.io/nice-todo/

### 기능

- 다크/라이트 테마 지원
- Todo 아이템 생성
- Todo 아이템 삭제
- Todo 아이템 수정
- Todo 아이템 유효성 검사
- Todo 아이템 완료/미완료 상태 표시
- 빈 아이템 항목 표시
- Todo 아이템 개수표시
- - 할일 목록
  - 완료된 목록
  - 삭제된 목록
  - 삭제처리된 완료 목록
- Todo 아이템 상태 유지(로컬스토리지)
- Todo 아이템 삭제된 항목 관리 기능
- Todo 아이템 삭제된 항목 롤백 지원
- Todo 아이템 삭제된 항목 상태 유지 롤백 기능

### 프로젝트 기간

2024.08.19 - 2024.08.20 (18시간)

### 프로젝트 기여자

방정배(본인) 100%

### 기술스택

`JavaScript` `HTML5` `SCSS`

### 빌드 도구

`parcel`

### Flow Chart

![기능흐름도](https://github.com/user-attachments/assets/6a204ba7-af44-4f59-92d6-9078738ffa41)

### 개발 이슈 🤨

#### 1. 클래스의 this 바인딩 이슈

```js
...

this.form.addEventListener('submit', this.handler.bind(this));
```

#### 해결 방식:

bind의 중요성: 만약 bind를 사용하지 않았다면, this는 이벤트 객체를 발생시킨 DOM 요소를 참조할 것입니다.
따라서, this.handler 사용하려고 하면 undefined가 되어버립니다. bind를 사용함으로써 handler 메서드의 this가 정확한 객체를 참조하도록 보장을 해야 하는 문제가 있었습니다.

이벤트 핸들러의 this 바인딩: 이벤트 핸들러는 이벤트가 발생한 객체를 this로 사용하므로, 핸들러 메서드 내에서 this가 이벤트를 발생시킨 객체가 됩니다.
form.handler.bind(this)을 사용하여 handler 메서드의 this가 항상 FormHandler 클래스의 인스턴스로 바인딩되도록 합니다.

### 개발적 고민 🔥

#### 1. 한정적 시간에 따른 코드 품질과 기능 구현의 분배

프로젝트의 제한된 시간 내에서 코드 품질과 기능 구현을 균형 있게 분배하는 것이 중요했습니다.
간단한 ToDo 프로젝트였지만, 화면 설계서, 플로우차트, 디자인 작업, 기능 개발 등을 위해 약 18시간이 할당된 상황이었고, 이 시간을 효율적으로 사용하기 위해 신경을 많이 썼습니다.

특히, 추가 기능까지 구현하여 작업의 완성도를 높이고자 하였습니다. 저는 기능 구현에 더 많은 시간을 할애하기로 결정했고,
시간을 효율적으로 사용하기 위해 기능 흐름도를 기반으로 공통 로직과 컴포넌트를 최대한 활용하려 했습니다.
예를 들어, 사용자 입력을 받는 Form 컴포넌트를 ToDo 아이템 항목에도 재사용할 수 있도록 구현하여 시간을 크게 단축하는 경험을 했습니다.

또한, 잠재적 버그로 인해 문제 해결에 많은 시간을 소비하지 않기 위해 유효성 검사를 포함하는 함수를 작성하였고, 이로 인해 실제로 많은 시간을 절약할 수 있었습니다.

```js
/**
 * tag값을 가져오는 함수
 * @param {?string} tag
 * @returns {Element}
 */
export const $ = (tag) => {
  if (typeof tag !== 'string' || tag === '') {
    throw new TypeError('It must be a valid tag name.');
  }

  const $tag = document.querySelector(tag);

  if ($tag === null) {
    throw new Error(`Invalid tag:${tag}`);
  }

  return $tag;
};
```

#### 2. 프로젝트 구조화

프로젝트의 기능이 많아지면서 코드의 양도 점점 증가했고, 후반부에는 필요한 로직을 빠르게 찾는 데 어려움을 겪었습니다.
이 문제를 해결하기 위해 각 기능의 역할에 맞게 관심사를 최대한 분리하여, 각 기능이 하나의 역할만 수행하도록 구현하려고 노력했습니다.

### 공통 디자인 사안 🎨

#### 테마

![TodoDesign](https://github.com/user-attachments/assets/e8c80489-b0d6-47a1-871a-66ceec011b8f)<br/>

#### ToDo 시안 1️⃣

![Todo - Empty](https://github.com/user-attachments/assets/30fe44af-00ac-4ff3-987c-3961af2d4842)<br/>

#### ToDo 시안 2️⃣

![Todo](https://github.com/user-attachments/assets/c5b4a0f3-5324-4c9a-901a-465bef689456)<br/>

<br/><br/>
