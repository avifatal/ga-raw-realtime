export interface CollectData{
    v: string;
    _v: string;
    a: string;
    t: string;
    _s: string;
    dl: string;
    ul: string;
    de: string;
    sd: string;
    sr: string;
    vp: string;
    je: string;
    _u: string;
    jid: string;
    gjid: string;
    cid: string;
    tid: string;
    _gid: string;
    z: string;
}

export interface AppConfig{
    readonly dataSetName: string,
    readonly collectTableName: string,
    readonly port: number,
    readonly topicName: string,
    readonly queueHandlerName: string
}