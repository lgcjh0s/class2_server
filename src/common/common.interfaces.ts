interface IToken {
    accessToken: string;
    refreshToken?: string;
}

interface ITopStoreReq {
    method: string;
    nowPage: number;
    rankNo: string;
    gameNo: number;
    drwNo: number;
    schKey: string;
    schVal: string;
}


export {
    IToken,
    ITopStoreReq
}
