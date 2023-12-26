import {
  getCatalogFormulaMap,
  getCatalogs,
  getFormulaMetadata,
  getFormulaMetadatas,
  getFormulasByCatalog,
} from '../metadatas/formula';

const CATALOG_MAP_FORMULA_METADATA = {};

export const getFormulaMetadatasByCatalog = function (catalog) {
    let cache = CATALOG_MAP_FORMULA_METADATA[catalog];
    if (!cache) {
        const formulaMetadatas = [];
        if (catalog == 'all') {
            const metadatas = getFormulaMetadatas();
            for (let [code, metadata] of Object.entries(metadatas)) {
                formulaMetadatas.push({
                    ...metadata,
                    code,
                });
            }
        } else {
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
        cache = formulaMetadatas;
        CATALOG_MAP_FORMULA_METADATA[catalog] = cache;
    }
    return cache;
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

export const getCatalogByFormula = function (formula) {
    const metadata = getFormulaMetadata(formula);
    if (metadata) {
        return metadata.catalog;
    }
    return null;
};

const hasCatalog = function(catalog){
    const catalogs = getCatalogs();
    for (let index = 0; index < catalogs.length; index++) {
        const item = catalogs[index];
        if(item.code == catalog){
            return true;
        }
    }
    return false;
}

export const filterFormula = function (filter,skips=[]) {
    const metadatas = getFormulaMetadatas();
    let formula = null,
        catalog = null;
    for (let [code, metadata] of Object.entries(metadatas)) {
        if (skips.indexOf(code)==-1&&(code.indexOf(filter) != -1 || metadata.desc.indexOf(filter) != -1)) {
            formula = code;
            break;
        }
    }
    if (formula != null) {
        const map = getCatalogFormulaMap(formula);
        for (let [catalog1, formlaCodes] of Object.entries(map)) {
            if (formlaCodes.indexOf(formula) != -1&&hasCatalog(catalog1)) {
                catalog = catalog1
                break;
            }
        }
    }
    if (formula != null && catalog != null) {
        return { formula, catalog };
    }
    return null;
};
