import { SdkLoadedSuccessAction } from '../types';
import { SDK_LOAD_SUCESS } from '../constants';
export function sdkLoadedSuccess(result: boolean): SdkLoadedSuccessAction {
  return {
    type: SDK_LOAD_SUCESS
  };
}
