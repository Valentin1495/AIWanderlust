# AIWanderlust

![image](https://github.com/Valentin1495/AIWanderlust/assets/69514169/16b0c020-5aef-434d-a058-3278963319b2)

## Overview

당신의 다음 여행을 더욱 특별하게 만들어보세요! AIWanderlust는 여행 계획을 쉽고 편리하게 만들어주는 도구입니다. 이 앱은 [Google Maps API](https://developers.google.com/maps/documentation/javascript?hl=ko) 와 [PaLM API](https://developers.generativeai.google/guide/palm_api_overview) 의 강력한 기능을 결합하여 최상의 여행 경험을 제공합니다.

## Key Features

- _여행 목적지/관심사 입력_ : **custom Hook**으로 만든 **multistep form**을 작성합니다. 상단의 **progress bar**가 진행 상황을 보여줍니다. 이는 더 좋은 **UX**를 위함입니다.

  ![image](https://github.com/Valentin1495/TravelGPT/assets/69514169/508c2b9e-e597-4b56-82eb-f8b7758f8ed6)

  ![image](https://github.com/Valentin1495/TravelGPT/assets/69514169/4fa377ce-7bd9-4e1b-9825-797011ff01c5)

- _Google Maps를 통한 시각화_ : Form을 제출하면, 사용자가 입력한 목적지의 경도와 위도를 **search params**로 전달합니다. 이를 이용하여 **Google Maps API**를 호출하고, 해당 위치를 **Google Maps**에 표시합니다.

  ![image](https://github.com/Valentin1495/AIWanderlust/assets/69514169/30427377-bb1a-496f-be82-2cab6a4c19ae)

- _PaLM API에 의한 맞춤 여행 일정 생성_ : 사용자가 선택한 활동도 **search params**로 전달합니다. 여행지와 활동을 prompt에 포함하여 **PaLM API**에 전송합니다.

  ![image](https://github.com/Valentin1495/AIWanderlust/assets/69514169/82f56a34-c2b8-4266-9859-a442823b4a0b)

- 특정 UI를 만들기 위해, Next.js에서 제공하는 파일들을 사용합니다.

  - `layout.tsx`: 공통 레이아웃
  - `loading.tsx`: 로딩 UI
  - `not-found.tsx`: Not found UI
  - `error.tsx`: Error UI

## Built with

- TypeScript
- React
- Next.js
- Tailwind CSS
- @google-ai/generativelanguage
- google-auth-library
- @react-google-maps/api
- use-places-autocomplete
