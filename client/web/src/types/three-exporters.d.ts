// src/types/three-exporters.d.ts
declare module 'three/examples/jsm/exporters/GLTFExporter' {
  export class GLTFExporter {
    parse(
      input: any,
      onCompleted: (result: ArrayBuffer | object) => void,
      onError?: (error: unknown) => void,
      options?: object
    ): void
  }
}