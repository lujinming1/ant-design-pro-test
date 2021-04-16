/**
 * 提供 {@link HotlineClient} 初始化参数的描述。
 */
export interface HotlineClientInitConfig {
  instanceId: string; // 实例 id
  token: string; // token
  apiHost: string;
  apiVersion: string;
  wsHost: string;
}

/**
 * HotlineClientUIProps 定义。
 */
export type HotlineClientUIProps = {
  /**
   * 初始化 Client 需要的参数。
   */
  config?: Pick<HotlineClientInitConfig, 'instanceId' | 'token'>;

  /**
   * 是否支持拖拽。默认为 false。
   */
  draggable?: boolean;

  /**
   * 是否打开检测工具。默认是关闭的。
   */
  openCheckTool?: boolean;

  onClientOnline?: (client: HotlineClient) => void;

  onAgentOnline?: (agent: AgentContext) => void;

  onCallContextChange?: (callContext: CallContext) => void;
};

export interface HotlineClient {
  /**
   * 获取此热线客户端的上下文对象。
   */
  readonly context: HotlineClientContext;
  /**
   * 注册事件监听
   */
  on: (eventName: string, cb: (eventData: HotlineSocketEventData) => void) => Canceler;

  // emit: (e: any,...t: any)=>{this._emitter.emit(e,...t)}
  // off: (e,t)=>{this._emitter.off(e,t)}
  // once: (e,t)=>{this._emitter.once(e,t)}
}

/**
 * 表示热线 client 的上下文对象
 */
export interface HotlineClientContext {
  /**
   * 获取此 client 上的配置信息。
   */
  readonly config: HotlineClientInitConfig;

  /**
   * 获取此 client 上的热线服务。
   */
  // readonly hotlineService: HotlineService;

  // hotlineService: FuYunHotlineService {}
  // trackerService: XTrackerService {}
}

/**
 * 表示通话方身份
 */

export interface CallerIdentity {
  phoneNumber: string;
  aid: string; // 在线id
}

/**
 * 表示通话方向的枚举，如呼入或呼出。
 */
export enum CallDirection {
  /**
   * 表示呼入。
   */
  Incoming,

  /**
   * 表示呼出。
   */
  Outgoing,
}

/**
 * 表示通话身份的结构体。
 */
export interface CallIdentity {
  /**
   * 获取此通话的 acId。
   */
  readonly acId: string;

  /**
   * 获取此通话的连接 Id。
   */
  readonly connId: string;

  /**
   * 获取此通话被保持时的连接 Id。
   */
  readonly holdConnId?: string;

  /**
   * 获取此通话的 jobId。
   */
  readonly jobId: string;
}

/**
 * 表示通话上下文的结构体。
 */
export interface CallContext {
  /**
   * 获取此通话的标识信息。
   */
  readonly identity: CallIdentity;

  /**
   * 获取此通话的方向。
   */
  readonly callDirection: CallDirection;

  /**
   * 获取此通话的呼叫方身份。
   */
  readonly caller: CallerIdentity;

  /**
   * 获取此通话的被呼叫方身份。
   */
  readonly callee: CallerIdentity;

  /**
   * 挂断此通话。
   */
  hangUp: () => Promise<unknown>;

  /**
   * 转接此通话。
   * @param identifier 转接需要的标识符。
   *
   * 根据 DeflectionIdentifier 的 deflectionType 来确认是否需要返回一个可取回的通话。
   */
  deflect: (identifier: DeflectionIdentifier) => void;

  /**
   * 保持此通话。
   */
  hold: () => Promise<unknown>;

  /**
   * 表示取回此通话。
   */
  retrieve: () => Promise<unknown>;
}

/**
 * 表示坐席的接口定义。
 */
export interface AgentContext {
  /**
   * 坐席发起签入。
   */
  checkIn: () => Promise<unknown>;

  /**
   * 坐席发起签出。
   */
  checkOut: () => Promise<unknown>;

  /**
   * 坐席发起小休。
   */
  doRest: () => Promise<unknown>;

  /**
   * 坐席切到在线。
   */
  checkReady: () => Promise<unknown>;

  /**
   * 坐席发起拨号。
   * @param calleePhoneNumber 被叫号码。
   * @param callerPhoneNumber 主叫号码。
   */
  dial: (calleePhoneNumber: string, callerPhoneNumber?: string) => Promise<CallContext>;

  /**
   * 坐席接电话。
   * @param params 接电话需要的身份信息。
   */
  answer: (params?: CallIdentity) => Promise<unknown>;
}

/**
 * 热线 socket 消息体
 */
export interface HotlineSocketEventData {
  eventName: string;
  buId?: number;
  departmentId?: number;
  enumIconType?: string;
  enumSceneType?: string;
  gmtCreate?: number;
  head: HotlineSocketHeadData;
  isPersistent?: boolean;
  sceneType?: string;
  senderId?: number;
  senderType?: string;
  userId?: number;
  uuid?: string;
  content: string;
}

export interface HotlineSocketHeadData {
  // agentBasicCode?: AgentBasicCode;
  agentBasicDesc?: string;
  // agentCallCode?: AgentCallCode;
  agentCallDesc?: string;
  aid?: string;
  appName?: string;
  cmd?: string;
  departmentId?: string;
  mid?: string;
  name?: string;
  supportNewFunction?: string;
  time?: string;
  tk?: string;
  xspaceHotline?: string;
  jobId?: string;
  connId?: string;
  holdConnId?: string;
  acid?: string;
  dnis?: string;
  ani?: string;
}

/**
 * 监听消息返回值
 */
export interface Canceler {
  dispose: () => void; // 注销
}


export interface DailParams {
  calleePhoneNumber: string;
  AfterCallDial?: () => void; // 电话拨号成功后触发。
  AfterCallHangup?: () => void; // 电话挂断成功后触发。
}

/**
 * API导出
 */
export interface SoftPhoneApi {
  dail: (params: DailParams) => Promise<CallContext>;
}
