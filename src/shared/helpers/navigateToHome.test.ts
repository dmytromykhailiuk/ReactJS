import { history } from '../../router';
import { RouterPaths } from '../enums';
import { navigateToHome } from './navigateToHome';

describe('navigateToHome', () => {
  it("should call 'history push' with 'RouterPaths.HOME'", () => {
    const spy = jest.spyOn(history, 'push');
    navigateToHome();
    expect(spy).toHaveBeenCalledWith(RouterPaths.HOME);
  });
});
