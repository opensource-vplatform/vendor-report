import { createSlice } from '@reduxjs/toolkit';

const set = (state, params) => {
    const temp = { ...state };
    if (state.formula !== params.formula) {
        temp.formula = params.formula;
        temp.history.push(params.formula);
        temp.currentIndex = temp.history.length - 1;
    }
    Object.assign(state, { ...temp, ...params });
};

const canGoForward = (state) => {
    return (
        (state.currentIndex === -1 && state.history.length > 0) ||
        (state.currentIndex !== -1 &&
            state.currentIndex < state.history.length - 1)
    );
};
const canGoBack = (state) => {
    return state.currentIndex >= 0;
};

export const formulaSlice = createSlice({
    name: 'formulaSlice',
    initialState: {
        formula: '',
        history: [],
        currentIndex: -1,
        selectionStart: 0,
        selectionEnd: 0,
        errorList: [],
        showErrorDetail: false,
    },
    reducers: {
        insert(state, action) {
            const { formula, offset = 0 } = action.payload;
            const { formula: formulaStr, selectionStart, selectionEnd } = state;
            const newFormula =
                formulaStr.substring(0, selectionStart) +
                formula +
                formulaStr.substring(selectionEnd);
            const index = selectionStart + formula.length + offset;
            set(state, {
                formula: newFormula,
                selectionStart: index,
                selectionEnd: index,
            });
        },
        setFormula(state, action) {
            state.formula = action.payload.formula;
        },
        setSelection(state, action) {
            const { start, end } = action.payload;
            state.selectionStart = start;
            state.selectionEnd = end;
        },
        clear: (state) => {
            state.formula = '';
            state.history = [];
            state.currentIndex = -1;
            state.selectionStart = 0;
            state.selectionEnd = 0;
        },
        forward: (state) => {
            if (canGoForward(state)) {
                state.currentIndex += 1;
                state.formula = state.history[state.currentIndex];
            }
        },
        back: (state) => {
            if (canGoBack(state)) {
                state.currentIndex -= 1;
                state.expression =
                    state.currentIndex == -1
                        ? ''
                        : state.history[state.currentIndex];
            }
        },
    },
});
export const { insert, clear, forward, back, setFormula, setSelection } =
    formulaSlice.actions;
export default formulaSlice.reducer;
