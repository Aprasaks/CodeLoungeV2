# CodeLoungeV2

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> React, Vite, Monaco Editor로 만든 모던한 다크 모드 코드 플레이그라운드 학습 및 협업 플랫폼

---

## 📖 목차

- [✨ 소개](#✨-소개)
- [🚀 주요 기능](#🚀-주요-기능)
- [🛠 설치](#🛠-설치)
- [⚙️ 사용법](#⚙️-사용법)
- [📁 폴더 구조](#📁-폴더-구조)
- [🧰 기술 스택](#🧰-기술-스택)
- [📄 라이선스](#📄-라이선스)

---

## ✨ 소개

CodeLoungeV2는 HTML, CSS, JavaScript를 실습할 수 있는 다크 모드 기반 웹 애플리케이션입니다. VS Code와 유사한 Monaco Editor와 실시간 미리보기, 콘솔 출력을 제공하여 학습과 협업에 최적화되어 있습니다.

- 로컬스토리지 기반 회원가입 및 로그인
- 나만의 코드방 생성 및 참여
- HTML/CSS/JS 탭 전환으로 코드 작성
- 실시간 미리보기 및 콘솔 모드 지원
- 슬라이드 인 채팅창 및 참여자 목록 확인

---

## 🚀 주요 기능

- **인증**: 간단한 회원가입/로그인 (localStorage)
- **코드방 관리**: 코드방 생성, 조회, 이동
- **Monaco Editor**: 문법 강조, 자동 들여쓰기, 괄호 매칭
- **실시간 미리보기**: `iframe`을 통한 안전한 렌더링
- **콘솔 모드**: 콘솔 탭에서 실행 버튼 클릭 시 `console.log` 출력
- **채팅 UI**: ZEP 스타일 슬라이드 인 채팅창
- **참여자 목록**: 이모지 클릭 시 모의 사용자 목록 표시
- **다크 모드**: 전체 애플리케이션 다크 테마
- **반응형 디자인**: 데스크톱 및 모바일 최적화

---

## 🛠 설치

```bash
git clone https://github.com/Aprasaks/CodeLoungeV2.git
cd CodeLoungeV2
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 열기

---

## ⚙️ 사용법

1. 회원가입/로그인
2. “시작하기” 버튼 클릭하여 코드방 생성
3. 방 목록에서 방 선택
4. HTML/CSS/JS 탭에서 코드 작성
5. 미리보기 탭: 실시간 렌더링 확인
6. 콘솔 탭: 실행 버튼 클릭 후 `console.log` 출력
7. 채팅하기 버튼 클릭: 슬라이드 인 채팅창
8. 이모지 클릭: 참여자 목록 확인

---

## 📁 폴더 구조

```
CodeLoungeV2/
├─ public/             # 정적 자원 및 index.html
├─ src/
│  ├─ components/      # React 컴포넌트
│  ├─ styles/          # CSS 파일
│  ├─ defaultCode/     # 초기 코드 스니펫
│  ├─ assets/          # 이미지 및 아이콘
│  ├─ App.jsx          # 메인 컴포넌트
│  └─ main.jsx         # 진입점
├─ package.json        # 프로젝트 메타데이터 및 스크립트
├─ vite.config.js      # Vite 설정
└─ README.md           # 프로젝트 개요
```

---

## 🧰 기술 스택

- **Framework**: React
- **Bundler**: Vite
- **Editor**: Monaco Editor
- **Routing**: React Router
- **Styling**: CSS (Flexbox)
- **Storage**: localStorage

---

## 📄 라이선스

MIT 라이선스. 자세한 내용은 [LICENSE](LICENSE) 파일 참고.

