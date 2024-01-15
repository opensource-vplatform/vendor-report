import { createSlice } from '@reduxjs/toolkit';

const setHistory = (state) => {
    const { history, formula } = state;
    if (history[history.length - 1] !== formula) {
        state.history.push({
            formula,
            selectionStart: state.selectionStart,
            selectionEnd: state.selectionEnd,
        });
        state.currentIndex = state.history.length - 1;
        refreshHistory(state);
    }
};

const refreshHistory = (state) => {
    state.canGoForward = canGoForward(state);
    state.canGoBack = canGoBack(state);
};

const canGoForward = (state) => {
    return state.currentIndex < state.history.length - 1;
};

const canGoBack = (state) => {
    return state.currentIndex > 0;
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
        canGoBack: false,
        canGoForward: false,
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
            if (state.formula !== newFormula) {
                state.formula = newFormula;
                state.selectionStart = index;
                state.selectionEnd = index;
                setHistory(state);
            }
        },
        markHistory(state, action) {
            if (
                state.history.length == 0 ||
                state.history[state.currentIndex].formula !==
                    state.formula
            ) {
                setHistory(state);
            }
        },
        setFormula(state, action) {
            const { formula, historied = false } = action.payload;
            if (state.formula !== formula) {
                state.formula = formula;
                historied && setHistory(state);
            }
        },
        setSelection(state, action) {
            const { start, end } = action.payload;
            state.selectionStart = start;
            state.selectionEnd = end;
        },
        clear: (state) => {
            state.formula = '';
            state.history = [
                { formula: '', selectionStart: 0, selectionEnd: 0 },
            ];
            state.currentIndex = 0;
            state.selectionStart = 0;
            state.selectionEnd = 0;
            state.canGoBack = false;
            state.canGoForward = false;
            state.errorList = [];
            state.showErrorDetail = false;
        },
        forward: (state) => {
            if (canGoForward(state)) {
                state.currentIndex += 1;
                const { formula, selectionStart, selectionEnd } =
                    state.history[state.currentIndex];
                state.formula = formula;
                state.selectionStart = selectionStart;
                state.selectionEnd = selectionEnd;
                refreshHistory(state);
            }
        },
        back: (state) => {
            if (canGoBack(state)) {
                state.currentIndex -= 1;
                const { formula, selectionStart, selectionEnd } =
                    state.history[state.currentIndex];
                state.formula = formula;
                state.selectionStart = selectionStart;
                state.selectionEnd = selectionEnd;
                refreshHistory(state);
            }
        },
        setError: (state, action) => {
            const { message } = action.payload;
            state.errorList = [message];
        },
        setErrorDetailVisible: (state, action) => {
            const { visible } = action.payload;
            state.showErrorDetail = visible;
        },
    },
});
export const {
    insert,
    clear,
    forward,
    back,
    setFormula,
    setSelection,
    markHistory,
    setError,
    setErrorDetailVisible,
} = formulaSlice.actions;
export default formulaSlice.reducer;
