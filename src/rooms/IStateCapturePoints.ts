import { EntityMap } from "../types/entityMap"
import { CapturePoint } from "../models/capturePoint"

export interface IStateCapturePoints {
    capturePoints: EntityMap<CapturePoint>
}