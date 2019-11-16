import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

interface ChartProps {
  style: {},
  data?: ObjectArray
}

interface ChartState {
  html: string | boolean;
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

  shouldComponentUpdate(nextProps, nextState) {
    this.update(nextProps.data);
    if (nextState.html !== '' && this.state.html === '') return true;
    return false;
  }

  render() {
    const { html } = this.state;
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
        injectedJavaScript={`
        window.chart = new F2.Chart({
          id: 'myChart', // pass node's id
          width: 375,
          height: 260,
          pixelRatio: window.devicePixelRatio
        });
        const data = [ 
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ];
        
        chart.source(data); // load the data
        chart.interval().position('genre*sold').color('genre');
        chart.render();
        true;
        `}
        style={this.props.style}
      />
    );
  }
};