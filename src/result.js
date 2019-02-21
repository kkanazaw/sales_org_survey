import $ from 'jquery';

$(document).ready(() => {
  //buildテスト用
  const debug = "debug";
  //ここまで
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

  const createHoraizontalLineDataSets = (labels, scores) => {
    const ret = [];
    for(let i = 0; i < labels.length; i++) {
      console.log(labels[i], scores[i]);
      const o = {x: scores[i], y: labels[i]};
      ret.push(o);
    }
    return ret;
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
        backgroundColor: 'rgba(211, 233, 197, 0.7)'
      },
      {
        label: 'マネージャーの平均スコア',
        data: createHoraizontalLineDataSets(labels, managerMeanScore),
        type: 'line',
        fill: false,
        pointStyle: 'triangle',
        backgroundColor: 'rgba(255, 140, 0, 1)',
        borderWidth: 0,
        borderColor: 'rgba(255, 140, 0, 0.7)',
        pointRadius: 8,
        lineTension: 0
      },
      {
        label: 'メンバーの平均スコア',
        data: createHoraizontalLineDataSets(labels, memberMeanScore),
        type: 'line',
        fill: false,
        backgroundColor: 'rgba(128, 0, 0, 1)',
        borderWidth: 0,
        borderColor: 'rgba(128, 0, 0, 0.7)',
        pointRadius: 8,
        lineTension: 0
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0
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
