import { drawerReducer, drawerSlice, initialDrawerState } from './drawer.slice';

describe('drawer reducer', () => {
  it('should handle initial state', () => {
    expect(drawerReducer(undefined, { type: '' })).toEqual({ isOpen: true });
  });
  it('should handle isOpen state changes', () => {
    expect(
      drawerReducer(initialDrawerState, drawerSlice.actions.close)
    ).toEqual({
      isOpen: false,
    });
    expect(drawerReducer(initialDrawerState, drawerSlice.actions.open)).toEqual(
      {
        isOpen: true,
      }
    );
    expect(drawerReducer({ isOpen: true }, drawerSlice.actions.toggle)).toEqual(
      {
        isOpen: false,
      }
    );
    expect(
      drawerReducer({ isOpen: false }, drawerSlice.actions.toggle)
    ).toEqual({
      isOpen: true,
    });
  });
});
