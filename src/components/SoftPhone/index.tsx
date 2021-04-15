import { Button } from 'antd';
import { useEffect, useRef } from 'react';

const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZGV2ZWxvcGVyLnJoaW5va2Vlbi5jb20iLCJleHAiOjE2MjAzNTYxMDIsInVzZXJfbmFtZSI6IjE1MDE5NDc3MDMyIiwianRpIjoiMmUxNDk0MjQtNDdhNS00ZTc2LTkzZTgtOWE2YzllY2Y5MGU3IiwiY2xpZW50X2lkIjoiaWRwX3Rlc3RfMTZRNG96Iiwic2NvcGUiOlsiZnV5dW4tZGV2Il19.SF3WkYrj0b_WigZDfub886cZ3kfLSeaGtGs0-RZA1YxzHHaNm-7tg4wjGfiA97SG_f4_Q9AjhOxzbtddWMq5YjBMaW2n-REsasq047t1YXpfnxahSs2tbIjersaiA-bFjVLluqG90uU5OPzIxo9MPISleJCfX_jjsNaPJYaSpZTZ8MbgNZY-RxYoz7Uhb9SrrehmomWxzZ5kvt_KIXtBe3jWIYYwAkJy8EPQZhXXBHCfYwcyRpOPhXQXyYLXeiw8MA0ZNnWKXiVi--zj8V_bb9gJyO77axTmyNs4GPzMpMVybJxSu-XBMsKERIBQ0oW2u_GVzy1t2QQaKBIvx8scuQ';

const { SoftPhone, EnumEventName, EnumLocale, APIs } = window.SoftPhoneSDK;

const config = {
  InstanceId: 'ccc_xp_pre-cn-78v1gnp97002', // 实例id，可在阿里云控制台实例列表获取
  BearerToken: token, // bearerToken，通过【三方账号授权】置换token中的access_token
  env: 'online', // online || preOnline,
  apiHost: 'api.rhinokeen.com', // scsp.aliyuncs.com || aiccs.aliyuncs.com || api.rhinokeen.com
  Version: '', // Pop Api 版本号，默认为'2020-07-02'. scsp.aliyun.com对应版本为'2020-07-02'；aiccs.aliyun.com对应版本为'2019-10-15'；api.rhinekeen.com无需版本
  locale: EnumLocale['zh-CN'],
  isPlugin: true, // 插件是否支持拖拽， 默认支持
  needDesensitize: false, // 是否对入呼/外呼号码脱敏展示, 默认不脱敏
  autoChangeOnLineTime: 1, // 自定义话后处理时间，单位为 s，为 0 代表不需要自动切状态，默认为 1 s自动结束话后处理
  canChangeStatusByHand: true, // 是否能够手动切换状态的能力，默认为true，展示操作栏，支持手动更新
  disableUI: true, // 是否隐藏UI, 默认为 false，不隐藏
};

const softPhone = SoftPhone.getInstance(); // softphone follow Singleton Pattern

