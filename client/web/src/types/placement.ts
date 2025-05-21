export interface Placement {
  placementId: number
  keyboardId: number
  imageId: number
  model3dUrl: string
  imageUrl: string
  canDelete: boolean
  position: {
    x: number
    y: number
    z: number
  }
  rotation: {
    x: number
    y: number
    z: number
  }
  scale: {
    x: number
    y: number
    z: number
  }
}