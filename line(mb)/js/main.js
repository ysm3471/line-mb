const focusBar = document.querySelector(".focus_page");
const headerMenus = document.querySelector(".top_list");
const headerMenu = document.querySelectorAll(".top_list a");

const sections = document.querySelectorAll("section");
const langBtn = document.querySelector(".top_lang");
const langList = document.querySelector(".top_langlist");
const langIndex = document.querySelector('.top_langlist a');

const navBtns = document.querySelectorAll("#section4 .nav button");
const servList = document.querySelectorAll("#section4 .service_list > li");


// 탑메뉴를 누르면 특정 섹션으로 화면 이동

headerMenu.forEach(function(item,order){
	item.onclick = function(e) {
		e.preventDefault(); 	// a태그 기능 초기화
		if (order === 2 ){	// 3번째 섹션은 무시
			order++;
		}
		sections[order].scrollIntoView({behavior : "smooth", block:'start'}); // 특정 엘리먼트로 화면을 이동하는 메소드
	}
})

// 화면에 따라 탑메뉴의 포커싱 위치가 바뀜
let order = 0;
let barWidth = headerMenu[0].getBoundingClientRect().width;
barLeft = headerMenu[0].offsetLeft;
focusBar.style = `		
width : ${barWidth}px;
left : ${barLeft}px;
`;	 // 초기 위치 지정(모바일 환경에 따라서 left 위치가 바뀜)

window.onscroll = function() {
	let y = window.scrollY;	// 화면의 y축 높이
	switch (true) { 	//범위 사용 시에는 true 사용
		case (y < sections[1].offsetTop - 56 ) : 		// main_gnb 높이만큼 빼줌
			barWidth = headerMenu[0].getBoundingClientRect().width;
			barLeft = headerMenu[0].offsetLeft;
			focusBar.style = `
				width : ${barWidth}px;
				left : ${barLeft}px;
			`;
			if (order !== 0) {	// 보고있는 페이지의 위치가 바뀔 때만 작동
				headerMenu[0].classList.add('on');
				headerMenu[order].classList.remove('on');
				order=0;				
			}
			break;
		case (sections[1].offsetTop - 56 <= y && y < sections[3].offsetTop) :
			barWidth = headerMenu[1].getBoundingClientRect().width;
			barLeft = headerMenu[1].offsetLeft;
			focusBar.style = `
				width : ${barWidth}px;
				left : ${barLeft}px;
			`;
			if (order !== 1) {
				headerMenu[1].classList.add('on');
				headerMenu[order].classList.remove('on');
				order=1;				
			}
			break;
		case (y>=sections[3].offsetTop) :
			barWidth = headerMenu[2].getBoundingClientRect().width;
			barLeft = headerMenu[2].offsetLeft;
			focusBar.style = `
				width : ${barWidth}px;
				left : ${barLeft}px;
			`;
			if (order !== 2) {
				headerMenu[2].classList.add('on');
				headerMenu[order].classList.remove('on');
				order=2;				
			}
			break;
	}
}

// langBtn toggle기능

document.onclick = function(e) {	// langBtn을 누르면 langList가 보이고, 그 상태에서 문서 내 어디든 클릭하면 langList를 숨기는 함수
	let searchParent = e.target;	// 부모요소를 조사하기 위해 클릭 이벤트의 값 할당
	while (searchParent !== this) {		// 클릭이벤트가 document가 아니라면 반복문 재생
		if (langList.classList.contains('active')) {	// 이미 langList가 활성화 중이라면 함수 발생
			if (searchParent.parentNode.parentNode === langList) {	// 만약 누른게 langList 안의 a태그라면 반복문 탈출
				break;
			}
			else {		// 아니라면 langList를 숨기고 반복문 종료
			langList.style.display = 'none';
			langList.classList.remove('active');
			break;				
			}
		}
		else if (searchParent === langBtn) { 	// 부모요소가 langBtn이라면 langList를 보이게 하고 반복문 종료
			langList.classList.add('active');
			langList.style.display = 'block';
			break;
		}
		searchParent = searchParent.parentNode;	// 한단계 위의 부모요소를 조사. searchParent가 document 혹은 langBtn이 될 때까지 반복함
	}
}

Array.from(langList.children).forEach(function(item){ // 유사배열을 forEach문을 사용하기 위해서 배열 형태로 변환
	item.onclick = function(e) {
		e.preventDefault(); // langlist의 a태그들 기능 초기화
	}
})

// section4의 nav 버튼을 누르면 카테고리 별로 정렬

let num = 0;
navBtns.forEach(function(item,order) {
	item.onclick = function() {		// nav의 버튼을 누르면 색깔이 바뀜
		navBtns[num].classList.remove('active');		
		this.classList.add('active');
		num = order;
		
		switch(order) {	// nav의 버튼을 누르면 카테고리별로 정렬
			case 0:
				servList.forEach(function(item,order) {
					item.style.display = 'block';
				})
				break;
			case 1:
				servList.forEach(function(item,order) {
					if (order < 3) {
						item.style.display = 'block';
					}
					else {
						item.style.display = 'none';
					}
				})
				break;
			case 2:
				servList.forEach(function(item,order) {
					if (order >= 3 && order < 10) {
						item.style.display = 'block';
					}
					else {
						item.style.display = 'none';
					}
				})
				break;
			case 3:
				servList.forEach(function(item,order) {
					if (order >= 10 && order < 12) {
						item.style.display = 'block';
					}
					else {
						item.style.display = 'none';
					}
				})
				break;
		}		

		sections[3].scrollIntoView(); // 버튼을 누르면 section4로 화면이 이동
	}
})