export default () => {
  // 分别为 软电话类，支持的事件枚举，多语言枚举，静态 APIs
  const standWrap = useRef();

  useEffect(() => {
    softPhone.setConfig(config);

    softPhone.register(EnumEventName.actionError, () => {
      softPhone.setConfig({
        BearerToken: 'newBearerToken', // token失效后，此处进行事件注册，获取新的token
      });
    });

    softPhone.register(EnumEventName.onCallEstablishForCallout, (arg) => {
      console.log('接通', arg);
      /**
       *
       * const a = {
        type: 'onCallEstablishForCallout',
        prevConfig: {},
        data: {
          acid: '10047951283',
          agentBasicCode: 'AgentBusyForCall',
          agentBasicDesc: '坐席通话忙',
          agentCallCode: 'AgentCallOutBoundEstablish',
          agentCallDesc: '呼出通话中',
          aid: '63001',
          ani: '2000000001271771',
          appName: 'hotlinecs',
          cmd: 'agentStatus',
          connId: '10047951284',
          departmentId: '10',
          dnis: '13884465237',
          eventTime: '2021-04-07 14:57:29.365',
          holdConnId: '',
          jobId: '10047951283',
          mid: '1617778712389',
          name: '萧辰',
          status: 11,
          subSessionId: '',
          supportNewFunction: '0',
          time: '2021-04-07 14:57:29',
          tk: '01360138366c3172000000000000f5f1',
          xspaceHotline: '1',
        },
      };
       */
    });
    softPhone.register(EnumEventName.onCallOutDidHangup, (arg) => {
      softPhone.setConfig({
        disableUI: true,
      });
      console.log('挂断', arg);
      /**
       * const a = {
        type: 'onCallOutDidHangup',
        prevConfig: {},
        data: {
          Class: 'com.rhinokeen.fuyun.openapi.domain.Result',
          Code: null,
          Data: {
            ActionId: 0,
            BuId: 905,
            CalloutId: -1,
            CalloutName: '',
            CaseId: 0,
            ChannelId: '10047874777',
            ChannelType: 1,
            Class: 'com.rhinokeen.fuyun.openapi.domain.CallActionDetail',
            DepId: 10,
            IsTransfer: '0',
            MemberId: -1,
            MemberList: '[]',
            MemberName: '匿名会员',
            ServicerId: 63001,
            ServicerName: '15019477032',
            SubTouchId: 0,
            TaskId: 0,
            TouchId: 19526551,
          },
          Message: null,
          RequestId: '73F5C838-0ACA-483F-B63E-5E6C5214C843',
          Success: true,
        },
      };
       */
    });

    const SoftPhoneUI: React.ElementType<any> = softPhone.getUIComponent();

    APIs.renderComponent(SoftPhoneUI, standWrap.current);
    APIs.agentCheckin(); // 重复签入提示已是上班状态
    return () => {
      APIs.agentCheckout();
    };
  }, [config]);

  const handleCallDialOutSuc = (arg) => {
    // 只有对方接通后才有
    console.log(arg);
    /**
     * acid: "10047872951"
agentBasicCode: "AgentBusyForCall"
agentBasicDesc: "坐席通话忙"
agentCallCode: "AgentCallOutBoundEstablish"
agentCallDesc: "呼出通话中"
aid: "63001"
ani: "2000000001271771"
appName: "hotlinecs"
cmd: "agentStatus"
connId: "10047872952"
departmentId: "10"
dnis: "13884465237"
eventTime: "2021-04-07 11:13:21.278"
holdConnId: ""
jobId: "10047872951"
mid: "1617765264290"
name: "萧辰"
status: 11
subSessionId: ""
supportNewFunction: "0"
time: "2021-04-07 11:13:21"
tk: "00844581134760ce000000000000f5f1"
xspaceHotline: "1"
     */
  };

  const handleClick = () => {
    softPhone.setConfig({
      disableUI: false,
    });
    APIs.doCallOut({
      number: '13884465237', // 要呼叫的号码
      onSuccess: handleCallDialOutSuc, // 外呼成功接通后的回调，参数为通话信息对象
      param: {
        number: '13884465237', // 要呼叫的号码
        memberId: -1, // 必填, 匿名或未知用户可传 -1
        memberName: '匿名会员', // 必填，用户名称，未知可传 '匿名会员'
        // calloutNumber// 选填, 主叫号码，如未填则默认为配置的第一个
        fromSource: 'other_system_out', // 必填, hotlinebs_out || ticket_out || other_system_out (热线||工单||其他系统)
        // taskId: this.props.common.taskId,
        // // 如需查动作记录/服务记录时, channelId || caseId 必传其中之一
        // channelId: this.props.channelId, // 会话id
        // caseId: this.props.common.caseId, // 工单id
      },
    });
  };

  return (
    <>
      <div ref={standWrap} />
      <Button onClick={handleClick}>拨打电话</Button>
    </>
  );
};
