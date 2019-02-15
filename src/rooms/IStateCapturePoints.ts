import { EntityMap } from "colyseus";
import { CapturePoint } from "../models/capturePoint";

export interface IStateCapturePoints {
    capturePoints: EntityMap<CapturePoint>
}