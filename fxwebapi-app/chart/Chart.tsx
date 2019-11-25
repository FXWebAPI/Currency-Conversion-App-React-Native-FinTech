import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

interface ChartProps {
  style: {},
  data?: ObjectArray | [],
  chartScript: 'lineGraph' | 'candleChart',
}

interface ChartState {
  html: string | boolean;
}

const chartScripts = {
  lineGraph: (initData: ObjectArray | []) => `
  if (window.chart) {
    chart.clear();
  } else {
    window.chart = new F2.Chart({
      id: 'myChart',
      pixelRatio: window.devicePixelRatio,
      padding: [ 40, 0, 20, 0]
    });
  }
  chart.axis('open', {
    line: null,
    labelOffset: -13,
    tickLine: null,
    grid: null,
    position: 'right',
    label: (text, index, total) => {
      const cfg = {
        textAlign: 'right',
        fill: '#949494',
        fontSize: 11,
        fontFamily: ['Roboto', 'sans-serif']
      };
      if (index === 1) {
        cfg.text = '';
      } else {
        cfg.text = parseFloat(text).toFixed(4);
      }
      return cfg;
    }
  });
  chart.axis('date', false);
  chart.source(${JSON.stringify(initData)}, {
    open: {
      tickCount: 2,
      type: 'linear',
    },
    date: {
      type: 'timeCat',
      mask: 'DD.MM.YYYY | H:mm'
    }
  });
  chart.line({
    startOnZero: false
  }).position('date*open');
  chart.tooltip({
    showTooltipMarker: true,
    showItemMarker: false,
    showTitle: true,
    snap: true,
    titleStyle: {
      fontSize: 14,
      fill: '#2F2F2F',
      fontWeight: 700,
      textAlign: 'left',
      fontFamily: ['Roboto', 'sans-serif']
    },
    valueStyle: {
      fontSize: 10,
      fill: '#949494',
      textAlign: 'center',
      fontFamily: ['Roboto', 'sans-serif']
    },
    background: {
      fill: 'transparent',
    },
    onChange: (ev) => {
      const item = ev.items[0];
      [item.title, item.value] = [item.value, item.title];
    },
  })
  chart.render();
  true;
  `,
  candleChart: (initData: ObjectArray | []) => `
  if (window.chart) {
    chart.clear();
  } else {
    window.chart = new F2.Chart({
      id: 'myChart',
      pixelRatio: window.devicePixelRatio,
      padding: [ 40, 0, 20, 0]
    });
  }
  chart.axis('range', {
    line: null,
    labelOffset: -13,
    tickLine: null,
    grid: null,
    position: 'right',
    label: (text, index, total) => {
      const cfg = {
        textAlign: 'right',
        fill: '#949494',
        fontSize: 11,
        fontFamily: ['Roboto', 'sans-serif']
      };
      if (index === 1) {
        cfg.text = '';
      } else {
        cfg.text = parseFloat(text).toFixed(4);
      }
      return cfg;
    }
  });
  chart.axis('date', false);
  chart.source(${JSON.stringify(initData)}, {
    range: {
      tickCount: 2,
      type: 'linear',
    },
    date: {
      type: 'timeCat',
      mask: 'DD.MM.YYYY | H:mm'
    }
  });
  chart.schema()
    .position('date*range')
    .color('trend', function(trend) {
      return [ '#FFBB93', '#A7C6FD' ][trend];
    })
    .shape('candle');
  chart.tooltip({
    showTooltipMarker: true,
    showItemMarker: false,
    showTitle: true,
    snap: true,
    showCrosshairs: true,
    titleStyle: {
      fontSize: 14,
      fill: '#2F2F2F',
      fontWeight: 700,
      textAlign: 'left',
      fontFamily: ['Roboto', 'sans-serif']
    },
    valueStyle: {
      fontSize: 10,
      fill: '#949494',
      textAlign: 'center',
      fontFamily: ['Roboto', 'sans-serif']
    },
    background: {
      fill: 'transparent',
    },
    onChange: (ev) => {
      const item = ev.items[0];
      [item.title, item.value] = [item.origin.open, item.title];
    },
  })
  chart.render();
  true;
  `,
}

export default class Chart extends React.Component<ChartProps, ChartState> {

  constructor(props: ChartProps) {
    super(props);

    this.state = {
      html: ''
    }
  }

  webref = null;

  componentDidMount() {
    let HTMLFile = Asset.fromModule(require('./index.html'));
    if (!HTMLFile.localUri) {
      Asset.loadAsync(require('./index.html')).then(() => {
        HTMLFile = Asset.fromModule(require('./index.html'));
        this.setState({ html: HTMLFile.localUri });
      })
    }
    else {
      this.setState({ html: HTMLFile.localUri });
    }
  }

  changeData = (data: ObjectArray) => `chart.changeData(${JSON.stringify(data)});`

  update = (data: ObjectArray) => {
    if (this.webref) {
      this.webref.injectJavaScript(this.changeData(data));
    }
  }

  updateType = (type: ChartProps['chartScript'], data: ObjectArray) => {
    if (this.webref) {
      this.webref.injectJavaScript(chartScripts[type](data));
    }
  }

  shouldComponentUpdate(nextProps : ChartProps, nextState) {
    if (nextProps.chartScript !== this.props.chartScript) {
      this.updateType(nextProps.chartScript, nextProps.data);
    }
    else this.update(nextProps.data);
    if (nextState.html !== '' && this.state.html === '') return true;
    return false;
  }

  render() {
    const { html } = this.state;
    let { chartScript, data } = this.props;
    if (!data) data = [];
    return (
      <WebView
        ref={r => (this.webref = r)}
        source={
          Platform.OS === 'android' ?
            { uri: html } : require('./index.html')}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        injectedJavaScript={chartScripts[chartScript](data)}
        style={this.props.style}
      />
    );
  }
};