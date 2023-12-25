import { getFormulaMetadata, getFormulasByCatalog } from '../metadatas/formula';

export const getFormulaMetadatasByCatalog = function (catalog) {
    const formulaMetadatas = [];
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
    return formulaMetadatas;
};
