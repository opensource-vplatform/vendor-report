import {
  getFormulaMetadata,
  getFormulaMetadatas,
  getFormulasByCatalog,
} from '../metadatas/formula';

export const getFormulaMetadatasByCatalog = function (catalog) {
    const formulaMetadatas = [];
    if(catalog=='all'){
        const metadatas = getFormulaMetadatas();
        for(let [code,metadata] of Object.entries(metadatas) ){
            formulaMetadatas.push({
                ...metadata,
                code,
            });
        }
    }else{
        const formlaCodes = getFormulasByCatalog(catalog);
        if (formlaCodes && formlaCodes.length > 0) {
            formlaCodes.forEach((code) => {
                const metadata = getFormulaMetadata(code);
                if (metadata) {
                    formulaMetadatas.push({
                        ...metadata,
                        code,
                    });
                }
            });
        }
    }
    return formulaMetadatas;
};

const RECENT_FORMULA_STORAGE_KEY = 'TOONE_REPORT_RECENT_FORMULA_STORAGE_KEY';
const getFormulasFromStorage = function () {
    let formulas = localStorage.getItem(RECENT_FORMULA_STORAGE_KEY);
    try {
        formulas = formulas == null ? [] : JSON.parse(formulas);
    } catch (e) {
        formulas = [];
    }
    return formulas;
};

/**
 * 获取最近使用的函数
 */
export const getRecentFormulaMetadatas = function () {
    const formulas = getFormulasFromStorage();
    const formulaMetadatas = [];
    for (let index = 0; index < formulas.length; index++) {
        const code = formulas[index];
        const metadata = getFormulaMetadata(code);
        if (metadata) {
            formulaMetadatas.push({
                ...metadata,
                code,
            });
        }
        if (formulaMetadatas.length == 10) {
            break;
        }
    }
    return formulaMetadatas;
};

/**
 * 更新最新使用的函数
 * @param {*} code
 */
export const updateRecentFormula = function (code) {
    let formulas = getFormulasFromStorage();
    const index = formulas.indexOf(code);
    if (index != -1) {
        formulas.splice(index, 1);
    }
    formulas.splice(0, 0, code);
    localStorage.setItem(RECENT_FORMULA_STORAGE_KEY, JSON.stringify(formulas));
};
