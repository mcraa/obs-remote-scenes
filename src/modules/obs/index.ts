import OBSWebSocket from "obs-websocket-js";
import type { OBSRequestTypes, OBSResponseTypes } from "obs-websocket-js/dist/types";

const obsWsJs = new OBSWebSocket();

export class Obs extends OBSWebSocket {
    constructor(private ws: OBSWebSocket) {
        super()
    }

    connect(url?: string | undefined, password?: string | undefined, identificationParams?: { eventSubscriptions?: number | undefined; rpcVersion?: number | undefined; } | undefined): Promise<{ obsWebSocketVersion: string; rpcVersion: number; authentication?: { challenge: string; salt: string; } | undefined; negotiatedRpcVersion: number; }> {
        return this.ws.connect(url, password, identificationParams)
    }

    disconnect(): Promise<void> {
        return this.ws.disconnect()
    }

    call<Type extends keyof OBSRequestTypes>(requestType: Type, requestData?: OBSRequestTypes[Type] | undefined): Promise<OBSResponseTypes[Type]> {
        return this.ws.call(requestType, requestData)
    }
}

export default new Obs(obsWsJs);