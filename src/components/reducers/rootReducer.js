import langVals from '../../Translations'

const initialState = {
    langOptions: ["en", "es", "de"],
    langVals: langVals.en
}

const rootReducer = (state = initialState, action) => {
    if (action.type === "CHANGE_USER_LANG") {
        let copyOfLangOptions = state.langOptions.filter((item) => item !== action.payload)
        copyOfLangOptions.unshift(action.payload);
        return {
            ...state,
            langOptions: copyOfLangOptions,
            langVals: langVals[copyOfLangOptions[0]]
        }
    }
    return state;
}


export default rootReducer;
