export interface KeyData {
  code: string
  label: string
  colSpan?: number
}
export const keyboardLayout: KeyData[][] = [
  // 첫 번째 줄 - 총 60칸
  [
    { code: '`', label: '`~', colSpan: 4 },
    { code: 'Digit1', label: '1', colSpan: 4 },
    { code: 'Digit2', label: '2', colSpan: 4 },
    { code: 'Digit3', label: '3', colSpan: 4 },
    { code: 'Digit4', label: '4', colSpan: 4 },
    { code: 'Digit5', label: '5', colSpan: 4 },
    { code: 'Digit6', label: '6', colSpan: 4 },
    { code: 'Digit7', label: '7', colSpan: 4 },
    { code: 'Digit8', label: '8', colSpan: 4 },
    { code: 'Digit9', label: '9', colSpan: 4 },
    { code: 'Digit0', label: '0', colSpan: 4 },
    { code: 'Minus', label: '-', colSpan: 4 },
    { code: 'Equal', label: '=', colSpan: 4 },
    { code: 'Backspace', label: 'Backspace', colSpan: 8 },
  ],
  // 두 번째 줄 - 총 60칸
  [
    { code: 'Tab', label: 'Tab', colSpan: 6 },
    { code: 'KeyQ', label: 'Q', colSpan: 4 },
    { code: 'KeyW', label: 'W', colSpan: 4 },
    { code: 'KeyE', label: 'E', colSpan: 4 },
    { code: 'KeyR', label: 'R', colSpan: 4 },
    { code: 'KeyT', label: 'T', colSpan: 4 },
    { code: 'KeyY', label: 'Y', colSpan: 4 },
    { code: 'KeyU', label: 'U', colSpan: 4 },
    { code: 'KeyI', label: 'I', colSpan: 4 },
    { code: 'KeyO', label: 'O', colSpan: 4 },
    { code: 'KeyP', label: 'P', colSpan: 4 },
    { code: 'BracketLeft', label: '[', colSpan: 4 },
    { code: 'BracketRight', label: ']', colSpan: 4 },
    { code: 'Backslash', label: '\\', colSpan: 6 },
  ],
  // 세 번째 줄 - 총 60칸
  [
    { code: 'CapsLock', label: 'Caps Lock', colSpan: 7 },
    { code: 'KeyA', label: 'A', colSpan: 4 },
    { code: 'KeyS', label: 'S', colSpan: 4 },
    { code: 'KeyD', label: 'D', colSpan: 4 },
    { code: 'KeyF', label: 'F', colSpan: 4 },
    { code: 'KeyG', label: 'G', colSpan: 4 },
    { code: 'KeyH', label: 'H', colSpan: 4 },
    { code: 'KeyJ', label: 'J', colSpan: 4 },
    { code: 'KeyK', label: 'K', colSpan: 4 },
    { code: 'KeyL', label: 'L', colSpan: 4 },
    { code: 'Semicolon', label: ';', colSpan: 4 },
    { code: 'Quote', label: "'", colSpan: 4 },
    { code: 'Enter', label: 'Enter', colSpan: 9 },
  ],
  // 네 번째 줄 - 총 60칸
  [
    { code: 'ShiftLeft', label: 'Shift', colSpan: 9 },
    { code: 'KeyZ', label: 'Z', colSpan: 4 },
    { code: 'KeyX', label: 'X', colSpan: 4 },
    { code: 'KeyC', label: 'C', colSpan: 4 },
    { code: 'KeyV', label: 'V', colSpan: 4 },
    { code: 'KeyB', label: 'B', colSpan: 4 },
    { code: 'KeyN', label: 'N', colSpan: 4 },
    { code: 'KeyM', label: 'M', colSpan: 4 },
    { code: 'Comma', label: ',', colSpan: 4 },
    { code: 'Period', label: '.', colSpan: 4 },
    { code: 'Slash', label: '/', colSpan: 4 },
    { code: 'ShiftRight', label: 'Shift', colSpan: 11 },
  ],
  // 다섯 번째 줄 - 총 60칸
  [
    { code: 'ControlLeft', label: 'Ctrl', colSpan: 5 },
    { code: 'MetaLeft', label: 'Win', colSpan: 5 },
    { code: 'AltLeft', label: 'Alt', colSpan: 5 },
    { code: 'Space', label: '', colSpan: 30 },
    { code: 'AltRight', label: 'Alt', colSpan: 5 },
    { code: 'MetaRight', label: 'Win', colSpan: 5 },
    { code: 'ControlRight', label: 'Ctrl', colSpan: 5 },
  ],
]
