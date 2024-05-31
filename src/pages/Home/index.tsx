import { os_info } from '@/services/os';
import Tool from '@/utils/tool';
import { ProCard } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import type { ProgressProps } from 'antd';
import { Card, Col, Progress, Row } from 'antd';
import * as echarts from 'echarts';
import RcResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';

const commonProgress: ProgressProps['strokeColor'] = {
  '0%': '#87d068',
  '60%': '#ffe58f',
  '85%': '#ffccc7',
  '90%': 'red',
};

let total_transmitted = 0;
let total_received = 0;

let AreaData: any = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['上行', '下行'],
    show: false,
  },
  toolbox: {
    feature: {
      //saveAsImage: {},
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [],
      min: 'dataMin',
      max: 'dataMax',
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '上行',
      type: 'line',
      stack: 'Total',
      smooth: true,
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        normal: {
          color: '#FFA500',
        },
      },
      data: [],
    },
    {
      name: '下行',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        normal: {
          color: '#87CEEB',
        },
      },
      data: [],
    },
  ],
};

const tabListNoTitle = [
  {
    key: 'article',
    label: (
      <span>
        <span
          style={{
            padding: '1px 3px',
            background: '#87d068',
            borderRadius: '4px',
          }}
        />
        <span style={{ marginLeft: '5px' }}>流量</span>
      </span>
    ),
  },
  {
    key: 'app',
    label: (
      <span>
        <span
          style={{
            padding: '1px 3px',
            background: '#87d068',
            borderRadius: '4px',
          }}
        />
        <span style={{ marginLeft: '5px' }}>磁盘IO</span>
      </span>
    ),
  },
];

let info = {
  loading: true,
  os: {
    host_name: 'Loading...',
    os_type: 'Loading...',
    kernel_version: 'Loading...',
    long_os_version: 'Loading...',
    architecture: 'Loading...',
    boot_time: 0,
  },
  cpu: {
    len: 0,
    usage: 0,
  },
  memory: {
    total: 0,
    used: 0,
    usage: 0,
  },
  disk: [],
};

