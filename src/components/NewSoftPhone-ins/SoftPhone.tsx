import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';

import type {
  HotlineClientInitConfig,
  HotlineClient,
  AgentContext,
  CallContext,
  HotlineClientEnableState,
  HotlineSocketEventData,
} from './type';

import styles from './index.less';

const { HotlineClientUi } = window as any;

interface SoftPhoneState {
  visible: boolean;
  loading: boolean;
}

export interface SoftPhoneProps {
  config: Pick<HotlineClientInitConfig, 'instanceId' | 'token'>;
  callback: (instance: SoftPhoneInstance) => void;
}

export interface DoCallOutParams {
  calleePhoneNumber: string;
  afterCallHangup: () => void;
}

export interface SoftPhoneInstance {
  doCallOut: (params: DoCallOutParams) => Promise<CallContext>;
}

class SoftPhone extends PureComponent<SoftPhoneProps, SoftPhoneState> {
  static newSoftPhoneInstance: (
    properties: Pick<SoftPhoneProps, 'config'>,
    callback: (instance: SoftPhoneInstance) => void,
  ) => void;

  contanierRef: React.RefObject<HTMLDivElement>;
  clientContext: HotlineClient | undefined;
  agentContext: AgentContext | undefined;
  unRegisters: (() => void) | undefined;
  enableState: HotlineClientEnableState | undefined;
  afterCallHangupCallback: (() => void) | undefined;

  constructor(props: Readonly<SoftPhoneProps>) {
    super(props);
    this.state = { visible: true, loading: true };
    this.contanierRef = React.createRef();
  }

  registerEvents = (clientContext: HotlineClient) => {
    // const unAfterCallHangup = clientContext.on('AfterCallHangup', () => {
    //   console.log('挂断')
    //   this.setState({ visible: false });
    //   this.afterCallHangupCallback?.();
    //   this.afterCallHangupCallback = undefined;
    // });

    const unAgentLeaveChannel = clientContext.on('AgentLeaveChannel', () => {
      console.log('挂断AgentLeaveChannel')
      this.setState({ visible: false });
      this.afterCallHangupCallback?.();
      this.afterCallHangupCallback = undefined;
    });

    const unTokenExpired = clientContext.on('TokenExpired', () => {
      console.log('TokenExpired');
    });

    const unUnHandleEvent = clientContext.on('UnHandleEvent', (event: HotlineSocketEventData) => {
      console.log('UnHandleEvent', event);
    });

    const unEnableStateChange = clientContext.on(
      'EnableStateChange',
      (data: HotlineClientEnableState) => {
        console.log('EnableStateChange', data);

        this.enableState = data;
      },
    );

    const unAgentStatusChange = clientContext.on('AgentStatusChange', (data) => {
      console.log('坐席状态', data);
      this.setState({ loading: false });
      this.props.callback(this.getReturnInstance());
    });

    const unRegisters = [
      // unAfterCallHangup,
      unTokenExpired,
      unUnHandleEvent,
      unEnableStateChange,
      unAgentStatusChange,
      unAgentLeaveChannel,
    ];

    return () => {
      unRegisters.map((item) => item.dispose());
    };
  };

  onClientOnline = (client: HotlineClient) => {
    console.log('client', client);
    this.clientContext = client;
    this.unRegisters = this.registerEvents(client);
  };

  onAgentOnline = (agent: AgentContext) => {
    console.log('agent', agent);
    this.agentContext = agent;
    agent.checkIn();
  };

  doCallOut = ({ calleePhoneNumber, afterCallHangup }: DoCallOutParams): Promise<CallContext> => {
    console.log(11);

    if (!this.enableState?.callDialEnable || !this.agentContext) return Promise.reject();
    this.afterCallHangupCallback = afterCallHangup;
    this.setState({ visible: true });
    return this.agentContext.dial(calleePhoneNumber);
  };

  getReturnInstance = () => ({
    doCallOut: (params: DoCallOutParams) => {
      return this.doCallOut(params);
    },
  });

  componentDidMount() {
    console.log(123);
    const hotlineClientUIProps = {
      /**
       * 初始化 Client 需要的参数。
       */
      config: this.props.config,

      /**
       * 是否支持拖拽。默认为 false。
       */
      draggable: true,

      /**
       * 是否打开检测工具。默认是关闭的。
       */
      openCheckTool: false,
      onClientOnline: this.onClientOnline,

      onAgentOnline: this.onAgentOnline,
    };

    HotlineClientUi.renderClient(this.contanierRef.current, hotlineClientUIProps);
  }

  componentWillUnmount() {
    this.unRegisters?.();
  }

  render() {
    return (
      <Spin
        wrapperClassName={styles.softPhoneWrap}
        className={styles.loading}
        spinning={this.state.loading}
      >
        <div
          style={{ display: this.state.visible ? 'block' : 'none' }}
          ref={this.contanierRef}
        ></div>
      </Spin>
    );
  }
}

SoftPhone.newSoftPhoneInstance = (properties, callback) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  ReactDOM.render(<SoftPhone config={properties.config} callback={callback} />, div);
};

export default SoftPhone;
