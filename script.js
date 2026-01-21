document.addEventListener('DOMContentLoaded', () => {
  function createStudentCard(student) {
    return `
      <div class="card">

       <div class="label">
          <div class="attendance_label">${student.status}</div>
        </div>

        <div class="text_wrap">
          <p class="card_title">${student.id}</p>
          <ul class="info_wrap">
            <li class="info_item">
              <span class="info_label">이름:</span>
              <span class="info_value">${student.name}</span>
            </li>
            <li class="info_item">
              <span class="info_label">클래스:</span>
              <span class="info_value">${student.className}</span>
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  // 전체 학생 데이터 렌더링
  let allStudentData = document.querySelector('.card_list');

  //카드리스트 초기화
  function renderCard(list) {
    allStudentData.innerHTML = '';


    list.forEach(student => {
      //만든 데이터 함수를 변수로 지정하기
      let cardHTML = createStudentCard(student);
      allStudentData.insertAdjacentHTML('beforeend', cardHTML);
    });
    labelColorCheange();
  }

  // 라벨명에 따라 컬러 체인지
  function labelColorCheange() {
    let statusMap = {
      '출석': 'attendance',
      '지각': 'perception',
      '결석': 'absence'
    }
    let statusLabels = document.querySelectorAll('.attendance_label');

    /* 출석상태별 컬러 */
    statusLabels.forEach(label => {
      let statusText = label.textContent.trim();
      let className = statusMap[statusText];

      if (className) {
        label.classList.add(className);
      }
    });
  }
  renderCard(serverStudents);

  //총 인원
  let totalNumber = document.querySelector('.filter_count .count');
  console.log(totalNumber);

  updateCount(serverStudents);


  //총 인원 업데이트
  function updateCount(list) {
    totalNumber.textContent = list.length;
  }

  //탭 클릭 이벤트
  let tabitems = document.querySelectorAll('.tab_item');

  tabitems.forEach(tab => {
    tab.addEventListener('click', () => {
      //active초기화
      tabitems.forEach(item => item.classList.remove('active'));
      tab.classList.add('active');

      //클릭한 탭의 텍스트 가져오기
      let tabText = tab.textContent.trim();

      //데이터필터링
      if (tabText === '전체') {
        renderCard(serverStudents);
        updateCount(serverStudents);
      } else {
        let fillteredList = serverStudents.filter(student => {
          return student.status === tabText;
        });
        renderCard(fillteredList);
        updateCount(fillteredList);
      }
    });
  });
});