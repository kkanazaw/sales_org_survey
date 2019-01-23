import $ from 'jquery';

$(document).ready(() => {
  const calcScore = () => {
    const scores = Array(11).fill(0);
    scores[10] = 5;
    for(let i = 1; i <= 3; i++) {
      const session = JSON.parse(sessionStorage.getItem(`questionAnswer${i}`));
      for(const classId of Object.keys(session)) {
        const val = session[classId];
        scores[classId] = (val.score / val.questionNum).toFixed(2);
      }
    }
    return scores;
  };

  const labels = [
    "業績マネージメント",
    "プロセスマネージメント",
    "クライアントマネージメント",
    "メンバーマネージメント",
    "組織の場・風土・コミュニケーション",
    "営業効率化支援ツール",
    "顧客フォロー・販売支援ツール",
    "業務フロー支援ツール",
    "営業サポート体制"
  ];

  //必要な値の計算など
  const selectedPosition = sessionStorage.getItem('position');
  const isManager = selectedPosition === 'manager';
  const userScore = calcScore();
  const managerMeanScore = [3.79, 3.72, 3.67, 3.45, 3.62, 3.29, 3.12, 2.74, 3.20];
  const memberMeanScore = [3.78, 3.63, 3.71, 3.32, 3.62, 3.40, 3.20, 2.94, 3.07];
  const meanScore = isManager ? managerMeanScore : memberMeanScore;
  const gap = [];
  for(let i = 0; i < meanScore.length; i++) {
    gap[i] = (userScore[i] - meanScore[i]).toFixed(2);
  }

  $('.user-postion').text(isManager ? 'マネージャー' : 'メンバー');
  const $gapEl = $('#gap');
  for(const d of gap) {
    $gapEl.append(`<li>${d}</li>`);
  }

  //グラフの描画
  const ctx = document.getElementById('ex_chart');

  const data = {
    labels,
    datasets: [
      {
        label: 'あなたのスコア',
        data: userScore,
        backgroundColor: 'rgba(211, 233, 197, 1)'
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          min: 300
        }
      }]
    }
  };

  const ex_chart = new Chart(ctx, {
    type: 'horizontalBar',
    data: data,
    options: options
  });

});
