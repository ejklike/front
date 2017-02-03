export const TOGGLE = 'TOGGLE';

export function toggle(idx) {
  return {
    type: TOGGLE,
     idx: idx
  };
}
