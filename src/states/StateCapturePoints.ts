import { CapturePoint } from "../models/capturePoint"
import { Schema, MapSchema, type } from "@colyseus/schema";

export class StateCapturePoints extends Schema implements IStateCapturePoints {
    @type({ map: CapturePoint })
    capturePoints: MapSchema<CapturePoint> = new MapSchema<CapturePoint>()
    
    addCapturePoint(capturePoint: CapturePoint): void {
        this.capturePoints[capturePoint.id] = capturePoint
        console.log('added capture point')
    }
    removeCapturePoint(capturePointId: string): void {
        delete this.capturePoints[capturePointId]
        console.log('removed capture point')
    }
}

export interface IStateCapturePoints extends Schema {
    capturePoints: MapSchema<CapturePoint>

    addCapturePoint (capturePoint: CapturePoint): void
    removeCapturePoint (capturePointId: string): void
}