# CoinTracker

## :raised_hands: 프로젝트 소개
* 비트코인 정보를 가져오는 api를 이용하여 실시간 비트코인 정보를 확인 할 수 있습니다.
* 다크모드, 라이트모드를 설정 할 수 있습니다.
* 원하는 티커를 검색해서 정보를 확인 할 수 있습니다.

## :clipboard: 기술스택
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/typescript-3A74C0?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/react_router-C03F41?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/react_query-F03E50?style=for-the-badge&logo=reactquery&logoColor=white"> <li>react-helmet-async</li> <li>recoil</li> <li>react-apexcharts</li>

## :paperclip: 배포 주소
https://spearjin-coin.netlify.app

## :pencil2: 구현
  * 반응형 웹 구현(1020px, 770px, 680px)
  * 비트코인 API 가져오기
    * 구현 방법
     * react-query 라이브러리를 이용하여 api를 가져 왔습니다
     * react-query을 이용함으로써 매번 api를 불러오는게 아니라, react-query 자체 캐시에 저장 함으로써 캐시에서 정보를 불로오도록 하였습니다.
     * 전체 코인의 api값들은 너무 많아서 slice메소드를 이용하여 100개의 정보만 불러 왔습니다.
  * Dark & Light 모드
    * 구현 방법
     * Dark 모드의 색, Light 모드의 색을 theme.ts파일에 따로 설정 하였습니다.
     * checkbox를 만들어 checked에 따라 모드가 바뀌도록 구현 하였습니다.
     * rcoil에 atoms을 이용하여 상태 값을 바뀌게 하여 Dark & Light 모드를 구현 하였습니다.
  * 차트 구현하기
    * 구현 방법
     * apex-chart 라이브러리를 이용하여 "candlestick" 차트를 구현 하였습니다.
  * 티커 검색
    * 구현 방법
     * 티커 검색창에 onInput 이벤트를 일으켜 코인 리스트의 값들을 조건에 맞게 값들이 설정되도록 하였습니다.
     * toLocaleLowerCase 메소드를 사용하여 대/소문자 구별 없이 검색 되로록 하였습니다.
  * 구현 영상
    * ![coin_tracker](https://user-images.githubusercontent.com/87363129/158095978-519b665f-56b5-40c4-a9a5-06de9adcf082.gif)
