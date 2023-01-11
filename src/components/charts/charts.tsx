import style from './charts.module.scss';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';

export default function Charts() {

  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Goal Scorers'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [
      {
        name: 'Goals',
        data: [['Test 1', 1], 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    ]
  }

  const charts = () => (
    <div className={style['charts-card']}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )

  return (
    charts
  )
}