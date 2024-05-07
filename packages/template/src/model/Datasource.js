import UnitDatasource from './UnionDatasource';

/**
 * 数据源
 */
class Datasource {
    constructor() {
        this.references = [];
        this.datas = {};
    }

    setReference(main, slave) {
        this.references.push({
            main,
            slave,
        });
    }

    load(datas) {
        this.datas = datas;
    }

    _referenceInCodes(reference, tableCodes) {
        const { main, slave } = reference;
        return (
            tableCodes.indexOf(main.getTableCode()) != -1 &&
            tableCodes.indexOf(slave.getTableCode()) != -1
        );
    }

    toUnionDatasource(tableCodes) {
        const references = [];
        this.references.forEach((reference) => {
            if (this._referenceInCodes(reference, tableCodes)) {
                references.push(reference);
            }
        });
        const unionDatasource = new UnitDatasource({ references });
        const datas = {};
        tableCodes.forEach((tableCode) => {
            datas[tableCode] = this.datas[tableCode];
        });
        unionDatasource.load(datas);
        return unionDatasource;
    }
}

export default Datasource;
