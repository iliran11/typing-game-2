import { EnthusiasmAction } from "../actions/actions";
import { StoreState } from "../../types/types-index";
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from "../../constants";

const initialState: StoreState = {enthusiasmLevel:1,languageName:'he'};


export default function enthusiasm(
  state: StoreState = initialState,
  action: EnthusiasmAction
): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return {
        ...state,
        enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1)
      };
    default:
      return state;
  }
  return state;
}
