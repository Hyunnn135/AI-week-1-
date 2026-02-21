# Lotto & Fortune Service Blueprint

## Overview
세련된 디자인과 현대적인 웹 기술을 활용한 로또 번호 추첨 및 오늘의 운세 서비스입니다. 사용자에게 즐거운 경험을 제공하기 위해 애니메이션 효과와 감각적인 인터페이스를 제공합니다.

## Style, Design, and Features
- **Design Philosophy:** Glassmorphism 스타일의 투명한 카드 레이아웃과 생동감 넘치는 OKLCH 색상 시스템을 적용합니다.
- **Color Palette:** 버튼 색상을 채도가 낮은 하늘색과 파란색의 중간 톤으로 조정하여 부드러운 느낌을 강조합니다.
- **Typography:** 부드럽고 친근한 느낌을 주기 위해 'Gaegu' Google Font를 사용합니다.
- **Components:** `lotto-ball` 이라는 Custom Element를 사용하여 번호 공을 모듈화합니다.
- **Interactivity:** 추첨 버튼 클릭 시 번호가 하나씩 순차적으로 나타나는 애니메이션을 구현합니다.
- **Responsiveness:** Container Queries를 사용하여 다양한 화면 크기에서도 최적의 레이아웃을 유지합니다.
- **Theme:** 라이트/다크 모드 전환 기능을 제공하며, `localStorage`를 통해 사용자의 선호도를 저장합니다.
- **Fortune Page:** 생년월일을 입력받아 "오늘의 좋은 일", "주의해야 할 일", "요약" 세 가지 섹션으로 구성된 운세를 제공합니다. 운세 내용은 세 줄 정도의 풍부한 설명으로 제공됩니다.

## Implementation Plan (Current Request)
1.  **Color Update:**
    - `style.css`의 `:root` 및 `.dark-mode` 선택자에 정의된 버튼 색상 변수(`--btn-bg`, `--btn-hover-bg`)의 채도와 색조를 조정합니다.
2.  **Git Push:** 모든 변경 사항을 GitHub 저장소에 푸시합니다.
