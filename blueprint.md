# Lotto Number Generator Blueprint

## Overview
세련된 디자인과 현대적인 웹 기술을 활용한 로또 번호 추첨 서비스입니다. 사용자에게 즐거운 경험을 제공하기 위해 애니메이션 효과와 감각적인 인터페이스를 제공합니다.

## Style, Design, and Features
- **Design Philosophy:** Glassmorphism 스타일의 투명한 카드 레이아웃과 생동감 넘치는 OKLCH 색상 시스템을 적용합니다.
- **Components:** `lotto-ball` 이라는 Custom Element를 사용하여 번호 공을 모듈화합니다.
- **Interactivity:** 추첨 버튼 클릭 시 번호가 하나씩 순차적으로 나타나는 애니메이션을 구현합니다.
- **Responsiveness:** Container Queries를 사용하여 다양한 화면 크기에서도 최적의 레이아웃을 유지합니다.
- **Color Scheme:** 
  - 1-10: 노란색 계열
  - 11-20: 파란색 계열
  - 21-30: 빨간색 계열
  - 31-40: 회색 계열
  - 41-45: 초록색 계열

## Implementation Plan (Current Request)
1. **HTML Layout:** `index.html`을 업데이트하여 오른쪽 상단에 테마 전환 버튼을 포함할 영역을 추가합니다. 버튼은 눈에 잘 띄고, 향후 다른 버튼을 위한 충분한 공간을 확보합니다.
2. **Web Component & Logic Update:** `main.js`를 수정하여 테마 전환 로직을 구현합니다. 사용자의 테마 선호도를 `localStorage`에 저장하고, 페이지 로드 시 이 설정을 적용합니다.
3. **Styling Update:** `style.css`를 업데이트하여 라이트 모드와 다크 모드에 따른 색상 변수를 정의하고, 버튼 스타일 및 다크 모드 스타일을 추가합니다. 버튼의 시각적 강조를 위해 적절한 스타일을 적용합니다.
4. **Git Push:** 변경 사항을 GitHub 저장소에 푸시합니다.
