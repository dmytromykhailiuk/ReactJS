import { history } from '../../router';
import { RouterPaths } from '../enums';

export function navigateToHome() {
  history.push(RouterPaths.HOME);
}
