import React, { useEffect, useState } from 'react';
import { Header } from './../Navigation/Header';

import { DateTime } from 'luxon';

import PieChart, {
    Legend,
    Series,
    Tooltip,
    Format,
    Label,
    Connector,
    Size,
} from 'devextreme-react/pie-chart';
import ProjectGateway from '../../Gateway/ProjectGateway';
import ReactApexChart from 'react-apexcharts';


export const Statistics = () => {
    const buttonStyle = " mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

    var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    const day = 1;
    const week = 7;
    const month = 31;

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function calcCircleDiagram(groupedStat, dateRange, arr, pattle) {
        Object.keys(groupedStat).map(function (key, index) {
            var timeSpent = 0;
            groupedStat[key].map(x => {
                pattle.push(x.projectColor);
                x.tasksTrack.map(tt => {
                    var date = tt.endDate ? DateTime.fromISO(tt.endDate) : DateTime.fromISO(tt.startDate);
                    var diffInDays = DateTime.now().diff(date, "day").toObject();
                    if (diffInDays.days <= dateRange) {
                        timeSpent += tt.timeSpentMinutes
                    }
                })
            })
            if ((timeSpent / 60).toFixed(2) > 0) {
                arr.push({
                    project: key,
                    timeSpent: (timeSpent / 60).toFixed(2),
                    color: groupedStat[key]
                })
            }
        });
        return [arr, pattle]
    }

    function drawCircleDiagram(data, dateRange) {
        var arr = [];
        var pattle = [];
        var res = calcCircleDiagram(data, dateRange, arr, pattle);
        arr = res[0];
        pattle = res[1];

        setProjectStat(arr);
        pattle = pattle.filter(onlyUnique);
        setPattle(pattle);
    }

    const [ProjectStat, setProjectStat] = useState([]);
    const [Statistic, setStatistic] = useState([]);
    const [groupedData, setGroupedData] = useState([]);
    const [pattle, setPattle] = useState([]);
    const [timeline, setTimeLine] = useState({
        series: [],
        options: {
            chart: {
                height: 350,
                type: 'rangeBar',
                width: "50%",
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '50%',
                    rangeBarGroupRows: true
                }
            },
            colors: [
                "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
                "#3F51B5", "#546E7A", "#D4526E", "#8D5B4C", "#F86624",
                "#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"
            ],
            fill: {
                type: 'solid'
            },
            xaxis: {
                type: 'datetime'
            },
            legend: {
                position: 'right'
            },
        },
    });

    useEffect(() => {
        ProjectGateway.GetTasksStatic().then(response => {
            var stat = response.data;
            setStatistic(response.data);

            var groupedStat = groupBy(stat, 'projectTitle')
            console.log(groupedStat);
            setGroupedData(groupedStat);

            drawCircleDiagram(groupedStat, 7);

            var timelineArr = [];
            Object.keys(groupedStat).map(function (key, index) {
                var temp = [];
                groupedStat[key].map(x => {
                    x.tasksTrack.map(tt => {
                        var date = tt.endDate ? DateTime.fromISO(tt.endDate) : DateTime.fromISO(tt.startDate);
                        var diffInDays = DateTime.now().diff(date, "day").toObject();
                        if (diffInDays.days <= 7) {
                            temp.push(
                                {
                                    x: x.taskTitle,
                                    y: [
                                        DateTime.fromISO(tt.startDate).toJSDate().getTime(),
                                        DateTime.fromISO(tt.endDate).toJSDate().getTime()
                                    ],
                                }
                            )
                        }
                    })
                })
                if (temp.length) {
                    timelineArr.push({
                        name: key,
                        data: temp
                    });
                }

            });

            setTimeLine({
                series: timelineArr,
                options: {
                    chart: {
                        height: 350,
                        type: 'rangeBar',
                        width: "50%",
                    },
                    plotOptions: {
                        width: '30%',
                        bar: {
                            horizontal: true,
                            barHeight: '50%',
                            rangeBarGroupRows: true
                        }
                    },
                    colors: [
                        "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
                        "#3F51B5", "#546E7A", "#D4526E", "#8D5B4C", "#F86624",
                        "#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"
                    ],
                    fill: {
                        type: 'solid'
                    },
                    xaxis: {
                        type: 'datetime',
                    },
                    yaxis: {
                        labels: {
                            maxWidth: 350
                        }
                    },
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        custom: function (opts) {

                            const fromYear = new Date(opts.y1)
                            const toYear = new Date(opts.y2).getTime()
                            const values = opts.ctx.rangeBar.getTooltipValues(opts)
                            return (
                                ''
                            )
                        }
                    }
                },
            });
        })
    }, [])

    // ----------- Circle graphic
    const customizeTooltip = (arg) => {
        return {
            text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
        }
    }

    const customizeLabel = (e) => {
        return `${e.argumentText}\n${e.valueText}h`;
    }

    const CenterTemplate = (pieChart) => {
        return (
            <svg>
                <circle cx="100" cy="100" r={pieChart.getInnerRadius() - 6} fill="#eee"></circle>
                <text textAnchor="middle" x="100" y="120" style={{ fontSize: 35, fill: '#494949' }}>
                    <tspan className='flex justify-center items-center' style={{ fontWeight: 600 }}>{
                        calculateTotal(pieChart)
                    }h</tspan>
                </text>
            </svg>
        );
    }

    const formatNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
    }).format;

    function calculateTotal(pieChart) {
        return formatNumber(pieChart
            .getAllSeries()[0]
            .getVisiblePoints()
            .reduce((s, p) => s + p.originalValue, 0));
    }

    // -------------------------

    return (
        <div>
            <Header></Header>
            <div className='flex justify-center flex-col' style={{ width: "100%" }}>
                <div className='flex justify-center' >
                    <div className='flex flex-col justify-center' style={{ width: "50%" }}>
                        <PieChart
                            id="pie"
                            type="doughnut"
                            resolveLabelOverlapping="shift"
                            title="The Population of Continents and Regions"
                            palette={pattle.length ? pattle : ["green"]}
                            dataSource={ProjectStat}
                            centerRender={CenterTemplate}
                            innerRadius={0.65}

                        >
                            <Series argumentField="project" valueField="timeSpent">
                                <Label visible={true} format="decimal" customizeText={customizeLabel}>
                                    <Connector visible={true} />
                                </Label>
                            </Series>
                            <Legend
                                margin={0}
                                horizontalAlignment="right"
                                verticalAlignment="top"
                            />
                            <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                                <Format />
                            </Tooltip>
                        </PieChart>
                        <div className='flex justify-center pr-40 mt-10'>
                            <button className={buttonStyle} onClick={() => drawCircleDiagram(groupedData, day)}>Сьогодні</button>
                            <button className={buttonStyle} onClick={() => drawCircleDiagram(groupedData, week)}>Тиждень</button>
                            <button className={buttonStyle} onClick={() => drawCircleDiagram(groupedData, month)}>Місяць</button>
                        </div>
                    </div>
                </div>
                <ReactApexChart options={timeline.options} series={timeline.series} type="rangeBar" height={350} />
            </div>
        </div>
    );
}