export const CATEGORY_TOGGLE = 'CATEGORY_TOGGLE';
export const PATH_TOGGLE = 'PATH_TOGGLE';
export const BLOG_TOGGLE = 'BLOG_TOGGLE';
export const PATH_ADD = 'PATH_ADD';
export const PATH_ADD_MODE_TOGGLE = 'PATH_ADD_MODE_TOGGLE';

export function categoryToggle(idx) {
  return {
    type: CATEGORY_TOGGLE,
     idx: idx
  };
}

export function pathToggle() {
  return {
  	type: PATH_TOGGLE
	};
}

export function blogToggle() {
	return {
		type: BLOG_TOGGLE
	};
}

export function pathAddModeToggle() {
  return {
    type: PATH_ADD_MODE_TOGGLE
  }
}

export function pathAdd(spot) {
  return {
    type: PATH_ADD,
    spot: spot
  };
}
