const menuBtn = document.querySelector('.menu_btn');
const dark = document.querySelector('.dark');
const sideMenu = document.querySelector('.side_menu');
const closeBtn = document.querySelector('.close_btn');

const sideMenus = document.querySelectorAll('.side_menu .menu > li');
const subMenus = document.querySelectorAll('.sub_menu');

const langBtn = document.querySelector('.langlist li:first-child a');
const langList = document.querySelector('.langlist');

const topBtn = document.querySelector('.top_btn a');

const aTags = document.querySelectorAll('a');

aTags.forEach(function(item){		// 모든 a태그 기능 초기화
	item.onclick = function(e) {
		e.preventDefault();
	}
})

// sideMenu

function show(){
	sideMenu.style.right = '0px';
	dark.style.display = 'block';	
}
function hide() {
	sideMenu.style.right = '-266px';
	dark.style.display = 'none';	
}
menuBtn.onclick = show;	// menuBtn 누르면 화면이 까매지면서 sideMenu 나타남
closeBtn.onclick = hide;	// closeBtn 누르면 화면이 원래대로 돌아오면서 sideMenu 들어감
dark.onclick = hide;	// dark 누르면 화면이 원래대로 돌아오면서 sideMenu 들어감

let num = 1; 	// 초기 순서 지정
sideMenus.forEach(function(item,order) {
	item.onclick = function() {		// sideMenu의 li를 누르면 subMenu가 나타남
		if (order !== 0 && order !== 4) {		// 1,5번째는 효과를 추가하지 않음
			let subMenu = this.querySelector('.sub_menu');
			let maxHeight = this.querySelector('.secondChildren').getBoundingClientRect().height;
			subMenus[num-1].style.cssText = `max-height : 0px`;		// 이전에 누른 subMenu의 설정 초기화
			subMenu.style.cssText = `max-height : ${maxHeight}px`;
			num = order;
		}		
	}
})

document.onclick = function(e) {		// langBtn을 누르면 나타나고 나타난 상태에서 다른 곳을 클릭하면 사라짐
	if (e.target === langBtn ) {
		langList.classList.add('active');
		langBtn.style.display = 'none';
	}
	else {
		langBtn.style.display = 'block';
		langList.classList.remove('active');
	}
}

// topBtn

window.onscroll = function() {		// 화면이 아래로 내려가면 topBtn이 나타남
	let y = window.scrollY;
	if (y>47) {
		topBtn.style.display = 'block';
	}
	else {
		topBtn.style.display = 'none';
	}
}
topBtn.onclick = function() {
	document.body.scrollIntoView();		// 문서의 최상단으로 이동
}