const HomePage: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [osInfo, setOsInfo] = useState<any>(null);

  const chartRef = useRef(null);
  let chartInstance: echarts.EChartsType;

  useEffect(() => {
    const fetchData = async () => {
      setOsInfo((await os_info()).data);
      const _ = info.loading ? ((info.loading = false), null) : null;
    };

    fetchData();

    // 设置每秒执行一次的定时器
    const interval = setInterval(() => {
      // 初始化图表

      fetchData();
      chartInstance = echarts.init(chartRef.current);
      chartInstance.setOption(AreaData);
      // const chartInstance = echarts.init(chartRef.current);
      // chartInstance.setOption(AreaData, true);
    }, 3000);

    // 返回一个清理函数，在组件卸载时清除定时器
    return () => {
      clearInterval(interval);

      // myChart.dispose();
    };
  }, []);

  if (osInfo) {
    console.log(osInfo);
    const cpuUsage: number[] = osInfo.cpu as number[];

    // 移除旧数据点，确保数据长度不超过8
    while (AreaData.xAxis[0].data.length > 8) {
      AreaData.xAxis[0].data.shift();
      AreaData.series[0].data.shift();
      AreaData.series[1].data.shift();
    }

    AreaData.xAxis[0].data.push(
      new Date(osInfo.updated_at * 1000).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    );

    AreaData.series[0].data.push(
      total_transmitted === 0
        ? 0
        : Number(
            (parseFloat(
              osInfo.network.reduce(function (
                accumulator: number,
                currentObject: any,
              ) {
                return accumulator + currentObject.total_transmitted;
              },
              0),
            ) -
              total_transmitted) /
              3.3,
          ).toFixed(2),
    );

    AreaData.series[1].data.push(
      total_received === 0
        ? 0
        : Number(
            (parseFloat(
              osInfo.network.reduce(function (
                accumulator: number,
                currentObject: any,
              ) {
                return accumulator + currentObject.total_received;
              },
              0),
            ) -
              total_received) /
              3.3,
          ).toFixed(2),
    );

    total_received = parseFloat(
      osInfo.network.reduce(function (accumulator: number, currentObject: any) {
        return accumulator + currentObject.total_received;
      }, 0),
    );

    total_transmitted = parseFloat(
      osInfo.network.reduce(function (accumulator: number, currentObject: any) {
        return accumulator + currentObject.total_transmitted;
      }, 0),
    );

    AreaData.xAxis[0].min = AreaData.xAxis[0].data[0];
    AreaData.xAxis[0].max = AreaData.xAxis[0].data[7];

    info.cpu = {
      len: cpuUsage.length,
      usage: Number(
        (
          cpuUsage.reduce((acc, curr) => acc + curr, 0) / cpuUsage.length
        ).toFixed(0),
      ),
    };

    info.memory = {
      total: osInfo.memory.total,
      used: osInfo.memory.used,
      usage: Number(
        ((osInfo.memory.used / osInfo.memory.total) * 100).toFixed(0),
      ),
    };

    info.disk = osInfo.disk;
    info.os = osInfo.os;
  }

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 949);
      }}
    >
      <Row gutter={[12, 8]} style={{ marginBottom: 10 }}>
        <Col span={18}>
          <ProCard
            loading={info.loading}
            title={
              <span>
                <span className={styles.card} />
                <span style={{ marginLeft: '5px' }}>
                  <FormattedMessage id="home.state" />
                </span>
              </span>
            }
            split={responsive ? 'horizontal' : 'vertical'}
            headerBordered
          >
            <ProCard split="horizontal">
              <ProCard split="vertical">
                <div
                  style={{
                    display: 'flex',
                    padding: '16px 0',
                    flexWrap: 'wrap',
                  }}
                >
                  <div className={styles.os_info_progress}>
                    <div className={styles.os_info_progress_label_bottom}>
                      <FormattedMessage id="home.state.cpu_use" />
                    </div>
                    <Progress
                      success={{ strokeColor: 'red' }}
                      type="circle"
                      status="active"
                      strokeColor={
                        info.cpu.usage >= 95 ? 'red' : commonProgress
                      }
                      percent={info.cpu.usage}
                    />
                    <div className={styles.os_info_progress_label_top}>
                      {info.cpu.len} <FormattedMessage id="text.cores" />
                    </div>
                  </div>

                  <div className={styles.os_info_progress}>
                    <div className={styles.os_info_progress_label_bottom}>
                      <FormattedMessage id="home.state.memory_use" />
                    </div>
                    <Progress
                      type="circle"
                      status="active"
                      strokeColor={
                        info.cpu.usage >= 95 ? 'red' : commonProgress
                      }
                      percent={info.memory.usage}
                    />
                    <div className={styles.os_info_progress_label_top}>
                      {info.memory.used} / {info.memory.total}(MB)
                    </div>
                  </div>

                  {info.disk.map((item: any, index) => (
                    <div key={index} className={styles.os_info_progress}>
                      <div className={styles.os_info_progress_label_bottom}>
                        {item.mount_point}
                      </div>
                      <Progress
                        type="circle"
                        status="active"
                        strokeColor={commonProgress}
                        percent={Number(
                          (
                            ((item.total - item.available) / item.total) *
                            100
                          ).toFixed(0),
                        )}
                      />
                      <div className={styles.os_info_progress_label_top}>
                        {Number((item.total - item.available) / 1024).toFixed(
                          2,
                        )}
                        G / {Number(item.total / 1024).toFixed(2)}G
                      </div>
                    </div>
                  ))}
                </div>
              </ProCard>
            </ProCard>
          </ProCard>
        </Col>

        <Col span={6}>
          <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
              setResponsive(offset.width < 596);
            }}
          >
            <ProCard
              split={'horizontal'}
              bordered={true}
              headerBordered
              extra={
                <a href="javascript:;">
                  {' '}
                  <FormattedMessage id="text.long_copy" />
                </a>
              }
              title={
                <span>
                  <span className={styles.card} />
                  <span style={{ marginLeft: '5px' }}>
                    <FormattedMessage id="home.OS.info" />
                  </span>
                </span>
              }
              loading={info.loading}
            >
              <div style={{ padding: '18px' }}>
                <div className={styles.os_info_div}>
                  <FormattedMessage id="home.OS.host_name" />
                  <span className={styles.os_info_span}>
                    {info.os.host_name}
                  </span>
                </div>
                <div className={styles.os_info_div}>
                  <FormattedMessage id="home.OS.type" />
                  <span className={styles.os_info_span}>{info.os.os_type}</span>
                </div>
                <div className={styles.os_info_div}>
                  <FormattedMessage id="home.OS.structure" />
                  <span className={styles.os_info_span}>
                    {info.os.architecture}
                  </span>
                </div>
                <div className={styles.os_info_div}>
                  <FormattedMessage id="home.OS.release_version" />
                  <span className={styles.os_info_span}>
                    {info.os.long_os_version}
                  </span>
                </div>
                <div className={styles.os_info_div}>
                  <FormattedMessage id="home.OS.kernel_version" />
                  <span className={styles.os_info_span}>
                    {info.os.kernel_version}
                  </span>
                </div>
                <div className={styles.os_info_div}>
                  <FormattedMessage id="home.OS.boot_time" />
                  <span className={styles.os_info_span}>
                    {new Date(info.os.boot_time * 1000).toLocaleString(
                      'cn-Zh',
                      {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                      },
                    )}{' '}
                    (
                    {Math.floor(
                      (Number(new Date().getTime()) -
                        Number(new Date(info.os.boot_time * 1000))) /
                        (1000 * 60 * 60 * 24),
                    )}
                    <FormattedMessage id="text.days" />)
                  </span>
                </div>
              </div>
            </ProCard>
          </RcResizeObserver>
        </Col>
      </Row>
      <Row gutter={[12, 8]} style={{ marginBottom: 10 }}>
        <Col span={24}>
          <ProCard
            split={'horizontal'}
            bordered={true}
            headerBordered
            title={
              <span>
                <span className={styles.card} />
                <span style={{ marginLeft: '5px' }}>概览</span>
              </span>
            }
            loading={info.loading}
          >
            <Row gutter={[8, 8]} style={{ padding: '12px' }}>
              <Col span={6} className={styles.app}>
                概览1
              </Col>
              <Col span={6} className={styles.app}>
                概览2
              </Col>
              <Col span={6} className={styles.app}>
                概览3
              </Col>
              <Col span={6} className={styles.app}>
                概览4
              </Col>
            </Row>
          </ProCard>
        </Col>
      </Row>

      <Row gutter={[12, 8]} style={{ marginBottom: 10 }}>
        <Col span={12}>
          <ProCard
            split={'horizontal'}
            bordered={true}
            headerBordered
            title={
              <span>
                <span className={styles.card} />
                <span style={{ marginLeft: '5px' }}>应用</span>
              </span>
            }
            loading={info.loading}
          >
            <Row gutter={[8, 8]} style={{ padding: '0 12px 0' }}>
              <p />
              <Col span={6} className={styles.app}>
                应用1
              </Col>
              <Col span={6} className={styles.app}>
                应用2
              </Col>
              <Col span={6} className={styles.app}>
                应用3
              </Col>
              <Col span={6} className={styles.app}>
                应用4
              </Col>
            </Row>
            <Row gutter={[8, 8]} style={{ padding: '0 12px 0' }}>
              <Col span={6} className={styles.app}>
                <span>应用5</span>
              </Col>
              <Col span={6} className={styles.app}>
                应用6
              </Col>
              <Col span={6} className={styles.app}>
                应用7
              </Col>
              <Col span={6} className={styles.app}>
                应用8
              </Col>
            </Row>
            <Row gutter={[8, 8]} style={{ padding: '0 12px 0' }}>
              <Col span={6} className={styles.app}>
                <span>应用9</span>
              </Col>
              <Col span={6} className={styles.app}>
                应用10
              </Col>
              <Col span={6} className={styles.app}>
                应用11
              </Col>
              <Col span={6} className={styles.app}>
                应用12
              </Col>
            </Row>
            <p />
            <p />
          </ProCard>
        </Col>

        <Col span={12}>
          <Card bordered={true} tabList={tabListNoTitle} loading={info.loading}>
            <Row gutter={[8, 8]} style={{ padding: '0 12px 0' }}>
              <Col span={6}>
                <div style={{ textAlign: 'center' }}>
                  <div>
                    {Tool.bytesAuto(
                      AreaData.series[0].data[
                        AreaData.series[0].data.length - 1
                      ] * 1024,
                    )}
                  </div>
                  <div>
                    <span
                      style={{
                        padding: '1px 3px',
                        background: '#FFA500',
                        borderRadius: '50%',
                        width: '10px',
                        height: '10px',
                        display: 'inline-block',
                      }}
                    />
                    <span style={{ marginLeft: '3px' }}>上行</span>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div style={{ textAlign: 'center' }}>
                  <div>
                    {Tool.bytesAuto(
                      AreaData.series[1].data[
                        AreaData.series[1].data.length - 1
                      ] * 1024,
                    )}
                  </div>
                  <div>
                    {' '}
                    <span
                      style={{
                        padding: '1px 3px',
                        background: '#87CEEB',
                        borderRadius: '50%',
                        width: '10px',
                        height: '10px',
                        display: 'inline-block',
                      }}
                    />
                    <span style={{ marginLeft: '3px' }}>下行</span>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div style={{ textAlign: 'center' }}>
                  <div>{Tool.bytesAuto(total_transmitted * 1024)}</div>
                  <div>总发送</div>
                </div>
              </Col>
              <Col span={6}>
                <div style={{ textAlign: 'center' }}>
                  <div>{Tool.bytesAuto(total_received * 1024)}</div>
                  <div>总接收</div>
                </div>
              </Col>
            </Row>
            <div ref={chartRef} style={{ width: '100%', height: '322px' }} />
          </Card>
        </Col>
      </Row>
      {/* <Col span={24}> <MiniCard /> </Col> */}
    </RcResizeObserver>
  );
};
export default HomePage;
