# 00. DOM과 Event 기본 개요

## 1. DOM이란?

DOM(Document Object Model)은 브라우저가 HTML 문서를 해석하여 만든 객체 구조이다.

브라우저는 HTML 문서를 그대로 문자열로 다루지 않는다.  
HTML 태그, 속성, 텍스트를 각각 객체로 변환하고, 이 객체들을 부모-자식 관계를 가진 트리 구조로 구성한다. 이 구조를 DOM이라고 한다.

JavaScript는 DOM을 통해 HTML 요소를 선택하고 변경할 수 있다.  
따라서 DOM 수업에서는 "HTML 요소를 JavaScript로 어떻게 찾고, 바꾸고, 추가하고, 삭제할 것인가"를 중심으로 학습한다.

## 2. DOM 조작이 필요한 이유

HTML과 CSS만 사용하면 처음 작성한 화면을 보여줄 수 있다.

하지만 사용자의 동작에 따라 화면이 바뀌어야 한다면 JavaScript로 DOM을 조작해야 한다.

예를 들어 DOM 조작으로 다음과 같은 기능을 만들 수 있다.

1. 버튼을 클릭하면 문구 변경
2. 입력한 값을 화면에 출력
3. 특정 요소의 색상이나 크기 변경
4. 목록 항목 추가와 삭제
5. 조건에 따라 요소를 보이거나 숨기기

즉, DOM은 JavaScript가 HTML 화면을 제어하기 위한 연결 통로이다.

## 3. DOM 요소 선택

DOM을 조작하려면 먼저 조작할 HTML 요소를 선택해야 한다.

대표적인 요소 선택 방법은 다음과 같다.

1. `document.getElementById()`
   - id 값을 기준으로 하나의 요소를 선택한다.

2. `document.querySelector()`
   - CSS 선택자를 사용하여 조건에 맞는 첫 번째 요소를 선택한다.

3. `document.querySelectorAll()`
   - CSS 선택자를 사용하여 조건에 맞는 여러 요소를 선택한다.

수업에서는 CSS 선택자와 연결하기 쉽고 실무에서도 자주 사용하는 `querySelector()`, `querySelectorAll()` 중심으로 다룬다.

```javascript
const title = document.querySelector('#title');
const items = document.querySelectorAll('.item');
```

## 4. DOM 요소 변경

선택한 요소는 JavaScript로 내용, 속성, 스타일, 클래스를 변경할 수 있다.

```javascript
const title = document.querySelector('#title');

title.textContent = '변경된 제목';
title.style.color = 'blue';
title.classList.add('active');
```

주요 조작 대상은 다음과 같다.

1. 내용 변경
   - `textContent`, `innerHTML`

2. 속성 변경
   - `getAttribute()`, `setAttribute()`

3. 스타일 변경
   - `style`

4. 클래스 변경
   - `classList.add()`, `classList.remove()`, `classList.toggle()`

## 5. Event란?

Event는 브라우저에서 발생하는 사용자 동작이나 상태 변화를 의미한다.

예를 들어 사용자가 버튼을 클릭하거나, 키보드를 입력하거나, 폼을 제출하면 브라우저는 이벤트를 발생시킨다.

JavaScript는 이벤트를 감지하고, 이벤트가 발생했을 때 실행할 코드를 등록할 수 있다.  
이때 이벤트가 발생했을 때 실행되는 함수를 이벤트 핸들러라고 한다.

## 6. 이벤트 핸들러 등록

이벤트 핸들러를 등록하는 방법은 여러 가지가 있지만, 수업에서는 `addEventListener()` 방식을 중심으로 사용한다.

```javascript
const button = document.querySelector('#btn');

button.addEventListener('click', function () {
    console.log('버튼 클릭');
});
```

`addEventListener()`는 다음과 같은 구조로 작성한다.

```javascript
요소.addEventListener('이벤트타입', 실행할함수);
```

예를 들어 클릭 이벤트는 `click`, 입력 이벤트는 `input`, 제출 이벤트는 `submit`을 사용한다.

## 7. BOM이란?

BOM(Browser Object Model)은 브라우저 창이나 주소, 시간 지연 실행처럼 브라우저 환경을 제어하기 위해 제공되는 객체와 기능을 의미한다.

대표적으로 다음 기능을 사용할 수 있다.

1. `alert()`, `confirm()`, `prompt()`
   - 브라우저의 기본 대화상자를 표시한다.

2. `location`
   - 현재 페이지 주소를 확인하거나 다른 주소로 이동한다.

3. `setTimeout()`, `setInterval()`
   - 일정 시간 뒤에 코드를 실행하거나, 일정 간격으로 코드를 반복 실행한다.

이번 수업에서는 DOM과 Event를 먼저 배운 뒤, 버튼 클릭 이벤트와 연결하여 BOM 기능을 다룬다.

## 8. DOM과 Event의 관계

DOM과 Event는 함께 사용될 때 화면을 동적으로 만들 수 있다.

DOM은 화면 요소를 선택하고 변경하는 기능이다.  
Event는 사용자의 동작을 감지하는 기능이다.

따라서 실제 화면 구현에서는 다음 흐름으로 코드를 작성한다.

1. HTML 요소를 선택한다.
2. 선택한 요소에 이벤트를 등록한다.
3. 이벤트가 발생하면 실행할 코드를 작성한다.
4. 실행 코드 안에서 DOM을 변경한다.

```javascript
const button = document.querySelector('#changeButton');
const message = document.querySelector('#message');

button.addEventListener('click', function () {
    message.textContent = '버튼을 클릭했다.';
});
```

이번 DOM/Event 수업에서는 사용자의 동작에 반응하여 화면을 변경하는 기본 흐름을 익히는 것이 핵심이다.
