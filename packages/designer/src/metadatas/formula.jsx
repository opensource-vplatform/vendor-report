const CATALOGS = [
    {
        code: 'database',
        name: '数据库',
    },
    {
        code: 'dateAndTime',
        name: '日期与时间',
    },
    {
        code: 'engineering',
        name: '工程',
    },
    {
        code: 'financial',
        name: '财务',
    },
    {
        code: 'information',
        name: '信息',
    },
    {
        code: 'logical',
        name: '逻辑',
    },
    {
        code: 'lookupAndReference',
        name: '查找与引用',
    },
    {
        code: 'mathAndTrigonometry',
        name: '数学与三角函数',
    },
    {
        code: 'statistics',
        name: '统计',
    },
    {
        code: 'statistical',
        name: '文本',
    },
    {
        code: 'web',
        name: 'Web',
    },
];

const CATALOG_FORMULA_MAP = {
    database: [
        'DAVERAGE',
        'DCOUNT',
        'DCOUNTA',
        'DGET',
        'DMAX',
        'DMIN',
        'DPRODUCT',
        'DSTDEV',
        'DSTDEVP',
        'DSUM',
        'DVAR',
        'DVARP',
    ],
    web: ['ENCODEURL', 'FILTERJSON', 'WEBSERVICE'],
    dateAndTime: [
        'DATE',
        'DATEDIF',
        'DATEVALUE',
        'DAY',
        'DAYS',
        'DAYS360',
        'EDATE',
        'EOMONTH',
        'HOUR',
        'ISOWEEKNUM',
        'MINUTE',
        'MONTH',
        'NETWORKDAYS',
        'NETWORKDAYS.INTL',
        'NOW',
        'SECOND',
        'TIME',
        'TIMEVALUE',
        'TODAY',
        'WEEKDAY',
        'WEEKNUM',
        'WORKDAY',
        'WORKDAY.INTL',
        'YEAR',
        'YEARFRAC',
    ],
    engineering: [
        'BESSELI',
        'BESSELJ',
        'BESSELK',
        'BESSELY',
        'BIN2DEC',
        'BIN2HEX',
        'BIN2OCT',
        'BITAND',
        'BITLSHIFT',
        'BITOR',
        'BITRSHIFT',
        'BITXOR',
        'COMPLEX',
        'CONVERT',
        'DEC2BIN',
        'DEC2HEX',
        'DEC2OCT',
        'DELTA',
        'ERF',
        'ERFC',
        'ERF.PRECISE',
        'ERFC.PRECISE',
        'GESTEP',
        'HEX2BIN',
        'HEX2DEC',
        'HEX2OCT',
        'IMABS',
        'IMAGINARY',
        'IMARGUMENT',
        'IMCONJUGATE',
        'IMCOS',
        'IMDIV',
        'IMEXP',
        'IMLN',
        'IMLOG10',
        'IMLOG2',
        'IMPOWER',
        'IMPRODUCT',
        'IMREAL',
        'IMSIN',
        'IMSQRT',
        'IMSUB',
        'IMSUM',
        'IMCOSH',
        'IMCOT',
        'IMCSC',
        'IMCSCH',
        'IMSEC',
        'IMSECH',
        'IMSINH',
        'IMTAN',
        'OCT2BIN',
        'OCT2DEC',
        'OCT2HEX',
    ],
    financial: [
        'ACCRINT',
        'ACCRINTM',
        'AMORDEGRC',
        'AMORLINC',
        'COUPDAYBS',
        'COUPDAYS',
        'COUPDAYSNC',
        'COUPNCD',
        'COUPNUM',
        'COUPPCD',
        'CUMIPMT',
        'CUMPRINC',
        'DB',
        'DDB',
        'DISC',
        'DOLLARDE',
        'DOLLARFR',
        'DURATION',
        'EFFECT',
        'FV',
        'FVSCHEDULE',
        'INTRATE',
        'IPMT',
        'IRR',
        'ISPMT',
        'MDURATION',
        'MIRR',
        'NOMINAL',
        'NPER',
        'NPV',
        'ODDFPRICE',
        'ODDFYIELD',
        'ODDLPRICE',
        'ODDLYIELD',
        'EURO',
        'EUROCONVERT',
        'PMT',
        'PPMT',
        'PRICE',
        'PRICEDISC',
        'PRICEMAT',
        'PV',
        'PDURATION',
        'RRI',
        'RATE',
        'RECEIVED',
        'SLN',
        'SYD',
        'TBILLEQ',
        'TBILLPRICE',
        'TBILLYIELD',
        'VDB',
        'XIRR',
        'XNPV',
        'YIELD',
        'YIELDDISC',
        'YIELDMAT',
    ],
    information: [
        'ERROR.TYPE',
        'ISBLANK',
        'ISERR',
        'ISERROR',
        'ISEVEN',
        'ISLOGICAL',
        'ISFORMULA',
        'ISNA',
        'ISNONTEXT',
        'ISNUMBER',
        'ISODD',
        'ISOMITTED',
        'ISREF',
        'ISTEXT',
        'N',
        'NA',
        'SHEET',
        'SHEETS',
        'TYPE',
    ],
    logical: [
        'AND',
        'FALSE',
        'IF',
        'IFERROR',
        'IFNA',
        'IFS',
        'LAMBDA',
        'NOT',
        'OR',
        'SWITCH',
        'TRUE',
        'XOR',
        'BYCOL',
        'BYROW',
        'MAKEARRAY',
        'MAP',
        'REDUCE',
        'SCAN',
    ],
    lookupAndReference: [
        'ADDRESS',
        'AREAS',
        'CHOOSE',
        'COLUMN',
        'COLUMNS',
        'FORMULATEXT',
        'HLOOKUP',
        'HYPERLINK',
        'INDEX',
        'INDIRECT',
        'LOOKUP',
        'MATCH',
        'OFFSET',
        'ROW',
        'ROWS',
        'TRANSPOSE',
        'VLOOKUP',
        'XLOOKUP',
        'XMATCH',
        'CHOOSECOLS',
        'CHOOSEROWS',
        'DROP',
        'EXPAND',
        'FILTER',
        'HSTACK',
        'SORT',
        'SORTBY',
        'TAKE',
        'TOCOL',
        'TOROW',
        'UNIQUE',
        'VSTACK',
        'WRAPCOLS',
        'WRAPROWS',
    ],
    mathAndTrigonometry: [
        'ABS',
        'ACOS',
        'ACOSH',
        'ACOT',
        'ACOTH',
        'AGGREGATE',
        'ARABIC',
        'ASIN',
        'ASINH',
        'ATAN',
        'ATAN2',
        'ATANH',
        'BASE',
        'CEILING',
        'CEILING.MATH',
        'CEILING.PRECISE',
        'COMBIN',
        'COMBINA',
        'COS',
        'COSH',
        'COT',
        'COTH',
        'CSC',
        'CSCH',
        'DECIMAL',
        'DEGREES',
        'EVEN',
        'EXP',
        'FACT',
        'FACTDOUBLE',
        'FLOOR',
        'FLOOR.MATH',
        'FLOOR.PRECISE',
        'GCD',
        'INT',
        'ISO.CEILING',
        'LCM',
        'LN',
        'LOG',
        'LOG10',
        'MDETERM',
        'MINVERSE',
        'MMULT',
        'MOD',
        'MROUND',
        'MULTINOMIAL',
        'ODD',
        'PI',
        'POWER',
        'PRODUCT',
        'QUOTIENT',
        'RADIANS',
        'RAND',
        'RANDBETWEEN',
        'ROMAN',
        'ROUND',
        'ROUNDDOWN',
        'ROUNDUP',
        'SEC',
        'SECH',
        'SERIESSUM',
        'SIGN',
        'SIN',
        'SINH',
        'SQRT',
        'SQRTPI',
        'SUBTOTAL',
        'SUM',
        'SUMIF',
        'SUMIFS',
        'SUMPRODUCT',
        'SUMSQ',
        'SUMX2MY2',
        'SUMX2PY2',
        'SUMXMY2',
        'TAN',
        'TANH',
        'TRUNC',
        'RANDARRAY',
        'SEQUENCE',
    ],
    statistical: [
        'AVEDEV',
        'AVERAGE',
        'AVERAGEA',
        'AVERAGEIF',
        'AVERAGEIFS',
        'BETADIST',
        'BETAINV',
        'BETA.DIST',
        'BETA.INV',
        'BINOMDIST',
        'BINOM.DIST',
        'BINOM.DIST.RANGE',
        'BINOM.INV',
        'CHIDIST',
        'CHIINV',
        'CHITEST',
        'CHISQ.DIST',
        'CHISQ.DIST.RT',
        'CHISQ.INV',
        'CHISQ.INV.RT',
        'CHISQ.TEST',
        'CONFIDENCE',
        'CONFIDENCE.NORM',
        'CONFIDENCE.T',
        'CORREL',
        'COUNT',
        'COUNTA',
        'COUNTBLANK',
        'COUNTIF',
        'COUNTIFS',
        'COVAR',
        'COVARIANCE.P',
        'COVARIANCE.S',
        'CRITBINOM',
        'DEVSQ',
        'EXPONDIST',
        'EXPON.DIST',
        'FDIST',
        'FINV',
        'FISHER',
        'FISHERINV',
        'FORECAST',
        'FREQUENCY',
        'FTEST',
        'F.DIST',
        'F.DIST.RT',
        'F.INV',
        'F.INV.RT',
        'F.TEST',
        'GAMMADIST',
        'GAMMAINV',
        'GAMMALN',
        'GEOMEAN',
        'GROWTH',
        'GAMMA',
        'GAMMA.DIST',
        'GAMMA.INV',
        'GAMMALN.PRECISE',
        'GAUSS',
        'HARMEAN',
        'HYPGEOMDIST',
        'HYPGEOM.DIST',
        'INTERCEPT',
        'KURT',
        'LARGE',
        'LINEST',
        'LOGEST',
        'LOGINV',
        'LOGNORMDIST',
        'LOGNORM.DIST',
        'LOGNORM.INV',
        'MAX',
        'MAXA',
        'MAXIFS',
        'MEDIAN',
        'MIN',
        'MINA',
        'MINIFS',
        'MODE',
        'MODE.MULT',
        'MODE.SNGL',
        'NEGBINOMDIST',
        'NEGBINOM.DIST',
        'NORMDIST',
        'NORMINV',
        'NORMSDIST',
        'NORMSINV',
        'NORM.DIST',
        'NORM.INV',
        'NORM.S.DIST',
        'NORM.S.INV',
        'PEARSON',
        'PERCENTILE',
        'PERCENTRANK',
        'PERMUT',
        'PERCENTILE.EXC',
        'PERCENTILE.INC',
        'PERCENTRANK.EXC',
        'PERCENTRANK.INC',
        'PERMUTATIONA',
        'PHI',
        'POISSON',
        'POISSON.DIST',
        'PROB',
        'QUARTILE',
        'QUARTILE.EXC',
        'QUARTILE.INC',
        'RANK',
        'RANK.AVG',
        'RANK.EQ',
        'RSQ',
        'SKEW',
        'SKEW.P',
        'SLOPE',
        'SMALL',
        'STANDARDIZE',
        'STDEV',
        'STDEVA',
        'STDEVP',
        'STDEVPA',
        'STDEV.P',
        'STDEV.S',
        'STEYX',
        'TDIST',
        'TINV',
        'TREND',
        'TRIMMEAN',
        'TTEST',
        'T.DIST',
        'T.DIST.2T',
        'T.DIST.RT',
        'T.INV',
        'T.INV.2T',
        'T.TEST',
        'VAR',
        'VARA',
        'VARP',
        'VARPA',
        'VAR.P',
        'VAR.S',
        'WEIBULL',
        'WEIBULL.DIST',
        'ZTEST',
        'Z.TEST',
    ],
};

const FORMULA_METADATAS = {
    "ABS": {
        "desc": "该函数返回指定数字的绝对值。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "ACCRINT": {
        "desc": "该函数返回定期付息证券的应计利息。",
        "args": [{
                "name": "issue"
            }, {
                "name": "first_interest"
            }, {
                "name": "settlement"
            }, {
                "name": "rate"
            }, {
                "name": "par"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "ACCRINTM": {
        "desc": "该函数返回在到期日支付利息的有价证券的应计利息。",
        "args": [{
                "name": "issue"
            }, {
                "name": "settlement"
            }, {
                "name": "rate"
            }, {
                "name": "par"
            }, {
                "name": "basis"
            }
        ]
    },
    "ACOS": {
        "desc": "该函数返回数字的反余弦值。反余弦值是角度，它的余弦值为数字。返回的角度值以弧度表示，范围是0到pi。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "ACOSH": {
        "desc": "该函数返回number参数的反双曲余弦值。参数必须大于或等于1。反双曲余弦值的双曲余弦即为number，因此ACOSH(COSH(number))等于number。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "ADDRESS": {
        "desc": "该函数在给出指定行数和列数的情况下，可以使用ADDRESS函数获取工作表单元格的地址。",
        "args": [{
                "name": "row_num"
            }, {
                "name": "column_num"
            }, {
                "name": "abs_num"
            }, {
                "name": "a1style"
            }, {
                "name": "sheet_text"
            }
        ]
    },
    "AGGREGATE": {
        "desc": "此函数使用指定的内置函数汇总数字列表。",
        "args": [{
                "name": "function_num"
            }, {
                "name": "options"
            }, {
                "name": "ref1"
            }, {
                "name": "ref2",
                "required": true
            }
        ]
    },
    "AMORDEGRC": {
        "desc": "该函数返回每个结算期间的折旧值。该函数主要为法国会计系统提供。如果某项资产是在该结算期的中期购入的，则按直线折旧法计算。该函数与函数AMORLINC相似，不同之处在于该函数中用于计算的折旧系数取决于资产的寿命。",
        "args": [{
                "name": "cost"
            }, {
                "name": "date_purchased"
            }, {
                "name": "first_period"
            }, {
                "name": "salvage"
            }, {
                "name": "period"
            }, {
                "name": "rate"
            }, {
                "name": "basis"
            }
        ]
    },
    "AMORLINC": {
        "desc": "该函数返回每个结算期间的折旧值，该函数为法国会计系统提供。如果某项资产是在结算期间的中期购入的，则按线性折旧法计算。",
        "args": [{
                "name": "cost"
            }, {
                "name": "date_purchased"
            }, {
                "name": "first_period"
            }, {
                "name": "salvage"
            }, {
                "name": "period"
            }, {
                "name": "rate"
            }, {
                "name": "basis"
            }
        ]
    },
    "AND": {
        "desc": "该函数返回逻辑与。如果每一个参数都是TRUE时返回TRUE。",
        "args": [{
                "name": "logical1"
            }, {
                "name": "logical2"
            }
        ]
    },
    "ASIN": {
        "desc": "该函数返回参数的反正弦值。反正弦值为一个角度，该角度的正弦值即等于此函数的number参数。返回的角度值将以弧度表示，范围为-pi/2到pi/2。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "ASINH": {
        "desc": "该函数返回参数的反双曲正弦值。反双曲正弦值的双曲正弦即等于此函数的number参数值，因此ASINH(SINH(number))等于number参数值。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "ATAN": {
        "desc": "该函数返回反正切值。反正切值为角度，起正切值即等于number参数值。返回的角度值将以弧度表示，范围为-pi/2到pi/2。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "ATAN2": {
        "desc": "该函数返回给定X及Y坐标值的反正切值。",
        "args": [{
                "name": "x_num"
            }, {
                "name": "y_num"
            }
        ]
    },
    "ATANH": {
        "desc": "该函数返回参数的反双曲正切值。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "AVEDEV": {
        "desc": "该函数返回一组数据与其均值的绝对偏差的平均值，AVEDEV用于评测这组数据的离散度。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "AVERAGE": {
        "desc": "该函数返回参数的平均值。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "AVERAGEA": {
        "desc": "该函数计算参数列表中数值的平均值，包括文本和逻辑值。",
        "args": [{
                "name": "value1"
            }, {
                "name": "value2",
                "required": true
            }
        ]
    },
    "AVERAGEIF": {
        "desc": "返回某个区域内满足给定条件的所有单元格的平均值。",
        "args": [{
                "name": "range"
            }, {
                "name": "criteria"
            }, {
                "name": "[average_range]"
            }
        ]
    },
    "AVERAGEIFS": {
        "desc": "该函数返回满足多重条件的所有单元格的平均值。",
        "args": [{
                "name": "average_range"
            }, {
                "name": "criteria_range1"
            }, {
                "name": "criteria1"
            }, {
                "name": "criteria_range2",
                "required": true
            }, {
                "name": "criteria2",
                "required": true
            }
        ]
    },
    "BESSELI": {
        "desc": "该函数返回修正Bessel函数值，它与用纯虚数参数运算时的Bessel函数值相等。",
        "args": [{
                "name": "value"
            }, {
                "name": "order"
            }
        ]
    },
    "BESSELJ": {
        "desc": "该函数返回Bessel函数值。",
        "args": [{
                "name": "value"
            }, {
                "name": "order"
            }
        ]
    },
    "BESSELK": {
        "desc": "该函数返回修正Bessel函数值，它与用纯虚数参数运算时的Bessel函数值相等。",
        "args": [{
                "name": "value"
            }, {
                "name": "order"
            }
        ]
    },
    "BESSELY": {
        "desc": "该函数返回Bessel函数值，该函数也称作诺伊曼函数。",
        "args": [{
                "name": "value"
            }, {
                "name": "order"
            }
        ]
    },
    "BETADIST": {
        "desc": "该函数返回累积beta分布的概率密度函数。",
        "args": [{
                "name": "x"
            }, {
                "name": "alpha"
            }, {
                "name": "beta"
            }, {
                "name": "lower"
            }, {
                "name": "upper"
            }
        ]
    },
    "BETAINV": {
        "desc": "该函数返回指定beta分布累积beta分布的概率密度函数的反函数值。",
        "args": [{
                "name": "probability"
            }, {
                "name": "alpha"
            }, {
                "name": "beta"
            }, {
                "name": "lower"
            }, {
                "name": "upper"
            }
        ]
    },
    "BIN2DEC": {
        "desc": "该函数将二进制数转换为十进制数。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "BIN2HEX": {
        "desc": "该函数将二进制数转换为十六进制数。",
        "args": [{
                "name": "number"
            }, {
                "name": "places"
            }
        ]
    },
    "BIN2OCT": {
        "desc": "该函数将二进制数转换为八进制数。",
        "args": [{
                "name": "number"
            }, {
                "name": "places"
            }
        ]
    },
    "BINOMDIST": {
        "desc": "该函数返回一元二项式分布的概率值。",
        "args": [{
                "name": "number_s"
            }, {
                "name": "trials"
            }, {
                "name": "probability_s"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "CEILING": {
        "desc": "该函数将参数向上舍入。",
        "args": [{
                "name": "number"
            }, {
                "name": "significance"
            }
        ]
    },
    "CHAR": {
        "desc": "该函数返回对应数字代码的字符。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "CHIDIST": {
        "desc": "该函数返回 χ2 分布的单尾概率。",
        "args": [{
                "name": "value"
            }, {
                "name": "deg_freedom"
            }
        ]
    },
    "CHIINV": {
        "desc": "该函数返回 χ2 分布单尾概率的反函数值。",
        "args": [{
                "name": "probability"
            }, {
                "name": "deg_freedom"
            }
        ]
    },
    "CHITEST": {
        "desc": "该函数返回独立性检测值。",
        "args": [{
                "name": "actual_range"
            }, {
                "name": "expected_range"
            }
        ]
    },
    "CHOOSE": {
        "desc": "该函数返回从值得列表中选择值。",
        "args": [{
                "name": "index_num"
            }, {
                "name": "value1"
            }, {
                "name": "value2",
                "required": true
            }
        ]
    },
    "CLEAN": {
        "desc": "该函数删除文本中所有非打印字符。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "CODE": {
        "desc": "该函数返回文本字符串中第一个字符的数字代码。返回的代码对应于计算机当前使用的字符串。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "COLUMN": {
        "desc": "该函数返回引用的列号。",
        "args": [{
                "name": "reference"
            }
        ]
    },
    "COLUMNS": {
        "desc": "该函数返回引用中包含的列数。",
        "args": [{
                "name": "array"
            }
        ]
    },
    "COMBIN": {
        "desc": "该函数计算从给定数目的对象集合中提取若干对象的组合数。",
        "args": [{
                "name": "number"
            }, {
                "name": "number_chosen"
            }
        ]
    },
    "COMPLEX": {
        "desc": "该函数将实系数和虚系数转换为复数。",
        "args": [{
                "name": "real_num"
            }, {
                "name": "image_num"
            }, {
                "name": "suffix"
            }
        ]
    },
    "CONCATENATE": {
        "desc": "该函数将两个或多个文本字符串合并为一个文本字符串。",
        "args": [{
                "name": "text1"
            }, {
                "name": "text2",
                "required": true
            }
        ]
    },
    "CONFIDENCE": {
        "desc": "该函数返回总体平均值的置信区间。",
        "args": [{
                "name": "alpha"
            }, {
                "name": "standard_dev"
            }, {
                "name": "size"
            }
        ]
    },
    "CONVERT": {
        "desc": "该函数将数字从一种度量系统转换为另一种度量系统。",
        "args": [{
                "name": "number"
            }, {
                "name": "from_unit"
            }, {
                "name": "to_unit"
            }
        ]
    },
    "CORREL": {
        "desc": "该函数返回两个数据集之间的相关系数。",
        "args": [{
                "name": "array1"
            }, {
                "name": "array2"
            }
        ]
    },
    "COS": {
        "desc": "该函数返回数字的余弦值。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "COSH": {
        "desc": "该函数返回数字的双曲余弦值。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "COUNT": {
        "desc": "该函数计算参数列表中数字的个数。",
        "args": [{
                "name": "value1"
            }, {
                "name": "value2",
                "required": true
            }
        ]
    },
    "COUNTA": {
        "desc": "该函数计算区域中不为空的单元格的个数。",
        "args": [{
                "name": "value1"
            }, {
                "name": "value2",
                "required": true
            }
        ]
    },
    "COUNTBLANK": {
        "desc": "该函数计算指定单元格区域中空白单元格的个数。",
        "args": [{
                "name": "cellrange"
            }
        ]
    },
    "COUNTIF": {
        "desc": "该函数计算区域内符合给定条件的单元格的数量。",
        "args": [{
                "name": "cellrange"
            }, {
                "name": "criteria"
            }
        ]
    },
    "COUNTIFS": {
        "desc": "该函数计算区域内符合多个条件的单元格的数量。",
        "args": [{
                "name": "criteria_range1"
            }, {
                "name": "criteria1"
            }, {
                "name": "criteria_range2",
                "required": true
            }, {
                "name": "criteria2",
                "required": true
            }
        ]
    },
    "COUPDAYBS": {
        "desc": "该函数返回从付息期开始到成交日之间的天数。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "COUPDAYS": {
        "desc": "该函数返回包含成交日的付息天数。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "COUPDAYSNC": {
        "desc": "该函数返回从结算日到下一付息日之间的天数。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "COUPNCD": {
        "desc": "该函数返回一个表示在结算日之后下一个付息日的数字。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "COUPNUM": {
        "desc": "该函数返回在结算日和到期日之间付息次数，向上舍入到最近的整数。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "COUPPCD": {
        "desc": "该函数返回表示结算日之前的付息日的数字。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "COVAR": {
        "desc": "该函数返回协方差，即两个数据集中每对数据点的偏差乘积的平均值。",
        "args": [{
                "name": "array1"
            }, {
                "name": "array2"
            }
        ]
    },
    "CRITBINOM": {
        "desc": "该函数返回累积二项式分布大于等于临界值的最小值。",
        "args": [{
                "name": "trials"
            }, {
                "name": "probability_s"
            }, {
                "name": "alpha"
            }
        ]
    },
    "CUMIPMT": {
        "desc": "该函数返回两个付款期之间累积支付的利息。",
        "args": [{
                "name": "rate"
            }, {
                "name": "nper"
            }, {
                "name": "pval"
            }, {
                "name": "start_period"
            }, {
                "name": "end_period"
            }, {
                "name": "paytype"
            }
        ]
    },
    "CUMPRINC": {
        "desc": "该函数返回两个付款期之间为贷款累积支付的本金。",
        "args": [{
                "name": "rate"
            }, {
                "name": "nper"
            }, {
                "name": "pval"
            }, {
                "name": "start_period"
            }, {
                "name": "end_period"
            }, {
                "name": "paytype"
            }
        ]
    },
    "DATE": {
        "desc": "该函数返回DateTime对象，代表了一个独有的日期，通过定制年，月和日。",
        "args": [{
                "name": "year"
            }, {
                "name": "month"
            }, {
                "name": "day"
            }
        ]
    },
    "DATEDIF": {
        "desc": "该函数返回两个日期间的天，月和年的数目。",
        "args": [{
                "name": "start_date"
            }, {
                "name": "end_date"
            }, {
                "name": "unit"
            }
        ]
    },
    "DATEVALUE": {
        "desc": "该函数将文本格式的日期转换为日期对象。",
        "args": [{
                "name": "date_text"
            }
        ]
    },
    "DAVERAGE": {
        "desc": "该函数返回列表或数据库中满足指定条件的记录字段（列）中的数值的平均值。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "DAY": {
        "desc": "该函数将序列号转换为月份日期。",
        "args": [{
                "name": "date"
            }
        ]
    },
    "DAYS360": {
        "desc": "该函数以一年360天为基准计算两个日期间的天数。",
        "args": [{
                "name": "start_date"
            }, {
                "name": "end_date"
            }, {
                "name": "method"
            }
        ]
    },
    "DB": {
        "desc": "该函数使用固定余额递减法，返回一笔资产在给定期间内的折旧值。",
        "args": [{
                "name": "cost"
            }, {
                "name": "salvage"
            }, {
                "name": "life"
            }, {
                "name": "period"
            }, {
                "name": "month"
            }
        ]
    },
    "DCOUNT": {
        "desc": "该函数计算数据库中包含数字的单元格的数量。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "DCOUNTA": {
        "desc": "该函数计算数据库中非空单元格的数量。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "DDB": {
        "desc": "该函数使用双倍余额递减法或其他指定方法，返回一笔资产在给定期间内的折旧值。",
        "args": [{
                "name": "cost"
            }, {
                "name": "salvage"
            }, {
                "name": "life"
            }, {
                "name": "period"
            }, {
                "name": "factor"
            }
        ]
    },
    "DEC2BIN": {
        "desc": "该函数将十进制数转换为二进制数。",
        "args": [{
                "name": "number"
            }, {
                "name": "places"
            }
        ]
    },
    "DEC2HEX": {
        "desc": "该函数将十进制数转换为十六进制数。",
        "args": [{
                "name": "number"
            }, {
                "name": "places"
            }
        ]
    },
    "DEC2OCT": {
        "desc": "该函数将十进制数转换为八进制数。",
        "args": [{
                "name": "number"
            }, {
                "name": "places"
            }
        ]
    },
    "DEGREES": {
        "desc": "该函数将弧度转换为度。",
        "args": [{
                "name": "angle"
            }
        ]
    },
    "DELTA": {
        "desc": "该函数测试两个数值是否相等。如果number1= number2，则返回1，否则返回0。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2"
            }
        ]
    },
    "DEVSQ": {
        "desc": "该函数返回数据点与各自样本平均值偏差的平方和。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "DGET": {
        "desc": "该函数从列表或数据库的列中提取符合指定条件的单个值。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "DISC": {
        "desc": "该函数返回有价证券的贴现率。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "price"
            }, {
                "name": "redemption"
            }, {
                "name": "basis"
            }
        ]
    },
    "DMAX": {
        "desc": "该函数返回列表或数据库中满足指定条件的记录字段（列）中的最大数字。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "DMIN": {
        "desc": "该函数返回列表或数据库中满足指定条件的记录字段（列）中的最小数字。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "DOLLAR": {
        "desc": "该函数依照货币格式将小数四舍五入到指定的位数并转换成文本。",
        "args": [{
                "name": "number"
            }, {
                "name": "decimals"
            }
        ]
    },
    "DOLLARDE": {
        "desc": "该函数将按分数表示的价格转换为按小数表示的价格。",
        "args": [{
                "name": "fractional_dollar"
            }, {
                "name": "fraction"
            }
        ]
    },
    "DOLLARFR": {
        "desc": "该函数将以小数表示的价格转换为以分数表示的价格。",
        "args": [{
                "name": "decimal_dollar"
            }, {
                "name": "fraction"
            }
        ]
    },
    "DPRODUCT": {
        "desc": "该函数将数据库中符合条件的记录的特定字段中的值相乘。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "DSTDEV": {
        "desc": "该函数返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为一个样本估算出的样本总体标准偏差。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "DSTDEVP": {
        "desc": "该函数返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为样本总体计算出的总体标准偏差。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "DSUM": {
        "desc": "该函数返回列表或数据库中满足指定条件的记录字段（列）中的数字之和。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "DURATION": {
        "desc": "该函数返回假设面值 ￥100 的定期付息有价证券的修正期限。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "coupon"
            }, {
                "name": "yield"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "DVAR": {
        "desc": "该函数返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为一个样本估算出的样本总体方差。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "DVARP": {
        "desc": "该函数返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为样本总体计算出的样本总体方差。",
        "args": [{
                "name": "database"
            }, {
                "name": "field"
            }, {
                "name": "criteria"
            }
        ]
    },
    "EDATE": {
        "desc": "该函数返回用于表示开始日期之前或之后月数的日期的序列号。",
        "args": [{
                "name": "start_date"
            }, {
                "name": "months"
            }
        ]
    },
    "EFFECT": {
        "desc": "该函数利用给定的名义年利率和每年的复利期数，计算有效的年利率。",
        "args": [{
                "name": "nominal_rate"
            }, {
                "name": "npery"
            }
        ]
    },
    "EOMONTH": {
        "desc": "该函数返回指定月数之前或之后的月份的最后一天的序列号。",
        "args": [{
                "name": "start_date"
            }, {
                "name": "months"
            }
        ]
    },
    "ERF": {
        "desc": "该函数返回误差函数在上下限之间的积分。",
        "args": [{
                "name": "lower_limit"
            }, {
                "name": "upper_limit"
            }
        ]
    },
    "ERFC": {
        "desc": "该函数返回从 x 到 ∞（无穷）积分的 ERF 函数的补余误差函数。",
        "args": [{
                "name": "lowerlimit"
            }
        ]
    },
    "ERROR.TYPE": {
        "desc": "该函数返回对应于错误类型的数字。",
        "args": [{
                "name": "error_val"
            }
        ]
    },
    "EURO": {
        "desc": "该函数返回一欧元等价货币金额，基于ISO货币代码。",
        "args": [{
                "name": "code"
            }
        ]
    },
    "EUROCONVERT": {
        "desc": "该函数将数字转换为欧元形式，将数字由欧元形式转换为欧盟成员国货币形式，或利用欧元作为中间货币将数字由某一欧盟成员国货币转化为另一欧盟成员国货币的形式（三角转换关系）。只有采用了欧元的欧盟 (EU) 成员国货币才能进行这些转换。此函数所使用的是由欧盟 (EU) 建立的固定转换汇率。",
        "args": [{
                "name": "number"
            }, {
                "name": "source"
            }, {
                "name": "target"
            }, {
                "name": "full_precision"
            }, {
                "name": "triangulation_precision"
            }
        ]
    },
    "EVEN": {
        "desc": "该函数返回沿绝对值增大方向取整后最接近的偶数。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "EXACT": {
        "desc": "该函数用于比较两个字符串：如果它们完全相同，则返回 TRUE；否则，返回 FALSE。",
        "args": [{
                "name": "text1"
            }, {
                "name": "text2"
            }
        ]
    },
    "EXP": {
        "desc": "该函数返回 e 的 n 次方。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "EXPONDIST": {
        "desc": "该函数返回指数分布。",
        "args": [{
                "name": "value"
            }, {
                "name": "lambda"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "FACT": {
        "desc": "该函数返回数字的阶乘。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "FACTDOUBLE": {
        "desc": "该函数返回数字的双倍阶乘。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "FALSE": {
        "desc": "该函数返回逻辑值 FALSE。",
        "args": []
    },
    "FDIST": {
        "desc": "该函数返回 F 概率分布。使用此函数可以确定两个数据集是否存在变化程度上的不同。",
        "args": [{
                "name": "value"
            }, {
                "name": "deg_freedom1"
            }, {
                "name": "deg_freedom2"
            }
        ]
    },
    "FIND": {
        "desc": "该函数在一个文本值中查找另一个文本值（区分大小写）。",
        "args": [{
                "name": "find_text"
            }, {
                "name": "within_text"
            }, {
                "name": "[start_num]"
            }
        ]
    },
    "FINV": {
        "desc": "该函数返回 F 概率分布的反函数值。",
        "args": [{
                "name": "probability"
            }, {
                "name": "deg_freedom1"
            }, {
                "name": "deg_freedom2"
            }
        ]
    },
    "FISHER": {
        "desc": "该函数返回 Fisher 变换值。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "FISHERINV": {
        "desc": "该函数返回 Fisher 变换的反函数值。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "FIXED": {
        "desc": "该函数将数字按指定的小数位数进行取整，利用句号和逗号，以小数格式对该数进行格式设置，并以文本形式返回结果。",
        "args": [{
                "name": "number"
            }, {
                "name": "decimals"
            }, {
                "name": "no_commas"
            }
        ]
    },
    "FLOOR": {
        "desc": "该函数向绝对值减小的方向舍入数字。",
        "args": [{
                "name": "number"
            }, {
                "name": "significance"
            }
        ]
    },
    "FORECAST": {
        "desc": "该函数根据已有的数值计算或预测未来值。",
        "args": [{
                "name": "value"
            }, {
                "name": "Yarray"
            }, {
                "name": "Xarray"
            }
        ]
    },
    "FREQUENCY": {
        "desc": "该函数计算数值在某个区域内的出现频率，然后返回一个垂直数组。",
        "args": [{
                "name": "data_array"
            }, {
                "name": "bins_array"
            }
        ]
    },
    "FTEST": {
        "desc": "该函数返回 F 检验的结果。F 检验返回的是当数组 1 和数组 2 的方差无明显差异时的单尾概率。",
        "args": [{
                "name": "array1"
            }, {
                "name": "array2"
            }
        ]
    },
    "FV": {
        "desc": "该函数基于固定利率及等额分期付款方式，返回某项投资的未来值。",
        "args": [{
                "name": "rate"
            }, {
                "name": "numper"
            }, {
                "name": "paymt"
            }, {
                "name": "pval"
            }, {
                "name": "type"
            }
        ]
    },
    "FVSCHEDULE": {
        "desc": "该函数基于一系列复利返回本金的未来值。函数 FVSCHEDULE 用于计算某项投资在变动或可调利率下的未来值。",
        "args": [{
                "name": "principal"
            }, {
                "name": "schedule"
            }
        ]
    },
    "GAMMADIST": {
        "desc": "该函数返回 γ 分布。",
        "args": [{
                "name": "x"
            }, {
                "name": "alpha"
            }, {
                "name": "beta"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "GAMMAINV": {
        "desc": "该函数返回 γ 累积分布函数的反函数。",
        "args": [{
                "name": "probability"
            }, {
                "name": "alpha"
            }, {
                "name": "beta"
            }
        ]
    },
    "GAMMALN": {
        "desc": "该函数返回 γ 函数的自然对数，Γ(x)。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "GCD": {
        "desc": "该函数返回最大公约数。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2"
            }
        ]
    },
    "GEOMEAN": {
        "desc": "该函数返回正数数组或区域的几何平均值。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "GESTEP": {
        "desc": "该函数检验数字是否大于阈值。",
        "args": [{
                "name": "number"
            }, {
                "name": "step"
            }
        ]
    },
    "GROWTH": {
        "desc": "该函数根据现有的数据预测指数增长值。根据现有的 x 值和 y 值，GROWTH 函数返回一组新的 x 值对应的 y 值。",
        "args": [{
                "name": "y"
            }, {
                "name": "x"
            }, {
                "name": "newx"
            }, {
                "name": "constant"
            }
        ]
    },
    "HARMEAN": {
        "desc": "该函数返回调和平均值。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "HEX2BIN": {
        "desc": "该函数将十六进制数转换为二进制数。",
        "args": [{
                "name": "number"
            }, {
                "name": "places"
            }
        ]
    },
    "HEX2DEC": {
        "desc": "该函数将十六进制数转换为十进制数。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "HEX2OCT": {
        "desc": "该函数将十六进制数转换为八进制数。",
        "args": [{
                "name": "number"
            }, {
                "name": "places"
            }
        ]
    },
    "HLOOKUP": {
        "desc": "该函数查找数组的首行，并返回指定单元格的值。",
        "args": [{
                "name": "lookup_value"
            }, {
                "name": "table_array"
            }, {
                "name": "row_index_num"
            }, {
                "name": "range_lookup",
                "required": false
            }
        ]
    },
    "HOUR": {
        "desc": "返回时间值的小时数。",
        "args": [{
                "name": "time"
            }
        ]
    },
    "HYPGEOMDIST": {
        "desc": "该函数返回超几何分布。 ",
        "args": [{
                "name": "sample_s"
            }, {
                "name": "number_sample"
            }, {
                "name": "population_s"
            }, {
                "name": "number_pop"
            }
        ]
    },
    "IF": {
        "desc": "使用逻辑函数 IF 函数时，如果条件为真，该函数将返回一个值；如果条件为假，函数将返回另一个值。",
        "args": [{
                "name": "logical_test"
            }, {
                "name": "value_if_true"
            }, {
                "name": "value_if_false"
            }
        ]
    },
    "IFERROR": {
        "desc": "该函数如果公式的计算结果错误，则返回您指定的值；否则返回公式的结果。",
        "args": [{
                "name": "value"
            }, {
                "name": "value_if_error"
            }
        ]
    },
    "IMABS": {
        "desc": "该函数返回复数的绝对值（模数）。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMAGINARY": {
        "desc": "该函数返回复数的虚系数。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMARGUMENT": {
        "desc": "该函数返回参数 theta，即以弧度表示的角。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMCONJUGATE": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的复数的共轭复数。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMCOS": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的复数的余弦。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMDIV": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的两个复数的商。",
        "args": [{
                "name": "complexnum"
            }, {
                "name": "complexdenom"
            }
        ]
    },
    "IMEXP": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的复数的指数。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMLN": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的复数的自然对数。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMLOG2": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的复数的以 2 为底数的对数。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMLOG10": {
        "desc": "该函数返回以 x + yi 或 x + yj 文本格式表示的复数的常用对数（以 10 为底数）。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMPOWER": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的复数的 n 次幂。",
        "args": [{
                "name": "complexnum"
            }, {
                "name": "powernum"
            }
        ]
    },
    "IMPRODUCT": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的 1 至 29 个复数的乘积。",
        "args": [{
                "name": "complexnum1"
            }, {
                "name": "complexnum2",
                "required": true
            }
        ]
    },
    "IMREAL": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的复数的实系数。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMSIN": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的复数的正弦值。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMSQRT": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的复数的平方根。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMSUB": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的两个复数的差。",
        "args": [{
                "name": "complexnum1"
            }, {
                "name": "complexnum2"
            }
        ]
    },
    "IMSUM": {
        "desc": "该函数返回以 x+yi 或 x+yj 文本格式表示的两个或多个复数的和。",
        "args": [{
                "name": "complexnum1"
            }, {
                "name": "complexnum2",
                "required": true
            }
        ]
    },
    "INDEX": {
        "desc": "该函数返回表格或区域中的值或值。",
        "args": [{
                "name": "array"
            }, {
                "name": "row_num"
            }, {
                "name": "column_num"
            }, {
                "name": "area_num"
            }
        ]
    },
    "INDIRECT": {
        "desc": "该函数返回由文本字符串指定的引用。",
        "args": [{
                "name": "ref_text"
            }, {
                "name": "[a1_style]"
            }
        ]
    },
    "INT": {
        "desc": "该函数将数字向下舍入到最接近的整数。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "INTERCEPT": {
        "desc": "该函数利用现有的 x 值与 y 值计算并返回直线与 y 轴的截距。",
        "args": [{
                "name": "dependent"
            }, {
                "name": "independent"
            }
        ]
    },
    "INTRATE": {
        "desc": "该函数计算并返回一次性付息证券的利率。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "investment"
            }, {
                "name": "redemption"
            }, {
                "name": "basis"
            }
        ]
    },
    "IPMT": {
        "desc": "此函数基于固定利率及等额分期付款方式，返回给定期数内对投资的利息偿还额。",
        "args": [{
                "name": "rate"
            }, {
                "name": "per"
            }, {
                "name": "nper"
            }, {
                "name": "pval"
            }, {
                "name": "fval"
            }, {
                "name": "type"
            }
        ]
    },
    "IRR": {
        "desc": "该函数返回由数值代表的一组现金流的内部收益率。",
        "args": [{
                "name": "arrayvals"
            }, {
                "name": "estimate"
            }
        ]
    },
    "ISBLANK": {
        "desc": "该函数检验指定的值，表达式或者引用单元格的内容是否为空。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "ISERR": {
        "desc": "该函数检验一个值，表达式或者引用单元格的内容是否为除去 #N/A 的任意错误值。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "ISERROR": {
        "desc": "此函数检验一个值，表达式或者引用单元格的内容是否为任意错误值。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "ISEVEN": {
        "desc": "此函数检验一个值，表达式或者引用单元格的内容是否为偶数。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "ISLOGICAL": {
        "desc": "此函数检验一个值，表达式或者引用单元格的内容是否是一个逻辑值（布尔型值）。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "ISNA": {
        "desc": "此函数检验一个值，表达式或者引用单元格的内容包含值不存在（#N/A）错误值。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "ISNONTEXT": {
        "desc": "此函数检验一个值，表达式或者引用单元格的内容是否为不是文本的任意数据类型。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "ISNUMBER": {
        "desc": "此函数检验一个值，表达式或者引用单元格的内容是否是数值。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "ISODD": {
        "desc": "此函数检验一个值，表达式或者引用单元格的内容是否为奇数。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "ISPMT": {
        "desc": "此函数计算特定投资期内要支付的利息。",
        "args": [{
                "name": "rate"
            }, {
                "name": "per"
            }, {
                "name": "nper"
            }, {
                "name": "pv"
            }
        ]
    },
    "ISREF": {
        "desc": "此函数检验一个值，表达式或者引用单元格的内容是到另外单元格的引用。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "ISTEXT": {
        "desc": "此函数检验一个值，表达式或者引用单元格的内容是否是文本型数据。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "KURT": {
        "desc": "此函数返回数据集的峰值。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2"
            }, {
                "name": "number3"
            }, {
                "name": "number4",
                "required": true
            }
        ]
    },
    "LARGE": {
        "desc": "此函数返回数据集中第 n 个最大值。",
        "args": [{
                "name": "array"
            }, {
                "name": "n"
            }
        ]
    },
    "LCM": {
        "desc": "此函数返回整数的最小公倍数。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2"
            }
        ]
    },
    "LEFT": {
        "desc": "此函数返回文本字符串中第一个字符或前几个字符。",
        "args": [{
                "name": "text"
            }, {
                "name": "num_chars"
            }
        ]
    },
    "LEN": {
        "desc": "此函数返回文本字符串中的字符数。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "LINEST": {
        "desc": "此函数计算与现有数据最佳拟合的直线，来计算某直线的统计值，然后返回描述此直线的数组。",
        "args": [{
                "name": "y"
            }, {
                "name": "x"
            }, {
                "name": "constant"
            }, {
                "name": "stats"
            }
        ]
    },
    "LN": {
        "desc": "此函数返回指定数字的自然对数。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "LOG": {
        "desc": "此函数按所指定的底数，返回一个数的对数。",
        "args": [{
                "name": "number"
            }, {
                "name": "base"
            }
        ]
    },
    "LOG10": {
        "desc": "此函数返回以 10 为底的对数。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "LOGEST": {
        "desc": "此函数在回归分析中，计算最符合数据的指数回归拟合曲线，并返回描述该曲线的数值数组。",
        "args": [{
                "name": "y"
            }, {
                "name": "x"
            }, {
                "name": "constant"
            }, {
                "name": "stats"
            }
        ]
    },
    "LOGINV": {
        "desc": "此函数返回 x 的对数累积分布函数的反函数，此处的 LN(x) 是含有 mean 与 stdev 参数的正态分布。",
        "args": [{
                "name": "probability"
            }, {
                "name": "mean"
            }, {
                "name": "standard_dev"
            }
        ]
    },
    "LOGNORMDIST": {
        "desc": "此函数返回 x 的对数累积分布函数，其中 ln(x) 是服从参数 mean 和 stdev 的正态分布。使用此函数可以分析经过对数变换的数据。",
        "args": [{
                "name": "x"
            }, {
                "name": "mean"
            }, {
                "name": "standard_dev"
            }
        ]
    },
    "LOOKUP": {
        "desc": "此函数可从单行或单列区域或者从一个数组返回值。LOOKUP 函数具有两种语法形式：向量形式和数组形式。",
        "args": [{
                "name": "lookup_value"
            }, {
                "name": "lookup_vector"
            }, {
                "name": "result_vector"
            }
        ]
    },
    "LOWER": {
        "desc": "此函数将一个文本字符串中的所有大写字母转换为小写字母。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "MATCH": {
        "desc": "此函数返回指定值在单元格区域中的相对位置。",
        "args": [{
                "name": "lookup_value"
            }, {
                "name": "lookup_array"
            }, {
                "name": "match_type"
            }
        ]
    },
    "XMATCH": {
        "desc": "此函数返回项目在数组中的相对位置。默认情况下，需要精确匹配。",
        "args": [{
                "name": "lookup_value"
            }, {
                "name": "lookup_array"
            }, {
                "name": "match_mode",
                "required": false
            }, {
                "name": "search_mode",
                "required": false
            }
        ]
    },
    "XLOOKUP": {
        "desc": "在某个范围或数组中搜索匹配项，并通过第二个范围或数组返回相应的项。默认情况下使用精确匹配。",
        "args": [{
                "name": "lookup_value"
            }, {
                "name": "lookup_array"
            }, {
                "name": "return_array"
            }, {
                "name": "[if_not_found]"
            }, {
                "name": "match_mode",
                "required": false
            }, {
                "name": "search_mode",
                "required": false
            }
        ]
    },
    "MAX": {
        "desc": "此函数返回一组值中的最大值。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "MAXA": {
        "desc": "此函数返回参数列表中的最大值。",
        "args": [{
                "name": "value1"
            }, {
                "name": "value2",
                "required": true
            }
        ]
    },
    "MDETERM": {
        "desc": "此函数返回一个数组的矩阵行列式的值。",
        "args": [{
                "name": "array"
            }
        ]
    },
    "MDURATION": {
        "desc": "此函数返回假设面值 ￥100 的有价证券的 Macauley 修正期限。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "coupon"
            }, {
                "name": "yield"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "MEDIAN": {
        "desc": "此函数返回给定数值的中值。中值是在一组数值中居于中间的数值。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "MID": {
        "desc": "此函数返回文本字符串中从指定位置开始的特定数目的字符，该数目由用户指定。",
        "args": [{
                "name": "text"
            }, {
                "name": "start_num"
            }, {
                "name": "num_chars"
            }
        ]
    },
    "MIN": {
        "desc": "此函数返回一组值中的最小值。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "MINA": {
        "desc": "此函数返回一组包含文本和逻辑值的值中的最小值。",
        "args": [{
                "name": "value1"
            }, {
                "name": "value2",
                "required": true
            }
        ]
    },
    "MINUTE": {
        "desc": "此函数返回时间值中的分钟。为一个介于 0 到 59 之间的整数。",
        "args": [{
                "name": "time"
            }
        ]
    },
    "MINVERSE": {
        "desc": "此函数返回数组中存储的矩阵的逆距阵。",
        "args": [{
                "name": "array"
            }
        ]
    },
    "MIRR": {
        "desc": "此函数返回某一连续期间内现金流的修正内部收益率。 函数 MIRR 同时考虑了投资的成本和现金再投资的收益率。",
        "args": [{
                "name": "values"
            }, {
                "name": "finance_rate"
            }, {
                "name": "reinvest_rate"
            }
        ]
    },
    "MMULT": {
        "desc": "此函数返回两个数组的矩阵乘积。",
        "args": [{
                "name": "array1"
            }, {
                "name": "array2"
            }
        ]
    },
    "MOD": {
        "desc": "此函数返回两数相除的余数。",
        "args": [{
                "name": "dividend"
            }, {
                "name": "divisor"
            }
        ]
    },
    "MODE": {
        "desc": "此函数返回在某一数组或数据区域中出现频率最多的数值。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "MONTH": {
        "desc": "此函数返回以序列号表示的日期中的月份。",
        "args": [{
                "name": "date"
            }
        ]
    },
    "MROUND": {
        "desc": "此函数返回参数按指定基数舍入后的数值。",
        "args": [{
                "name": "number"
            }, {
                "name": "multiple"
            }
        ]
    },
    "MULTINOMIAL": {
        "desc": "此函数返回参数和的阶乘与各参数阶乘乘积的比值。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "MUNIT": {
        "desc": "此函数返回指定维度的单位矩阵。",
        "args": [{
                "name": "dimension"
            }
        ]
    },
    "N": {
        "desc": "此函数返回转化为数值后的值。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "NA": {
        "desc": "此函数返回错误值 #N/A。错误值 #N/A 表示“无法得到有效值”。",
        "args": []
    },
    "SHEET": {
        "desc": "返回引用工作表的工作表编号。",
        "args": [{
                "name": "[value]"
            }
        ]
    },
    "SHEETS": {
        "desc": "返回引用中的工作表数。",
        "args": [{
                "name": "[reference]"
            }
        ]
    },
    "NEGBINOMDIST": {
        "desc": "此函数返回负二项式分布。",
        "args": [{
                "name": "number_f"
            }, {
                "name": "number_s"
            }, {
                "name": "probability_s"
            }
        ]
    },
    "NETWORKDAYS": {
        "desc": "此函数返回参数开始日期和结束日期之间完整的工作日数值。 工作日不包括周末和专门指定的假期。",
        "args": [{
                "name": "start_date"
            }, {
                "name": "end_date"
            }, {
                "name": "holidays"
            }
        ]
    },
    "NOMINAL": {
        "desc": "此函数基于给定的实际利率和年复利期数，返回名义年利率。",
        "args": [{
                "name": "effect_rate"
            }, {
                "name": "npery"
            }
        ]
    },
    "NORMDIST": {
        "desc": "此函数返回指定平均值和标准偏差的正态分布函数。 此函数在统计方面应用范围广泛（包括假设检验）。",
        "args": [{
                "name": "x"
            }, {
                "name": "mean"
            }, {
                "name": "standard_dev"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "NORMINV": {
        "desc": "此函数返回指定平均值和标准偏差的正态累积分布函数的反函数。",
        "args": [{
                "name": "probability"
            }, {
                "name": "mean"
            }, {
                "name": "standard_dev"
            }
        ]
    },
    "NORMSDIST": {
        "desc": "此函数返回标准正态累积分布函数。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "NORMSINV": {
        "desc": "此函数返回标准正态累积分布函数的反函数。该分布的平均值为 0，标准偏差为 1。",
        "args": [{
                "name": "probability"
            }
        ]
    },
    "NOT": {
        "desc": "此函数对参数值求反。当要确保一个值不等于某一特定值时，可以使用 NOT 函数。",
        "args": [{
                "name": "logical"
            }
        ]
    },
    "NOW": {
        "desc": "此函数返回当前的日期和时间。",
        "args": []
    },
    "NPER": {
        "desc": "此函数基于固定利率及等额分期付款方式，返回某项投资的总期数。",
        "args": [{
                "name": "rate"
            }, {
                "name": "paymt"
            }, {
                "name": "pval"
            }, {
                "name": "fval"
            }, {
                "name": "type"
            }
        ]
    },
    "NPV": {
        "desc": "此函数通过使用贴现率以及一系列未来支出（负值）和收入（正值），返回一项投资的净现值。",
        "args": [{
                "name": "rate"
            }, {
                "name": "value1"
            }, {
                "name": "value2",
                "required": true
            }
        ]
    },
    "OBJECT": {
        "desc": "此函数将属性以及表达式的组合序列转换为对象。",
        "args": [{
                "name": "property1",
                "required": true
            }, {
                "name": "expression1",
                "required": true
            }
        ]
    },
    "OCT2BIN": {
        "desc": "此函数将八进制数转换为二进制数。",
        "args": [{
                "name": "number"
            }, {
                "name": "places"
            }
        ]
    },
    "OCT2DEC": {
        "desc": "此函数将八进制数转换为十进制数。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "OCT2HEX": {
        "desc": "此函数将八进制数转换为十六进制数。",
        "args": [{
                "name": "number"
            }, {
                "name": "places"
            }
        ]
    },
    "ODD": {
        "desc": "此函数返回对指定数值进行向上舍入后的奇数。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "ODDFPRICE": {
        "desc": "此函数返回首期付息日不固定（长期或短期）的面值 ￥100 的有价证券价格。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "issue"
            }, {
                "name": "first_coupon"
            }, {
                "name": "rate"
            }, {
                "name": "yield"
            }, {
                "name": "redemption"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "ODDFYIELD": {
        "desc": "此函数返回首期付息日不固定的有价证券（长期或短期）的收益率。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "issue"
            }, {
                "name": "first_coupon"
            }, {
                "name": "rate"
            }, {
                "name": "price"
            }, {
                "name": "redemption"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "ODDLPRICE": {
        "desc": "T此函数返回末期付息日不固定的面值 ￥100 的有价证券（长期或短期）的价格。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "last_interest"
            }, {
                "name": "rate"
            }, {
                "name": "yield"
            }, {
                "name": "redemption"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "ODDLYIELD": {
        "desc": "此函数返回末期付息日不固定的有价证券（长期或短期）的收益率。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "last_interest"
            }, {
                "name": "rate"
            }, {
                "name": "price"
            }, {
                "name": "redemption"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "OFFSET": {
        "desc": "此函数以指定的引用为参照系，通过给定偏移量得到新的引用。 返回的引用可以为一个单元格或单元格区域。并可以指定返回的行数或列数。",
        "args": [{
                "name": "reference"
            }, {
                "name": "rows"
            }, {
                "name": "cols"
            }, {
                "name": "height"
            }, {
                "name": "width"
            }
        ]
    },
    "OR": {
        "desc": "此函数在其参数组中，任何一个参数逻辑值为 TRUE，即返回 TRUE； 所有参数的逻辑值为 FALSE，即返回 FALSE。",
        "args": [{
                "name": "logical1"
            }, {
                "name": "logical2",
                "required": true
            }
        ]
    },
    "PEARSON": {
        "desc": "此函数返回 Pearson（皮尔生）乘积矩相关系数 r，这是一个范围在 -1.0 到 1.0 之间（包括 -1.0 和 1.0 在内）的无量纲指数，反映了两个数据集合之间的线性相关程度。 ",
        "args": [{
                "name": "array_ind"
            }, {
                "name": "array_dep"
            }
        ]
    },
    "PERCENTILE": {
        "desc": "此函数 返回区域中数值的第 n 个百分点的值。",
        "args": [{
                "name": "array"
            }, {
                "name": "n"
            }
        ]
    },
    "PERCENTRANK": {
        "desc": "此函数返回特定数值在一个数据集中的百分比排位。",
        "args": [{
                "name": "array"
            }, {
                "name": "x"
            }, {
                "name": "significance"
            }
        ]
    },
    "PERMUT": {
        "desc": "此函数返回从给定数目的对象集合中选取的若干对象的排列数。",
        "args": [{
                "name": "number"
            }, {
                "name": "number_chosen"
            }
        ]
    },
    "PI": {
        "desc": "此函数返回 PI 值 3.1415926536。",
        "args": []
    },
    "PMT": {
        "desc": "此函数返回在固定利率下,贷款的等额分期偿还额",
        "args": [{
                "name": "rate"
            }, {
                "name": "nper"
            }, {
                "name": "pval"
            }, {
                "name": "fval"
            }, {
                "name": "type"
            }
        ]
    },
    "POISSON": {
        "desc": "此函数返回泊松分布。",
        "args": [{
                "name": "nevents"
            }, {
                "name": "mean"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "POWER": {
        "desc": "此函数返回给定数字的乘幂。",
        "args": [{
                "name": "number"
            }, {
                "name": "power"
            }
        ]
    },
    "PPMT": {
        "desc": "此函数基于固定利率及等额分期付款方式，返回投资在某一给定期间内的本金偿还额。",
        "args": [{
                "name": "rate"
            }, {
                "name": "per"
            }, {
                "name": "nper"
            }, {
                "name": "pval"
            }, {
                "name": "fval"
            }, {
                "name": "type"
            }
        ]
    },
    "PRICE": {
        "desc": "此函数返回定期付息的面值 ￥100 的有价证券的价格。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "rate"
            }, {
                "name": "yield"
            }, {
                "name": "redemption"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "PRICEDISC": {
        "desc": "此函数返回折价发行的面值 ￥100 的有价证券的价格。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "discount"
            }, {
                "name": "redemption"
            }, {
                "name": "basis"
            }
        ]
    },
    "PRICEMAT": {
        "desc": "此函数返回到期付息的面值 ￥100 的有价证券的价格。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "issue"
            }, {
                "name": "rate"
            }, {
                "name": "yield"
            }, {
                "name": "basis"
            }
        ]
    },
    "PROB": {
        "desc": "此函数返回区域中的数值落在指定区间内的概率。",
        "args": [{
                "name": "x_range"
            }, {
                "name": "prob_range"
            }, {
                "name": "lower_limit"
            }, {
                "name": "upper_limit"
            }
        ]
    },
    "PRODUCT": {
        "desc": "此函数可计算用作参数的所有数字的乘积，然后返回乘积。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "PROPER": {
        "desc": "此函数将文本字符串的首字母及任何非字母字符之后的首字母转换成大写。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "PROPERTY": {
        "desc": "此函数根据对象中属性的路径返回该属性对应的值。",
        "args": [{
                "name": "data_expression"
            }, {
                "name": "property_path"
            }
        ]
    },
    "PV": {
        "desc": "此函数返回投资的现值。现值为一系列未来付款的当前值的累积和。例如，借入方的借入款即为贷出方贷款的现值。",
        "args": [{
                "name": "rate"
            }, {
                "name": "numper"
            }, {
                "name": "paymt"
            }, {
                "name": "fval"
            }, {
                "name": "type"
            }
        ]
    },
    "QUARTILE": {
        "desc": "此函数返回数据集的四分位数。",
        "args": [{
                "name": "array"
            }, {
                "name": "quart"
            }
        ]
    },
    "QUOTIENT": {
        "desc": "此函数返回商的整数部分，该函数可用于舍掉商的小数部分。",
        "args": [{
                "name": "numerator"
            }, {
                "name": "denominator"
            }
        ]
    },
    "RADIANS": {
        "desc": "此函数将角度转换为弧度。",
        "args": [{
                "name": "angle"
            }
        ]
    },
    "RAND": {
        "desc": "此函数返回大于等于 0 及小于 1 的均匀分布随机实数。",
        "args": []
    },
    "RANDBETWEEN": {
        "desc": "此函数返回位于指定的两个数之间的一个随机整数。",
        "args": [{
                "name": "bottom"
            }, {
                "name": "top"
            }
        ]
    },
    "RANGEBLOCKSPARKLINE": {
        "desc": "此函数返回一个用于描绘区域模板迷你图的数据集。",
        "args": [{
                "name": "template_range"
            }, {
                "name": "data_expression"
            }
        ]
    },
    "RANK": {
        "desc": "此函数返回一个数字在数字列表中的排位。数字的排位是其大小与列表中其他值的比值（如果列表已排过序，则数字的排位就是它当前的位置）。",
        "args": [{
                "name": "number"
            }, {
                "name": "ref"
            }, {
                "name": "order"
            }
        ]
    },
    "RATE": {
        "desc": "此函数返回年金的各期利率。",
        "args": [{
                "name": "nper"
            }, {
                "name": "pmt"
            }, {
                "name": "pval"
            }, {
                "name": "fval"
            }, {
                "name": "type"
            }, {
                "name": "guess"
            }
        ]
    },
    "RECEIVED": {
        "desc": "此函数返回一次性付息的有价证券到期收回的金额。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "investment"
            }, {
                "name": "discount"
            }, {
                "name": "basis"
            }
        ]
    },
    "REPLACE": {
        "desc": "此函数使用其他文本字符串并根据所指定的字符数替换某文本字符串中的部分文本。",
        "args": [{
                "name": "old_text"
            }, {
                "name": "start_num"
            }, {
                "name": "num_chars"
            }, {
                "name": "new_text"
            }
        ]
    },
    "REPT": {
        "desc": "此函数按照给定的次数重复显示文本。",
        "args": [{
                "name": "text"
            }, {
                "name": "number_times"
            }
        ]
    },
    "RIGHT": {
        "desc": "此函数根据所指定的字符数返回文本字符串中最后一个或多个字符。",
        "args": [{
                "name": "text"
            }, {
                "name": "num_chars"
            }
        ]
    },
    "ROMAN": {
        "desc": "此函数将阿拉伯数字转换为其等价的文本形式的罗马数字。",
        "args": [{
                "name": "number"
            }, {
                "name": "form"
            }
        ]
    },
    "ROUND": {
        "desc": "此函数可将某个数字四舍五入为指定的位数。",
        "args": [{
                "name": "number"
            }, {
                "name": "num_digits"
            }
        ]
    },
    "ROUNDDOWN": {
        "desc": "此函数靠近零值，向下（绝对值减小的方向）舍入数字。",
        "args": [{
                "name": "number"
            }, {
                "name": "num_digits"
            }
        ]
    },
    "ROUNDUP": {
        "desc": "此函数远离零值，向上舍入数字。",
        "args": [{
                "name": "number"
            }, {
                "name": "num_digits"
            }
        ]
    },
    "ROW": {
        "desc": "此函数返回引用的行号。",
        "args": [{
                "name": "reference"
            }
        ]
    },
    "ROWS": {
        "desc": "此函数返回引用或数组的行数。",
        "args": [{
                "name": "array"
            }
        ]
    },
    "RSQ": {
        "desc": "此函数返回根据 y s 和 x s 中数据点计算得出的 Pearson 乘积矩相关系数的平方。",
        "args": [{
                "name": "array_dep"
            }, {
                "name": "array_ind"
            }
        ]
    },
    "SEARCH": {
        "desc": "此函数在一个文本值中查找另一个文本值并返回第一个文本字符串的起始位置的编号，该编号从第二个文本字符串的第一个字符算起。",
        "args": [{
                "name": "find_text"
            }, {
                "name": "within_text"
            }, {
                "name": {
                    "databaseNames": ["DAVERAGE", "DCOUNT", "DCOUNTA", "DGET", "DMAX", "DMIN", "DPRODUCT", "DSTDEV", "DSTDEVP", "DSUM", "DVAR", "DVARP"],
                    "webNames": ["ENCODEURL", "FILTERJSON", "WEBSERVICE"],
                    "dateAndTimeNames": ["DATE", "DATEDIF", "DATEVALUE", "DAY", "DAYS", "DAYS360", "EDATE", "EOMONTH", "HOUR", "ISOWEEKNUM", "MINUTE", "MONTH", "NETWORKDAYS", "NETWORKDAYS.INTL", "NOW", "SECOND", "TIME", "TIMEVALUE", "TODAY", "WEEKDAY", "WEEKNUM", "WORKDAY", "WORKDAY.INTL", "YEAR", "YEARFRAC"],
                    "engineeringNames": ["BESSELI", "BESSELJ", "BESSELK", "BESSELY", "BIN2DEC", "BIN2HEX", "BIN2OCT", "BITAND", "BITLSHIFT", "BITOR", "BITRSHIFT", "BITXOR", "COMPLEX", "CONVERT", "DEC2BIN", "DEC2HEX", "DEC2OCT", "DELTA", "ERF", "ERFC", "ERF.PRECISE", "ERFC.PRECISE", "GESTEP", "HEX2BIN", "HEX2DEC", "HEX2OCT", "IMABS", "IMAGINARY", "IMARGUMENT", "IMCONJUGATE", "IMCOS", "IMDIV", "IMEXP", "IMLN", "IMLOG10", "IMLOG2", "IMPOWER", "IMPRODUCT", "IMREAL", "IMSIN", "IMSQRT", "IMSUB", "IMSUM", "IMCOSH", "IMCOT", "IMCSC", "IMCSCH", "IMSEC", "IMSECH", "IMSINH", "IMTAN", "OCT2BIN", "OCT2DEC", "OCT2HEX"],
                    "financialNames": ["ACCRINT", "ACCRINTM", "AMORDEGRC", "AMORLINC", "COUPDAYBS", "COUPDAYS", "COUPDAYSNC", "COUPNCD", "COUPNUM", "COUPPCD", "CUMIPMT", "CUMPRINC", "DB", "DDB", "DISC", "DOLLARDE", "DOLLARFR", "DURATION", "EFFECT", "FV", "FVSCHEDULE", "INTRATE", "IPMT", "IRR", "ISPMT", "MDURATION", "MIRR", "NOMINAL", "NPER", "NPV", "ODDFPRICE", "ODDFYIELD", "ODDLPRICE", "ODDLYIELD", "EURO", "EUROCONVERT", "PMT", "PPMT", "PRICE", "PRICEDISC", "PRICEMAT", "PV", "PDURATION", "RRI", "RATE", "RECEIVED", "SLN", "SYD", "TBILLEQ", "TBILLPRICE", "TBILLYIELD", "VDB", "XIRR", "XNPV", "YIELD", "YIELDDISC", "YIELDMAT"],
                    "informationNames": ["ERROR.TYPE", "ISBLANK", "ISERR", "ISERROR", "ISEVEN", "ISLOGICAL", "ISFORMULA", "ISNA", "ISNONTEXT", "ISNUMBER", "ISODD", "ISOMITTED", "ISREF", "ISTEXT", "N", "NA", "SHEET", "SHEETS", "TYPE"],
                    "logicalNames": ["AND", "FALSE", "IF", "IFERROR", "IFNA", "IFS", "LAMBDA", "NOT", "OR", "SWITCH", "TRUE", "XOR"],
                    "logicalNamesWhenAllowDynamicArray": ["AND", "BYCOL", "BYROW", "FALSE", "IF", "IFERROR", "IFNA", "IFS", "LAMBDA", "MAKEARRAY", "MAP", "NOT", "OR", "REDUCE", "SCAN", "SWITCH", "TRUE", "XOR"],
                    "lookupAndReferenceNames": ["ADDRESS", "AREAS", "CHOOSE", "COLUMN", "COLUMNS", "FORMULATEXT", "HLOOKUP", "HYPERLINK", "INDEX", "INDIRECT", "LOOKUP", "MATCH", "OFFSET", "ROW", "ROWS", "TRANSPOSE", "VLOOKUP", "XLOOKUP", "XMATCH"],
                    "lookupAndReferenceNamesEx": ["CHOOSECOLS", "CHOOSEROWS", "DROP", "EXPAND", "FILTER", "HSTACK", "SORT", "SORTBY", "TAKE", "TOCOL", "TOROW", "UNIQUE", "VSTACK", "WRAPCOLS", "WRAPROWS"],
                    "mathAndTrigonometryNames": ["ABS", "ACOS", "ACOSH", "ACOT", "ACOTH", "AGGREGATE", "ARABIC", "ASIN", "ASINH", "ATAN", "ATAN2", "ATANH", "BASE", "CEILING", "CEILING.MATH", "CEILING.PRECISE", "COMBIN", "COMBINA", "COS", "COSH", "COT", "COTH", "CSC", "CSCH", "DECIMAL", "DEGREES", "EVEN", "EXP", "FACT", "FACTDOUBLE", "FLOOR", "FLOOR.MATH", "FLOOR.PRECISE", "GCD", "INT", "ISO.CEILING", "LCM", "LN", "LOG", "LOG10", "MDETERM", "MINVERSE", "MMULT", "MOD", "MROUND", "MULTINOMIAL", "ODD", "PI", "POWER", "PRODUCT", "QUOTIENT", "RADIANS", "RAND", "RANDBETWEEN", "ROMAN", "ROUND", "ROUNDDOWN", "ROUNDUP", "SEC", "SECH", "SERIESSUM", "SIGN", "SIN", "SINH", "SQRT", "SQRTPI", "SUBTOTAL", "SUM", "SUMIF", "SUMIFS", "SUMPRODUCT", "SUMSQ", "SUMX2MY2", "SUMX2PY2", "SUMXMY2", "TAN", "TANH", "TRUNC"],
                    "mathAndTrigonometryNamesEx": ["RANDARRAY", "SEQUENCE"],
                    "statisticalNames": ["AVEDEV", "AVERAGE", "AVERAGEA", "AVERAGEIF", "AVERAGEIFS", "BETADIST", "BETAINV", "BETA.DIST", "BETA.INV", "BINOMDIST", "BINOM.DIST", "BINOM.DIST.RANGE", "BINOM.INV", "CHIDIST", "CHIINV", "CHITEST", "CHISQ.DIST", "CHISQ.DIST.RT", "CHISQ.INV", "CHISQ.INV.RT", "CHISQ.TEST", "CONFIDENCE", "CONFIDENCE.NORM", "CONFIDENCE.T", "CORREL", "COUNT", "COUNTA", "COUNTBLANK", "COUNTIF", "COUNTIFS", "COVAR", "COVARIANCE.P", "COVARIANCE.S", "CRITBINOM", "DEVSQ", "EXPONDIST", "EXPON.DIST", "FDIST", "FINV", "FISHER", "FISHERINV", "FORECAST", "FREQUENCY", "FTEST", "F.DIST", "F.DIST.RT", "F.INV", "F.INV.RT", "F.TEST", "GAMMADIST", "GAMMAINV", "GAMMALN", "GEOMEAN", "GROWTH", "GAMMA", "GAMMA.DIST", "GAMMA.INV", "GAMMALN.PRECISE", "GAUSS", "HARMEAN", "HYPGEOMDIST", "HYPGEOM.DIST", "INTERCEPT", "KURT", "LARGE", "LINEST", "LOGEST", "LOGINV", "LOGNORMDIST", "LOGNORM.DIST", "LOGNORM.INV", "MAX", "MAXA", "MAXIFS", "MEDIAN", "MIN", "MINA", "MINIFS", "MODE", "MODE.MULT", "MODE.SNGL", "NEGBINOMDIST", "NEGBINOM.DIST", "NORMDIST", "NORMINV", "NORMSDIST", "NORMSINV", "NORM.DIST", "NORM.INV", "NORM.S.DIST", "NORM.S.INV", "PEARSON", "PERCENTILE", "PERCENTRANK", "PERMUT", "PERCENTILE.EXC", "PERCENTILE.INC", "PERCENTRANK.EXC", "PERCENTRANK.INC", "PERMUTATIONA", "PHI", "POISSON", "POISSON.DIST", "PROB", "QUARTILE", "QUARTILE.EXC", "QUARTILE.INC", "RANK", "RANK.AVG", "RANK.EQ", "RSQ", "SKEW", "SKEW.P", "SLOPE", "SMALL", "STANDARDIZE", "STDEV", "STDEVA", "STDEVP", "STDEVPA", "STDEV.P", "STDEV.S", "STEYX", "TDIST", "TINV", "TREND", "TRIMMEAN", "TTEST", "T.DIST", "T.DIST.2T", "T.DIST.RT", "T.INV", "T.INV.2T", "T.TEST", "VAR", "VARA", "VARP", "VARPA", "VAR.P", "VAR.S", "WEIBULL", "WEIBULL.DIST", "ZTEST", "Z.TEST"]
                }
            }
        ]
    },
    "SECOND": {
        "desc": "此函数返回时间值的秒数。返回的秒数为 0 到 59 之间的整数。",
        "args": [{
                "name": "time"
            }
        ]
    },
    "SERIESSUM": {
        "desc": "此函数返回幂级数之和。",
        "args": [{
                "name": "x"
            }, {
                "name": "n"
            }, {
                "name": "m"
            }, {
                "name": "coefficients"
            }
        ]
    },
    "SIGN": {
        "desc": "此函数返回数字的符号。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "SIN": {
        "desc": "此函数返回给定角度的正弦值。",
        "args": [{
                "name": "angle"
            }
        ]
    },
    "SINH": {
        "desc": "此函数返回某一数字的双曲正弦值。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "SKEW": {
        "desc": "此函数返回分布的不对称度。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "SLN": {
        "desc": "此函数返回某项资产在一个期间中的线性折旧值。",
        "args": [{
                "name": "cost"
            }, {
                "name": "salvage"
            }, {
                "name": "life"
            }
        ]
    },
    "SLOPE": {
        "desc": "此函数返回根据 array_dep 和 array_ind 中的数据点拟合的线性回归直线的斜率。",
        "args": [{
                "name": "array_dep"
            }, {
                "name": "array_ind"
            }
        ]
    },
    "SMALL": {
        "desc": "此函数返回数据集中第 n 个最小值。",
        "args": [{
                "name": "array"
            }, {
                "name": "n"
            }
        ]
    },
    "SQRT": {
        "desc": "此函数返回正平方根。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "SQRTPI": {
        "desc": "此函数返回某数与 pi 的乘积的平方根。",
        "args": [{
                "name": "multiple"
            }
        ]
    },
    "STANDARDIZE": {
        "desc": "此函数返回以 mean 为平均值，以 stdev 为标准偏差的分布的正态化数值。",
        "args": [{
                "name": "x"
            }, {
                "name": "mean"
            }, {
                "name": "standard_dev"
            }
        ]
    },
    "STDEVA": {
        "desc": "此函数基于样本（包括数字、文本和逻辑值）估算标准偏差。",
        "args": [{
                "name": "value1"
            }, {
                "name": "value2",
                "required": true
            }
        ]
    },
    "STDEVP": {
        "desc": "此函数基于整个样本总体计算标准偏差。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "STDEVPA": {
        "desc": "此函数基于总体（包括数字、文本和逻辑值）计算标准偏差。",
        "args": [{
                "name": "value1"
            }, {
                "name": "value2",
                "required": true
            }
        ]
    },
    "STEYX": {
        "desc": "此函数返回通过线性回归法计算每个 x 的 y 预测值时所产生的标准误差。 标准误差用来度量根据单个 x 变量计算出的 y 预测值的误差量。",
        "args": [{
                "name": "array_dep"
            }, {
                "name": "array_ind"
            }
        ]
    },
    "SUBSTITUTE": {
        "desc": "此函数在文本字符串中用新文本替换旧文本。",
        "args": [{
                "name": "text"
            }, {
                "name": "old_text"
            }, {
                "name": "new_text"
            }, {
                "name": "instance_num"
            }
        ]
    },
    "SUBTOTAL": {
        "desc": "此函数返回列表或数据库中的分类汇总。",
        "args": [{
                "name": "function_num"
            }, {
                "name": "ref1"
            }, {
                "name": "ref2",
                "required": true
            }
        ]
    },
    "SUM": {
        "desc": "此函数返回某一单元格区域中所有数字之和。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "SUMIF": {
        "desc": "此函数按给定条件对指定单元格求和。",
        "args": [{
                "name": "range"
            }, {
                "name": "criteria"
            }, {
                "name": "sum_range"
            }
        ]
    },
    "SUMIFS": {
        "desc": "此函数对区域中满足多个条件的单元格求和。",
        "args": [{
                "name": "sum_range"
            }, {
                "name": "criteria_range1"
            }, {
                "name": "criteria1"
            }, {
                "name": "criteria_range2",
                "required": true
            }, {
                "name": "criteria2",
                "required": true
            }
        ]
    },
    "SUMPRODUCT": {
        "desc": "此函数在给定的几组数组中，将数组间对应的元素相乘，并返回乘积之和。",
        "args": [{
                "name": "array1"
            }, {
                "name": "array2",
                "required": true
            }
        ]
    },
    "SUMSQ": {
        "desc": "此函数返回参数的平方和。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "SUMX2MY2": {
        "desc": "此函数返回两数组中对应数值的平方差之和。",
        "args": [{
                "name": "array_x"
            }, {
                "name": "array_y"
            }
        ]
    },
    "SUMX2PY2": {
        "desc": "此函数返回两数组中对应数值的平方和之和。",
        "args": [{
                "name": "array_x"
            }, {
                "name": "array_y"
            }
        ]
    },
    "SUMXMY2": {
        "desc": "此函数返回两数组中对应数值之差的平方和。",
        "args": [{
                "name": "array_x"
            }, {
                "name": "array_y"
            }
        ]
    },
    "SYD": {
        "desc": "此函数返回某项资产按年限总和折旧法计算的指定期间的折旧值。",
        "args": [{
                "name": "cost"
            }, {
                "name": "salvage"
            }, {
                "name": "life"
            }, {
                "name": "period"
            }
        ]
    },
    "T": {
        "desc": "此函数返回指定单元格的文本。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "TAN": {
        "desc": "此函数返回给定角度的正切值。",
        "args": [{
                "name": "angle"
            }
        ]
    },
    "TANH": {
        "desc": "此函数返回某一数字的双曲正切。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "TBILLEQ": {
        "desc": "此函数返回国库券的等效收益率。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "discount"
            }
        ]
    },
    "TBILLPRICE": {
        "desc": "此函数返回面值 ￥100 的国库券的价格。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "discount"
            }
        ]
    },
    "TBILLYIELD": {
        "desc": "此函数返回国库券的收益率。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "priceper"
            }
        ]
    },
    "TDIST": {
        "desc": "此函数返回 t 分布的百分点（概率）。",
        "args": [{
                "name": "x"
            }, {
                "name": "deg_freedom"
            }, {
                "name": "tails"
            }
        ]
    },
    "TEXT": {
        "desc": "此函数格式化一个数值并将其转换成文本。",
        "args": [{
                "name": "value"
            }, {
                "name": "format_text"
            }
        ]
    },
    "TIME": {
        "desc": "此函数返回指定时间的时间间隔对象。",
        "args": [{
                "name": "hour"
            }, {
                "name": "minute"
            }, {
                "name": "second"
            }
        ]
    },
    "TIMEVALUE": {
        "desc": "此函数返回由文本字符串所代表的时间的时间间隔对象值。",
        "args": [{
                "name": "time_text"
            }
        ]
    },
    "TINV": {
        "desc": "此函数返回作为概率和自由度函数的学生 t 分布的 t 值。",
        "args": [{
                "name": "probability"
            }, {
                "name": "deg_freedom"
            }
        ]
    },
    "TODAY": {
        "desc": "此函数返回当前的日期和时间。",
        "args": []
    },
    "TRANSPOSE": {
        "desc": "此函数 TRANSPOSE 函数可返回转置单元格区域，即将行单元格区域转置成列单元格区域，反之亦然。",
        "args": [{
                "name": "array"
            }
        ]
    },
    "TREND": {
        "desc": "此函数返回一条线性回归拟合线的值。 即找到适合已知数组 y s 和 x s 的直线（用最小二乘法）， 并返回指定数组 newx s 在直线上对应的 y 值。",
        "args": [{
                "name": "y"
            }, {
                "name": "x"
            }, {
                "name": "newx"
            }, {
                "name": "constant"
            }
        ]
    },
    "TRIM": {
        "desc": "此函数除了单词之间的单个空格外，清除文本中所有的空格。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "TRIMMEAN": {
        "desc": "此函数返回数据集的内部平均值。函数 TRIMMEAN 先从数据集的头部和尾部除去一定百分比的数据点，然后再求平均值。",
        "args": [{
                "name": "array"
            }, {
                "name": "percent"
            }
        ]
    },
    "TRUE": {
        "desc": "此函数返回逻辑值 TRUE。",
        "args": []
    },
    "TRUNC": {
        "desc": "此函数将指定数字的小数部分截去，返回整数。",
        "args": [{
                "name": "number"
            }, {
                "name": "num_digits"
            }
        ]
    },
    "TTEST": {
        "desc": "此函数返回与学生 t 检验相关的概率。",
        "args": [{
                "name": "array1"
            }, {
                "name": "array2"
            }, {
                "name": "tails"
            }, {
                "name": "type"
            }
        ]
    },
    "TYPE": {
        "desc": "此函数返回数值的类型。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "UPPER": {
        "desc": "此函数将文本转换为大写形式。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "VALUE": {
        "desc": "此函数将代表数字的文本字符串转换成数字。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "VAR": {
        "desc": "此函数计算基于给定样本的方差。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "VARA": {
        "desc": "此函数基于样本（包括数字、文本和逻辑值）估算方差。",
        "args": [{
                "name": "value1"
            }, {
                "name": "value2",
                "required": true
            }
        ]
    },
    "VARP": {
        "desc": "此函数计算基于整个样本总体的方差。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "VARPA": {
        "desc": "此函数计算基于总体（包括数字、文本和逻辑值）估算方差",
        "args": [{
                "name": "value1"
            }, {
                "name": "value2",
                "required": true
            }
        ]
    },
    "VDB": {
        "desc": "此函数使用双倍余额递减法或其他指定的方法，返回指定的任何期间内（包括部分期间）的资产折旧值。函数 VDB 代表可变余额递减法。",
        "args": [{
                "name": "cost"
            }, {
                "name": "salvage"
            }, {
                "name": "life"
            }, {
                "name": "start_period"
            }, {
                "name": "end_period"
            }, {
                "name": "factor"
            }, {
                "name": "no_switch"
            }
        ]
    },
    "VLOOKUP": {
        "desc": "此函数在表格数组的首列查找指定的值，并由此返回表格数组当前行中其他列的值。",
        "args": [{
                "name": "lookup_value"
            }, {
                "name": "table_array"
            }, {
                "name": "col_index_num"
            }, {
                "name": "range_lookup",
                "required": false
            }
        ]
    },
    "WEEKDAY": {
        "desc": "此函数返回某日期为星期几。默认情况下，其值为 1（星期天）到 7（星期六）之间的整数。",
        "args": [{
                "name": "date"
            }, {
                "name": "type"
            }
        ]
    },
    "WEEKNUM": {
        "desc": "此函数返回一个数字，该数字代表一年中的第几周。",
        "args": [{
                "name": "date"
            }, {
                "name": "weektype"
            }
        ]
    },
    "DATEPART": {
        "desc": "此函数格式化一个日期并将其转换成文本。",
        "args": [{
                "name": "date"
            }, {
                "name": "format_text"
            }, {
                "name": "weektype"
            }
        ]
    },
    "WEIBULL": {
        "desc": "此函数返回韦伯分布。使用此函数可以进行可靠性分析，比如计算设备的平均故障时间。",
        "args": [{
                "name": "x"
            }, {
                "name": "alpha"
            }, {
                "name": "beta"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "WORKDAY": {
        "desc": "此函数返回某日期（起始日期）之前或之后相隔指定工作日的某一日期的日期值。",
        "args": [{
                "name": "start_date"
            }, {
                "name": "days"
            }, {
                "name": "holidays"
            }
        ]
    },
    "XIRR": {
        "desc": "此函数返回一组现金流的内部收益率，这些现金流不一定定期发生。",
        "args": [{
                "name": "values"
            }, {
                "name": "dates"
            }, {
                "name": "guess"
            }
        ]
    },
    "XNPV": {
        "desc": "此函数返回一组现金流的净现值，这些现金流不一定定期发生。",
        "args": [{
                "name": "rate"
            }, {
                "name": "values"
            }, {
                "name": "dates"
            }
        ]
    },
    "YEAR": {
        "desc": "此函数返回某日期对应的年份。",
        "args": [{
                "name": "date"
            }
        ]
    },
    "YEARFRAC": {
        "desc": "此函数 返回 start 和 end 之间的天数占全年天数的百分比。",
        "args": [{
                "name": "start_date"
            }, {
                "name": "end_date"
            }, {
                "name": "basis"
            }
        ]
    },
    "YIELD": {
        "desc": "此函数返回定期付息有价证券的收益率，函数 YIELD 用于计算债券收益率。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "rate"
            }, {
                "name": "price"
            }, {
                "name": "redemption"
            }, {
                "name": "frequency"
            }, {
                "name": "basis"
            }
        ]
    },
    "YIELDDISC": {
        "desc": "此函数返回折价发行的有价证券的年收益率。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "price"
            }, {
                "name": "redemption"
            }, {
                "name": "basis"
            }
        ]
    },
    "YIELDMAT": {
        "desc": "此函数返回到期付息的有价证券的年收益率。",
        "args": [{
                "name": "settlement"
            }, {
                "name": "maturity"
            }, {
                "name": "issue"
            }, {
                "name": "rate"
            }, {
                "name": "price"
            }, {
                "name": "basis"
            }
        ]
    },
    "ZTEST": {
        "desc": "此函数返回 z 检验的单尾概率值。对于给定的假设总体平均值 μ0，ZTEST 返回样本平均值大于数据集（数组）中观察平均值的概率，即观察样本平均值。",
        "args": [{
                "name": "array"
            }, {
                "name": "x"
            }, {
                "name": "sigma"
            }
        ]
    },
    "HBARSPARKLINE": {
        "desc": "此函数返回一个用于描绘横向条状迷你图的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "colorScheme"
            }, {
                "name": "axisVisible"
            }, {
                "name": "barHeight"
            }
        ]
    },
    "VBARSPARKLINE": {
        "desc": "此函数返回一个用于描绘竖向柱状型迷你图的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "colorScheme"
            }, {
                "name": "axisVisible"
            }, {
                "name": "barWidth"
            }
        ]
    },
    "VARISPARKLINE": {
        "desc": "此函数返回一个用于描绘方差迷你图的数据集。",
        "args": [{
                "name": "variance"
            }, {
                "name": "reference"
            }, {
                "name": "mini"
            }, {
                "name": "maxi"
            }, {
                "name": "mark"
            }, {
                "name": "tickunit"
            }, {
                "name": "legend"
            }, {
                "name": "colorPositive"
            }, {
                "name": "colorNegative"
            }, {
                "name": "vertical"
            }
        ]
    },
    "PIESPARKLINE": {
        "desc": "此函数返回一个用于描绘饼形迷你图的数据集。",
        "args": [{
                "name": "range|percentage"
            }, {
                "name": "color",
                "required": true
            }
        ]
    },
    "AREASPARKLINE": {
        "desc": "此函数返回一个用于描绘面积迷你图的数据集。",
        "args": [{
                "name": "points"
            }, {
                "name": "mini"
            }, {
                "name": "maxi"
            }, {
                "name": "line1"
            }, {
                "name": "line2"
            }, {
                "name": "colorPositive"
            }, {
                "name": "colorNegative"
            }
        ]
    },
    "SCATTERSPARKLINE": {
        "desc": "此函数返回一个用于描绘散点迷你图的数据集。",
        "args": [{
                "name": "points1"
            }, {
                "name": "points2"
            }, {
                "name": "minX"
            }, {
                "name": "maxX"
            }, {
                "name": "minY"
            }, {
                "name": "maxY"
            }, {
                "name": "hLine"
            }, {
                "name": "vLine"
            }, {
                "name": "xMinZone"
            }, {
                "name": "xMaxZone"
            }, {
                "name": "yMinZone"
            }, {
                "name": "yMaxZone"
            }, {
                "name": "tags"
            }, {
                "name": "drawSymbol"
            }, {
                "name": "drawLines"
            }, {
                "name": "color1"
            }, {
                "name": "color2"
            }, {
                "name": "dash"
            }
        ]
    },
    "LINESPARKLINE": {
        "desc": "此函数返回一个用于描绘折线迷你图的数据集。",
        "args": [{
                "name": "data"
            }, {
                "name": "dataOrientation"
            }, {
                "name": "dateAxisData"
            }, {
                "name": "dateAxisOrientation"
            }, {
                "name": "setting"
            }
        ]
    },
    "COLUMNSPARKLINE": {
        "desc": "此函数返回一个用于描绘柱形迷你图的数据集。",
        "args": [{
                "name": "data"
            }, {
                "name": "dataOrientation"
            }, {
                "name": "dateAxisData"
            }, {
                "name": "dateAxisOrientation"
            }, {
                "name": "setting"
            }
        ]
    },
    "WINLOSSSPARKLINE": {
        "desc": "此函数返回一个用于描绘盈亏迷你图的数据集。",
        "args": [{
                "name": "data"
            }, {
                "name": "dataOrientation"
            }, {
                "name": "dateAxisData"
            }, {
                "name": "dateAxisOrientation"
            }, {
                "name": "setting"
            }
        ]
    },
    "BULLETSPARKLINE": {
        "desc": "此函数返回一个用于描绘子弹迷你图的数据集。",
        "args": [{
                "name": "measure"
            }, {
                "name": "target"
            }, {
                "name": "maxi"
            }, {
                "name": "good"
            }, {
                "name": "bad"
            }, {
                "name": "forecast"
            }, {
                "name": "tickunit"
            }, {
                "name": "colorScheme"
            }, {
                "name": "vertical"
            }, {
                "name": "measureColor"
            }, {
                "name": "targetColor"
            }, {
                "name": "maxiColor"
            }, {
                "name": "goodColor"
            }, {
                "name": "badColor"
            }, {
                "name": "forecastColor"
            }, {
                "name": "allowMeasureOverMaxi"
            }, {
                "name": "barSize"
            }
        ]
    },
    "SPREADSPARKLINE": {
        "desc": "此函数返回一个用于描绘散布迷你图的数据集。",
        "args": [{
                "name": "points"
            }, {
                "name": "showAverage"
            }, {
                "name": "scaleStart"
            }, {
                "name": "scaleEnd"
            }, {
                "name": "style"
            }, {
                "name": "colorScheme"
            }, {
                "name": "vertical"
            }
        ]
    },
    "STACKEDSPARKLINE": {
        "desc": "此函数返回一个用于描绘堆积迷你图的数据集。",
        "args": [{
                "name": "points"
            }, {
                "name": "colorRange"
            }, {
                "name": "labelRange"
            }, {
                "name": "maximum"
            }, {
                "name": "targetRed"
            }, {
                "name": "targetGreen"
            }, {
                "name": "targetBlue"
            }, {
                "name": "tragetYellow"
            }, {
                "name": "color"
            }, {
                "name": "highlightPosition"
            }, {
                "name": "vertical"
            }, {
                "name": "textOrientation"
            }, {
                "name": "textSize"
            }
        ]
    },
    "BOXPLOTSPARKLINE": {
        "desc": "此函数返回一个用于描绘箱线迷你图的数据集。",
        "args": [{
                "name": "points"
            }, {
                "name": "boxPlotClass"
            }, {
                "name": "showAverage"
            }, {
                "name": "scaleStart"
            }, {
                "name": "scaleEnd"
            }, {
                "name": "acceptableStart"
            }, {
                "name": "acceptableEnd"
            }, {
                "name": "colorScheme"
            }, {
                "name": "style"
            }, {
                "name": "vertical"
            }
        ]
    },
    "CASCADESPARKLINE": {
        "desc": "此函数返回一个用于描绘瀑布迷你图的数据集。",
        "args": [{
                "name": "pointsRange"
            }, {
                "name": "pointIndex"
            }, {
                "name": "labelsRange"
            }, {
                "name": "minimum"
            }, {
                "name": "maximum"
            }, {
                "name": "colorPositive"
            }, {
                "name": "colorNegative"
            }, {
                "name": "vertical"
            }, {
                "name": "itemTypeRange"
            }, {
                "name": "colorTotal"
            }
        ]
    },
    "PARETOSPARKLINE": {
        "desc": "此函数返回一个用于描绘阶梯瀑布迷你图的数据集。",
        "args": [{
                "name": "points"
            }, {
                "name": "pointIndex"
            }, {
                "name": "colorRange"
            }, {
                "name": "target"
            }, {
                "name": "target2"
            }, {
                "name": "highlightPosition"
            }, {
                "name": "label"
            }, {
                "name": "vertical"
            }, {
                "name": "targetColor"
            }, {
                "name": "target2Color"
            }, {
                "name": "labelColor"
            }, {
                "name": "barSize"
            }
        ]
    },
    "MONTHSPARKLINE": {
        "desc": "此函数返回一个用于描绘月份迷你图的数据集。",
        "args": [{
                "name": "year"
            }, {
                "name": "month"
            }, {
                "name": "dataRange"
            }, {
                "name": "emptyColor"
            }, {
                "name": "startColor"
            }, {
                "name": "middleColor"
            }, {
                "name": "endColor"
            }
        ]
    },
    "YEARSPARKLINE": {
        "desc": "此函数返回一个用于描绘年份迷你图的数据集。",
        "args": [{
                "name": "year"
            }, {
                "name": "dataRange"
            }, {
                "name": "emptyColor"
            }, {
                "name": "startColor"
            }, {
                "name": "middleColor"
            }, {
                "name": "endColor"
            }
        ]
    },
    "GAUGEKPISPARKLINE": {
        "desc": "此函数返回一个用于描绘KPI迷你图的数据集。",
        "args": [{
                "name": "targetValue"
            }, {
                "name": "currentValue"
            }, {
                "name": "minValue"
            }, {
                "name": "maxValue"
            }, {
                "name": "showLabel"
            }, {
                "name": "targetValueLabel"
            }, {
                "name": "currentValueLabel"
            }, {
                "name": "minValueLabel"
            }, {
                "name": "maxValueLabel"
            }, {
                "name": "fontArray"
            }, {
                "name": "minAngle"
            }, {
                "name": "maxAngle"
            }, {
                "name": "radiusRatio"
            }, {
                "name": "gaugeType"
            }, {
                "name": "colorRange"
            }, {
                "name": "..."
            }
        ]
    },
    "HISTOGRAMSPARKLINE": {
        "desc": "此函数返回一个用于描绘直方迷你图的数据集。",
        "args": [{
                "name": "dateRange"
            }, {
                "name": "continuous"
            }, {
                "name": "paintLabel"
            }, {
                "name": "scale"
            }, {
                "name": "barWidth"
            }, {
                "name": "barColor"
            }, {
                "name": "labelFontStyle"
            }, {
                "name": "labelColor"
            }, {
                "name": "edgeColor"
            }
        ]
    },
    "CEILING.PRECISE": {
        "desc": "此函数返回一个数字，该数字向上舍入为最接近的整数或最接近的有效位的倍数。",
        "args": [{
                "name": "number"
            }, {
                "name": "[significance]"
            }
        ]
    },
    "COVARIANCE.S": {
        "desc": "此函数返回样本协方差，即两个数据集中每对数据点的偏差乘积的平均值。",
        "args": [{
                "name": "array1"
            }, {
                "name": "array2"
            }
        ]
    },
    "FLOOR.PRECISE": {
        "desc": "此函数向绝对值减小的方向舍入数字。",
        "args": [{
                "name": "number"
            }, {
                "name": "[significance]"
            }
        ]
    },
    "PERCENTILE.EXC": {
        "desc": "此函数返回区域中数值的第 n 个百分点的值。",
        "args": [{
                "name": "array"
            }, {
                "name": "k"
            }
        ]
    },
    "QUARTILE.EXC": {
        "desc": "此函数返回数据集的四分位数。",
        "args": [{
                "name": "array"
            }, {
                "name": "quart"
            }
        ]
    },
    "RANK.AVG": {
        "desc": "此函数返回一个数字在数字列表中的排位。数字的排位是其大小与列表中其他值的比值（如果列表已排过序，则数字的排位就是它当前的位置）。",
        "args": [{
                "name": "number"
            }, {
                "name": "ref"
            }, {
                "name": "[order]"
            }
        ]
    },
    "MODE.MULT": {
        "desc": "此函数返回一组数据或数据区域中出现频率最高或重复出现的数值的垂直数组。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "STDEV.P": {
        "desc": "此函数估算基于样本的标准偏差。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "VAR.P": {
        "desc": "此函数计算基于给定样本的方差。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "COVARIANCE.P": {
        "desc": "此函数返回协方差（成对偏差乘积的平均值）。",
        "args": [{
                "name": "array1"
            }, {
                "name": "array2"
            }
        ]
    },
    "MODE.SNGL": {
        "desc": "此函数返回在某一数组或数据区域中出现频率最多的数值。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "PERCENTILE.INC": {
        "desc": "此函数返回区域中数值的第 n 个百分点的值。",
        "args": [{
                "name": "array"
            }, {
                "name": "k"
            }
        ]
    },
    "QUARTILE.INC": {
        "desc": "此函数返回数据集的四分位数。",
        "args": [{
                "name": "array"
            }, {
                "name": "quart"
            }
        ]
    },
    "RANK.EQ": {
        "desc": "此函数返回一个数字在数字列表中的排位。数字的排位是其大小与列表中其他值的比值（如果列表已排过序，则数字的排位就是它当前的位置）。",
        "args": [{
                "name": "number"
            }, {
                "name": "ref"
            }, {
                "name": "[order]"
            }
        ]
    },
    "STDEV": {
        "desc": "此函数估算基于样本的标准偏差。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "STDEV.S": {
        "desc": "此函数估算基于样本的标准偏差。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "VAR.S": {
        "desc": "此函数计算基于给定样本的方差。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "BETA.INV": {
        "desc": "此函数返回指定 Beta 分布的累积分布函数的反函数。",
        "args": [{
                "name": "probability"
            }, {
                "name": "alpha"
            }, {
                "name": "beta"
            }, {
                "name": "[lower]"
            }, {
                "name": "[upper]"
            }
        ]
    },
    "BINOM.DIST": {
        "desc": "此函数返回二项式分布的概率值。",
        "args": [{
                "name": "number_s"
            }, {
                "name": "trials"
            }, {
                "name": "probability_s"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "BINOM.INV": {
        "desc": "此函数返回使累积二项式分布小于或等于临界值的最小值。",
        "args": [{
                "name": "trials"
            }, {
                "name": "probability_s"
            }, {
                "name": "alpha"
            }
        ]
    },
    "CHISQ.DIST.RT": {
        "desc": "此函数返回 χ2 分布的单尾概率。",
        "args": [{
                "name": "value"
            }, {
                "name": "deg_freedom"
            }
        ]
    },
    "CHISQ.INV.RT": {
        "desc": "此函数返回 χ2 分布的单尾概率的反函数。",
        "args": [{
                "name": "probability"
            }, {
                "name": "deg_freedom"
            }
        ]
    },
    "CHISQ.TEST": {
        "desc": "此函数返回独立性检验值。",
        "args": [{
                "name": "actual_range"
            }, {
                "name": "expected_range"
            }
        ]
    },
    "CONFIDENCE.NORM": {
        "desc": "此函数返回总体平均值的置信区间。",
        "args": [{
                "name": "alpha"
            }, {
                "name": "standard_dev"
            }, {
                "name": "size"
            }
        ]
    },
    "EXPON.DIST": {
        "desc": "此函数返回指数分布。",
        "args": [{
                "name": "value"
            }, {
                "name": "lambda"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "F.DIST.RT": {
        "desc": "此函数返回 F 概率分布。",
        "args": [{
                "name": "value"
            }, {
                "name": "deg_freedom1"
            }, {
                "name": "deg_freedom2"
            }
        ]
    },
    "F.INV.RT": {
        "desc": "此函数返回 F 概率分布的反函数。",
        "args": [{
                "name": "probability"
            }, {
                "name": "deg_freedom1"
            }, {
                "name": "deg_freedom2"
            }
        ]
    },
    "F.TEST": {
        "desc": "此函数返回 F 检验的结果。",
        "args": [{
                "name": "array1"
            }, {
                "name": "array2"
            }
        ]
    },
    "GAMMA.DIST": {
        "desc": "此函数返回 γ 分布。",
        "args": [{
                "name": "x"
            }, {
                "name": "alpha"
            }, {
                "name": "beta"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "GAMMA.INV": {
        "desc": "此函数返回 γ 累积分布函数的反函数。",
        "args": [{
                "name": "probability"
            }, {
                "name": "alpha"
            }, {
                "name": "beta"
            }
        ]
    },
    "LOGNORM.INV": {
        "desc": "此函数返回对数累积分布的反函数。",
        "args": [{
                "name": "probability"
            }, {
                "name": "mean"
            }, {
                "name": "standard_dev"
            }
        ]
    },
    "NORM.DIST": {
        "desc": "此函数返回正态累积分布。",
        "args": [{
                "name": "x"
            }, {
                "name": "mean"
            }, {
                "name": "standard_dev"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "NORM.INV": {
        "desc": "此函数返回标准正态累积分布的反函数。",
        "args": [{
                "name": "probability"
            }, {
                "name": "mean"
            }, {
                "name": "standard_dev"
            }
        ]
    },
    "NORM.S.INV": {
        "desc": "此函数返回标准正态累积分布函数的反函数。",
        "args": [{
                "name": "probability"
            }
        ]
    },
    "PERCENTRANK.INC": {
        "desc": "此函数返回数据集中值的百分比排位。",
        "args": [{
                "name": "array"
            }, {
                "name": "n"
            }, {
                "name": "[significance]"
            }
        ]
    },
    "POISSON.DIST": {
        "desc": "此函数返回泊松分布。",
        "args": [{
                "name": "nevents"
            }, {
                "name": "mean"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "T.INV.2T": {
        "desc": "此函数返回学生的 t 分布的反函数。",
        "args": [{
                "name": "probability"
            }, {
                "name": "deg_freedom"
            }
        ]
    },
    "T.TEST": {
        "desc": "此函数返回与学生的 t 检验相关的概率。",
        "args": [{
                "name": "array1"
            }, {
                "name": "array2"
            }, {
                "name": "tails"
            }, {
                "name": "type"
            }
        ]
    },
    "WEIBULL.DIST": {
        "desc": "此函数返回 Weibull 分布。",
        "args": [{
                "name": "x"
            }, {
                "name": "alpha"
            }, {
                "name": "beta"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "Z.TEST": {
        "desc": "此函数返回 z 检验的单尾概率值。",
        "args": [{
                "name": "array"
            }, {
                "name": "x"
            }, {
                "name": "[sigma]"
            }
        ]
    },
    "T.DIST.RT": {
        "desc": "此函数返回学生的 t 分布。",
        "args": [{
                "name": "x"
            }, {
                "name": "deg_freedom"
            }
        ]
    },
    "T.DIST.2T": {
        "desc": "此函数返回学生的 t 分布的百分点（概率）。",
        "args": [{
                "name": "x"
            }, {
                "name": "deg_freedom"
            }
        ]
    },
    "ISO.CEILING": {
        "desc": "此函数将数字向上舍入到最接近的整数或基数的最接近倍数。",
        "args": [{
                "name": "number"
            }, {
                "name": "[significance]"
            }
        ]
    },
    "BETA.DIST": {
        "desc": "此函数返回 Beta 累积分布函数。",
        "args": [{
                "name": "x"
            }, {
                "name": "alpha"
            }, {
                "name": "beta"
            }, {
                "name": "cumulative"
            }, {
                "name": "lower"
            }, {
                "name": "upper"
            }
        ]
    },
    "GAMMALN.PRECISE": {
        "desc": "此函数返回伽玛函数的自然对数，Γ(x)。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "ERF.PRECISE": {
        "desc": "此函数返回误差函数。",
        "args": [{
                "name": "lowerlimit"
            }
        ]
    },
    "ERFC.PRECISE": {
        "desc": "此函数返回从 x 到无穷大积分的互补 ERF 函数。",
        "args": [{
                "name": "lowerlimit"
            }
        ]
    },
    "PERCENTRANK.EXC": {
        "desc": "此函数返回某个数值在一个数据集中的百分比（0 到 1，不包括 0 和 1）排位。",
        "args": [{
                "name": "array"
            }, {
                "name": "x"
            }, {
                "name": "[significance]"
            }
        ]
    },
    "HYPGEOM.DIST": {
        "desc": "此函数返回超几何分布。",
        "args": [{
                "name": "sample_s"
            }, {
                "name": "number_sample"
            }, {
                "name": "population_s"
            }, {
                "name": "number_pop"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "LOGNORM.DIST": {
        "desc": "此函数返回对数累积分布函数。",
        "args": [{
                "name": "x"
            }, {
                "name": "mean"
            }, {
                "name": "stdev"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "NEGBINOM.DIST": {
        "desc": "此函数返回负二项式分布。",
        "args": [{
                "name": "number_f"
            }, {
                "name": "number_s"
            }, {
                "name": "probability_s"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "NORM.S.DIST": {
        "desc": "此函数返回标准正态累积分布。",
        "args": [{
                "name": "z"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "T.DIST": {
        "desc": "此函数返回学生的 t 分布的百分点（概率）。",
        "args": [{
                "name": "x"
            }, {
                "name": "deg_freedom"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "F.DIST": {
        "desc": "此函数返回 F 概率分布。",
        "args": [{
                "name": "x"
            }, {
                "name": "deg_freedom1"
            }, {
                "name": "deg_freedom2"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "CHISQ.DIST": {
        "desc": "此函数返回累积 Beta 概率密度函数。",
        "args": [{
                "name": "x"
            }, {
                "name": "deg_freedom"
            }, {
                "name": "cumulative"
            }
        ]
    },
    "F.INV": {
        "desc": "此函数返回 F 概率分布的反函数。",
        "args": [{
                "name": "probability"
            }, {
                "name": "deg_freedom1"
            }, {
                "name": "deg_freedom2"
            }
        ]
    },
    "T.INV": {
        "desc": "此函数返回作为概率和自由度函数的学生 t 分布的 t 值。",
        "args": [{
                "name": "probability"
            }, {
                "name": "deg_freedom"
            }
        ]
    },
    "CHISQ.INV": {
        "desc": "此函数返回累积 Beta 概率密度函数。",
        "args": [{
                "name": "probability"
            }, {
                "name": "deg_freedom"
            }
        ]
    },
    "CONFIDENCE.T": {
        "desc": "此函数返回总体平均值的置信区间（使用学生的 t 分布）。",
        "args": [{
                "name": "alpha"
            }, {
                "name": "standard_dev"
            }, {
                "name": "size"
            }
        ]
    },
    "NETWORKDAYS.INTL": {
        "desc": "此函数返回两个日期之间的所有工作日数。",
        "args": [{
                "name": "start_date"
            }, {
                "name": "end_date"
            }, {
                "name": "[weekend]"
            }, {
                "name": "[holidays]"
            }
        ]
    },
    "WORKDAY.INTL": {
        "desc": "此函数返回指定的若干个工作日之前或之后的日期的序列号（使用自定义周末参数）。周末参数指明周末有几天以及是哪几天。",
        "args": [{
                "name": "start_date"
            }, {
                "name": "days"
            }, {
                "name": "[weekend]"
            }, {
                "name": "[holidays]"
            }
        ]
    },
    "REFRESH": {
        "desc": "此函数决定了在什么时机重新计算公式，可以通过 evaluateMode 参数来指定是在单元格引用的值发生变化的时候、只计算一次还是以一定的时间间隔重复计算。",
        "args": [{
                "name": "formula"
            }, {
                "name": "evaluateMode"
            }, {
                "name": "interval"
            }
        ]
    },
    "DAYS": {
        "desc": "此函数返回两个日期之间的天数。",
        "args": [{
                "name": "end_date"
            }, {
                "name": "start_date"
            }
        ]
    },
    "ISOWEEKNUM": {
        "desc": "此函数返回给定日期在全年中的 ISO 周数。",
        "args": [{
                "name": "date"
            }
        ]
    },
    "BITAND": {
        "desc": "此函数返回两个数的按位“与”。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2"
            }
        ]
    },
    "BITLSHIFT": {
        "desc": "此函数返回向左移动指定位数后的数值。",
        "args": [{
                "name": "number"
            }, {
                "name": "shift_amount"
            }
        ]
    },
    "BITOR": {
        "desc": "此函数返回两个数的按位“或”。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2"
            }
        ]
    },
    "BITRSHIFT": {
        "desc": "此函数返回向右移动指定位数后的数值。",
        "args": [{
                "name": "number"
            }, {
                "name": "shift_amount"
            }
        ]
    },
    "BITXOR": {
        "desc": "此函数返回两个数值的按位“异或”结果。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2"
            }
        ]
    },
    "IMCOSH": {
        "desc": "此函数返回以 x+yi 或 x+yj 文本格式表示的复数的双曲余弦值。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMCOT": {
        "desc": "此函数返回以 x+yi 或 x+yj 文本格式表示的复数的余切值。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMCSC": {
        "desc": "此函数返回以 x+yi 或 x+yj 文本格式表示的复数的余割值。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMCSCH": {
        "desc": "此函数返回以 x+yi 或 x+yj 文本格式表示的复数的双曲余割值。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMSEC": {
        "desc": "此函数返回以 x+yi 或 x+yj 文本格式表示的复数的正割值。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMSECH": {
        "desc": "此函数返回以 x+yi 或 x+yj 文本格式表示的复数的双曲正割值。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMSINH": {
        "desc": "此函数返回以 x+yi 或 x+yj 文本格式表示的复数的双曲正弦值。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "IMTAN": {
        "desc": "此函数返回以 x+yi 或 x+yj 文本格式表示的复数的正切值。",
        "args": [{
                "name": "complexnum"
            }
        ]
    },
    "PDURATION": {
        "desc": "此函数返回投资到达指定值所需的期数。",
        "args": [{
                "name": "rate"
            }, {
                "name": "pval"
            }, {
                "name": "fval"
            }
        ]
    },
    "RRI": {
        "desc": "此函数返回投资增长的等效利率。",
        "args": [{
                "name": "nper"
            }, {
                "name": "pval"
            }, {
                "name": "fval"
            }
        ]
    },
    "ISFORMULA": {
        "desc": "此函数检查是否存在包含公式的单元格引用，然后返回 TRUE 或 FALSE。",
        "args": [{
                "name": "cellreference"
            }
        ]
    },
    "IFNA": {
        "desc": "如果公式返回错误值 #N/A，则结果返回您指定的值；否则返回公式的结果。",
        "args": [{
                "name": "value"
            }, {
                "name": "value_if_na"
            }
        ]
    },
    "IFS": {
        "desc": "此函数检查是否满足一个或多个条件，并返回第一个 TRUE 条件对应的值。",
        "args": [{
                "name": "logical_test1"
            }, {
                "name": "value_if_true1"
            }, {
                "name": "logical_test2",
                "required": true
            }, {
                "name": "value_if_true2",
                "required": true
            }
        ]
    },
    "SWITCH": {
        "desc": "此函数根据值列表计算一个值（称为表达式），并返回与第一个匹配值对应的结果",
        "args": [{
                "name": "expression"
            }, {
                "name": "value1"
            }, {
                "name": "result1"
            }, {
                "name": "[default_or_value2]",
                "required": true
            }, {
                "name": "[result2]",
                "required": true
            }
        ]
    },
    "XOR": {
        "desc": "此函数返回所有参数的逻辑异或。",
        "args": [{
                "name": "logical",
                "required": true
            }
        ]
    },
    "AREAS": {
        "desc": "此函数返回引用中的区域个数。 区域是指连续的单元格区域或单个单元格。",
        "args": [{
                "name": "reference"
            }
        ]
    },
    "FORMULATEXT": {
        "desc": "此函数以字符串的形式返回公式。",
        "args": [{
                "name": "reference"
            }
        ]
    },
    "HYPERLINK": {
        "desc": "此函数创建快捷方式或跳转，以打开存储在网络服务器、intranet 或 Internet 上的文档。",
        "args": [{
                "name": "link_location"
            }, {
                "name": "friendly_name"
            }
        ]
    },
    "ACOT": {
        "desc": "此函数返回数字的反余切值的主值。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "ACOTH": {
        "desc": "此函数返回数字的反双曲余切值。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "ARABIC": {
        "desc": "此函数将罗马数字转换为阿拉伯数字。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "BASE": {
        "desc": "此函数将数字转换为具备给定基数的文本表示。",
        "args": [{
                "name": "number"
            }, {
                "name": "radix"
            }, {
                "name": "min_length"
            }
        ]
    },
    "CEILING.MATH": {
        "desc": "此函数将数字向上舍入为最接近的整数或最接近的指定基数的倍数。",
        "args": [{
                "name": "number"
            }, {
                "name": "[significance]"
            }, {
                "name": "[mode]"
            }
        ]
    },
    "COMBINA": {
        "desc": "此函数返回给定数目的项的组合数（包含重复）。",
        "args": [{
                "name": "number"
            }, {
                "name": "number_chosen"
            }
        ]
    },
    "COT": {
        "desc": "此函数返回以弧度表示的角度的余切值。",
        "args": [{
                "name": "angle"
            }
        ]
    },
    "COTH": {
        "desc": "此函数返回一个双曲角度的双曲余切值。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "CSC": {
        "desc": "此函数返回角度的余割值，以弧度表示。",
        "args": [{
                "name": "angle"
            }
        ]
    },
    "CSCH": {
        "desc": "此函数返回角度的双曲余割值，以弧度表示。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "DECIMAL": {
        "desc": "此函数按给定基数将数字的文本表示形式转换成十进制数。",
        "args": [{
                "name": "text"
            }, {
                "name": "radix"
            }
        ]
    },
    "FLOOR.MATH": {
        "desc": "此函数将数字向下舍入为最接近的整数或最接近的指定基数的倍数。",
        "args": [{
                "name": "number"
            }, {
                "name": "[significance]"
            }, {
                "name": "[mode]"
            }
        ]
    },
    "SEC": {
        "desc": "此函数返回角度的正割值。",
        "args": [{
                "name": "angle"
            }
        ]
    },
    "SECH": {
        "desc": "此函数返回角度的双曲正割值。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "BINOM.DIST.RANGE": {
        "desc": "此函数使用二项式分布返回试验结果的概率。",
        "args": [{
                "name": "trials"
            }, {
                "name": "probability_s"
            }, {
                "name": "number_s"
            }, {
                "name": "[number_s2]"
            }
        ]
    },
    "GAMMA": {
        "desc": "此函数返回 gamma 函数值。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "MAXIFS": {
        "desc": "此函数返回一组给定条件或标准指定的单元格中的最大值。",
        "args": [{
                "name": "max_range"
            }, {
                "name": "criteria_range1"
            }, {
                "name": "criteria1"
            }, {
                "name": "criteria_range2",
                "required": true
            }, {
                "name": "criteria2",
                "required": true
            }
        ]
    },
    "GAUSS": {
        "desc": "此函数计算标准正态总体的成员处于平均值与平均值的 z 倍标准偏差之间的概率。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "MINIFS": {
        "desc": "此函数返回一组给定条件或标准指定的单元格之间的最小值。",
        "args": [{
                "name": "min_range"
            }, {
                "name": "criteria_range1"
            }, {
                "name": "criteria1"
            }, {
                "name": "criteria_range2",
                "required": true
            }, {
                "name": "criteria2",
                "required": true
            }
        ]
    },
    "PERMUTATIONA": {
        "desc": "此函数返回可从对象总数中选择的给定数目对象（含重复）的排列数。",
        "args": [{
                "name": "number"
            }, {
                "name": "number_chosen"
            }
        ]
    },
    "PHI": {
        "desc": "此函数返回标准正态分布的密度函数值。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "SKEW.P": {
        "desc": "此函数返回基于样本总体的分布不对称度：表明分布相对于平均值的不对称程度。",
        "args": [{
                "name": "number1"
            }, {
                "name": "number2",
                "required": true
            }
        ]
    },
    "BAHTTEXT": {
        "desc": "此函数将数字转换为泰语文本并添加后缀“泰铢”。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "CONCAT": {
        "desc": "此函数将多个区域和/或字符串的文本组合起来，但不提供分隔符或 IgnoreEmpty 参数。",
        "args": [{
                "name": "text1"
            }, {
                "name": "text2",
                "required": true
            }
        ]
    },
    "FINDB": {
        "desc": "此函数用于在第二个文本串中定位第一个文本串，并返回第一个文本串的起始位置的值，该值从第二个文本串的第一个字符算起。",
        "args": [{
                "name": "find_text"
            }, {
                "name": "within_text"
            }, {
                "name": {
                    "databaseNames": ["DAVERAGE", "DCOUNT", "DCOUNTA", "DGET", "DMAX", "DMIN", "DPRODUCT", "DSTDEV", "DSTDEVP", "DSUM", "DVAR", "DVARP"],
                    "webNames": ["ENCODEURL", "FILTERJSON", "WEBSERVICE"],
                    "dateAndTimeNames": ["DATE", "DATEDIF", "DATEVALUE", "DAY", "DAYS", "DAYS360", "EDATE", "EOMONTH", "HOUR", "ISOWEEKNUM", "MINUTE", "MONTH", "NETWORKDAYS", "NETWORKDAYS.INTL", "NOW", "SECOND", "TIME", "TIMEVALUE", "TODAY", "WEEKDAY", "WEEKNUM", "WORKDAY", "WORKDAY.INTL", "YEAR", "YEARFRAC"],
                    "engineeringNames": ["BESSELI", "BESSELJ", "BESSELK", "BESSELY", "BIN2DEC", "BIN2HEX", "BIN2OCT", "BITAND", "BITLSHIFT", "BITOR", "BITRSHIFT", "BITXOR", "COMPLEX", "CONVERT", "DEC2BIN", "DEC2HEX", "DEC2OCT", "DELTA", "ERF", "ERFC", "ERF.PRECISE", "ERFC.PRECISE", "GESTEP", "HEX2BIN", "HEX2DEC", "HEX2OCT", "IMABS", "IMAGINARY", "IMARGUMENT", "IMCONJUGATE", "IMCOS", "IMDIV", "IMEXP", "IMLN", "IMLOG10", "IMLOG2", "IMPOWER", "IMPRODUCT", "IMREAL", "IMSIN", "IMSQRT", "IMSUB", "IMSUM", "IMCOSH", "IMCOT", "IMCSC", "IMCSCH", "IMSEC", "IMSECH", "IMSINH", "IMTAN", "OCT2BIN", "OCT2DEC", "OCT2HEX"],
                    "financialNames": ["ACCRINT", "ACCRINTM", "AMORDEGRC", "AMORLINC", "COUPDAYBS", "COUPDAYS", "COUPDAYSNC", "COUPNCD", "COUPNUM", "COUPPCD", "CUMIPMT", "CUMPRINC", "DB", "DDB", "DISC", "DOLLARDE", "DOLLARFR", "DURATION", "EFFECT", "FV", "FVSCHEDULE", "INTRATE", "IPMT", "IRR", "ISPMT", "MDURATION", "MIRR", "NOMINAL", "NPER", "NPV", "ODDFPRICE", "ODDFYIELD", "ODDLPRICE", "ODDLYIELD", "EURO", "EUROCONVERT", "PMT", "PPMT", "PRICE", "PRICEDISC", "PRICEMAT", "PV", "PDURATION", "RRI", "RATE", "RECEIVED", "SLN", "SYD", "TBILLEQ", "TBILLPRICE", "TBILLYIELD", "VDB", "XIRR", "XNPV", "YIELD", "YIELDDISC", "YIELDMAT"],
                    "informationNames": ["ERROR.TYPE", "ISBLANK", "ISERR", "ISERROR", "ISEVEN", "ISLOGICAL", "ISFORMULA", "ISNA", "ISNONTEXT", "ISNUMBER", "ISODD", "ISOMITTED", "ISREF", "ISTEXT", "N", "NA", "SHEET", "SHEETS", "TYPE"],
                    "logicalNames": ["AND", "FALSE", "IF", "IFERROR", "IFNA", "IFS", "LAMBDA", "NOT", "OR", "SWITCH", "TRUE", "XOR"],
                    "logicalNamesWhenAllowDynamicArray": ["AND", "BYCOL", "BYROW", "FALSE", "IF", "IFERROR", "IFNA", "IFS", "LAMBDA", "MAKEARRAY", "MAP", "NOT", "OR", "REDUCE", "SCAN", "SWITCH", "TRUE", "XOR"],
                    "lookupAndReferenceNames": ["ADDRESS", "AREAS", "CHOOSE", "COLUMN", "COLUMNS", "FORMULATEXT", "HLOOKUP", "HYPERLINK", "INDEX", "INDIRECT", "LOOKUP", "MATCH", "OFFSET", "ROW", "ROWS", "TRANSPOSE", "VLOOKUP", "XLOOKUP", "XMATCH"],
                    "lookupAndReferenceNamesEx": ["CHOOSECOLS", "CHOOSEROWS", "DROP", "EXPAND", "FILTER", "HSTACK", "SORT", "SORTBY", "TAKE", "TOCOL", "TOROW", "UNIQUE", "VSTACK", "WRAPCOLS", "WRAPROWS"],
                    "mathAndTrigonometryNames": ["ABS", "ACOS", "ACOSH", "ACOT", "ACOTH", "AGGREGATE", "ARABIC", "ASIN", "ASINH", "ATAN", "ATAN2", "ATANH", "BASE", "CEILING", "CEILING.MATH", "CEILING.PRECISE", "COMBIN", "COMBINA", "COS", "COSH", "COT", "COTH", "CSC", "CSCH", "DECIMAL", "DEGREES", "EVEN", "EXP", "FACT", "FACTDOUBLE", "FLOOR", "FLOOR.MATH", "FLOOR.PRECISE", "GCD", "INT", "ISO.CEILING", "LCM", "LN", "LOG", "LOG10", "MDETERM", "MINVERSE", "MMULT", "MOD", "MROUND", "MULTINOMIAL", "ODD", "PI", "POWER", "PRODUCT", "QUOTIENT", "RADIANS", "RAND", "RANDBETWEEN", "ROMAN", "ROUND", "ROUNDDOWN", "ROUNDUP", "SEC", "SECH", "SERIESSUM", "SIGN", "SIN", "SINH", "SQRT", "SQRTPI", "SUBTOTAL", "SUM", "SUMIF", "SUMIFS", "SUMPRODUCT", "SUMSQ", "SUMX2MY2", "SUMX2PY2", "SUMXMY2", "TAN", "TANH", "TRUNC"],
                    "mathAndTrigonometryNamesEx": ["RANDARRAY", "SEQUENCE"],
                    "statisticalNames": ["AVEDEV", "AVERAGE", "AVERAGEA", "AVERAGEIF", "AVERAGEIFS", "BETADIST", "BETAINV", "BETA.DIST", "BETA.INV", "BINOMDIST", "BINOM.DIST", "BINOM.DIST.RANGE", "BINOM.INV", "CHIDIST", "CHIINV", "CHITEST", "CHISQ.DIST", "CHISQ.DIST.RT", "CHISQ.INV", "CHISQ.INV.RT", "CHISQ.TEST", "CONFIDENCE", "CONFIDENCE.NORM", "CONFIDENCE.T", "CORREL", "COUNT", "COUNTA", "COUNTBLANK", "COUNTIF", "COUNTIFS", "COVAR", "COVARIANCE.P", "COVARIANCE.S", "CRITBINOM", "DEVSQ", "EXPONDIST", "EXPON.DIST", "FDIST", "FINV", "FISHER", "FISHERINV", "FORECAST", "FREQUENCY", "FTEST", "F.DIST", "F.DIST.RT", "F.INV", "F.INV.RT", "F.TEST", "GAMMADIST", "GAMMAINV", "GAMMALN", "GEOMEAN", "GROWTH", "GAMMA", "GAMMA.DIST", "GAMMA.INV", "GAMMALN.PRECISE", "GAUSS", "HARMEAN", "HYPGEOMDIST", "HYPGEOM.DIST", "INTERCEPT", "KURT", "LARGE", "LINEST", "LOGEST", "LOGINV", "LOGNORMDIST", "LOGNORM.DIST", "LOGNORM.INV", "MAX", "MAXA", "MAXIFS", "MEDIAN", "MIN", "MINA", "MINIFS", "MODE", "MODE.MULT", "MODE.SNGL", "NEGBINOMDIST", "NEGBINOM.DIST", "NORMDIST", "NORMINV", "NORMSDIST", "NORMSINV", "NORM.DIST", "NORM.INV", "NORM.S.DIST", "NORM.S.INV", "PEARSON", "PERCENTILE", "PERCENTRANK", "PERMUT", "PERCENTILE.EXC", "PERCENTILE.INC", "PERCENTRANK.EXC", "PERCENTRANK.INC", "PERMUTATIONA", "PHI", "POISSON", "POISSON.DIST", "PROB", "QUARTILE", "QUARTILE.EXC", "QUARTILE.INC", "RANK", "RANK.AVG", "RANK.EQ", "RSQ", "SKEW", "SKEW.P", "SLOPE", "SMALL", "STANDARDIZE", "STDEV", "STDEVA", "STDEVP", "STDEVPA", "STDEV.P", "STDEV.S", "STEYX", "TDIST", "TINV", "TREND", "TRIMMEAN", "TTEST", "T.DIST", "T.DIST.2T", "T.DIST.RT", "T.INV", "T.INV.2T", "T.TEST", "VAR", "VARA", "VARP", "VARPA", "VAR.P", "VAR.S", "WEIBULL", "WEIBULL.DIST", "ZTEST", "Z.TEST"]
                }
            }
        ]
    },
    "LEFTB": {
        "desc": "此函数基于所指定的字节数返回文本字符串中的第一个或前几个字符。",
        "args": [{
                "name": "text"
            }, {
                "name": "num_bytes"
            }
        ]
    },
    "LENB": {
        "desc": "此函数返回文本字符串中用于代表字符的字节数。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "MIDB": {
        "desc": "此函数根据指定的字节数，返回文本字符串中从指定位置开始的特定数目的字符。",
        "args": [{
                "name": "text"
            }, {
                "name": "start_num"
            }, {
                "name": "num_bytes"
            }
        ]
    },
    "REPLACEB": {
        "desc": "此函数使用其他文本字符串并根据所指定的字节数替换某文本字符串中的部分文本。",
        "args": [{
                "name": "old_text"
            }, {
                "name": "start_byte"
            }, {
                "name": "num_bytes"
            }, {
                "name": "new_text"
            }
        ]
    },
    "RIGHTB": {
        "desc": "此函数根据所指定的字节数返回文本字符串中最后一个或多个字符。",
        "args": [{
                "name": "text"
            }, {
                "name": "num_bytes"
            }
        ]
    },
    "SEARCHB": {
        "desc": "此函数可在第二个文本字符串中查找第一个文本字符串，并返回第一个文本字符串的起始位置的编号，该编号从第二个文本字符串的第一个字符算起。",
        "args": [{
                "name": "find_text"
            }, {
                "name": "within_text"
            }, {
                "name": {
                    "databaseNames": ["DAVERAGE", "DCOUNT", "DCOUNTA", "DGET", "DMAX", "DMIN", "DPRODUCT", "DSTDEV", "DSTDEVP", "DSUM", "DVAR", "DVARP"],
                    "webNames": ["ENCODEURL", "FILTERJSON", "WEBSERVICE"],
                    "dateAndTimeNames": ["DATE", "DATEDIF", "DATEVALUE", "DAY", "DAYS", "DAYS360", "EDATE", "EOMONTH", "HOUR", "ISOWEEKNUM", "MINUTE", "MONTH", "NETWORKDAYS", "NETWORKDAYS.INTL", "NOW", "SECOND", "TIME", "TIMEVALUE", "TODAY", "WEEKDAY", "WEEKNUM", "WORKDAY", "WORKDAY.INTL", "YEAR", "YEARFRAC"],
                    "engineeringNames": ["BESSELI", "BESSELJ", "BESSELK", "BESSELY", "BIN2DEC", "BIN2HEX", "BIN2OCT", "BITAND", "BITLSHIFT", "BITOR", "BITRSHIFT", "BITXOR", "COMPLEX", "CONVERT", "DEC2BIN", "DEC2HEX", "DEC2OCT", "DELTA", "ERF", "ERFC", "ERF.PRECISE", "ERFC.PRECISE", "GESTEP", "HEX2BIN", "HEX2DEC", "HEX2OCT", "IMABS", "IMAGINARY", "IMARGUMENT", "IMCONJUGATE", "IMCOS", "IMDIV", "IMEXP", "IMLN", "IMLOG10", "IMLOG2", "IMPOWER", "IMPRODUCT", "IMREAL", "IMSIN", "IMSQRT", "IMSUB", "IMSUM", "IMCOSH", "IMCOT", "IMCSC", "IMCSCH", "IMSEC", "IMSECH", "IMSINH", "IMTAN", "OCT2BIN", "OCT2DEC", "OCT2HEX"],
                    "financialNames": ["ACCRINT", "ACCRINTM", "AMORDEGRC", "AMORLINC", "COUPDAYBS", "COUPDAYS", "COUPDAYSNC", "COUPNCD", "COUPNUM", "COUPPCD", "CUMIPMT", "CUMPRINC", "DB", "DDB", "DISC", "DOLLARDE", "DOLLARFR", "DURATION", "EFFECT", "FV", "FVSCHEDULE", "INTRATE", "IPMT", "IRR", "ISPMT", "MDURATION", "MIRR", "NOMINAL", "NPER", "NPV", "ODDFPRICE", "ODDFYIELD", "ODDLPRICE", "ODDLYIELD", "EURO", "EUROCONVERT", "PMT", "PPMT", "PRICE", "PRICEDISC", "PRICEMAT", "PV", "PDURATION", "RRI", "RATE", "RECEIVED", "SLN", "SYD", "TBILLEQ", "TBILLPRICE", "TBILLYIELD", "VDB", "XIRR", "XNPV", "YIELD", "YIELDDISC", "YIELDMAT"],
                    "informationNames": ["ERROR.TYPE", "ISBLANK", "ISERR", "ISERROR", "ISEVEN", "ISLOGICAL", "ISFORMULA", "ISNA", "ISNONTEXT", "ISNUMBER", "ISODD", "ISOMITTED", "ISREF", "ISTEXT", "N", "NA", "SHEET", "SHEETS", "TYPE"],
                    "logicalNames": ["AND", "FALSE", "IF", "IFERROR", "IFNA", "IFS", "LAMBDA", "NOT", "OR", "SWITCH", "TRUE", "XOR"],
                    "logicalNamesWhenAllowDynamicArray": ["AND", "BYCOL", "BYROW", "FALSE", "IF", "IFERROR", "IFNA", "IFS", "LAMBDA", "MAKEARRAY", "MAP", "NOT", "OR", "REDUCE", "SCAN", "SWITCH", "TRUE", "XOR"],
                    "lookupAndReferenceNames": ["ADDRESS", "AREAS", "CHOOSE", "COLUMN", "COLUMNS", "FORMULATEXT", "HLOOKUP", "HYPERLINK", "INDEX", "INDIRECT", "LOOKUP", "MATCH", "OFFSET", "ROW", "ROWS", "TRANSPOSE", "VLOOKUP", "XLOOKUP", "XMATCH"],
                    "lookupAndReferenceNamesEx": ["CHOOSECOLS", "CHOOSEROWS", "DROP", "EXPAND", "FILTER", "HSTACK", "SORT", "SORTBY", "TAKE", "TOCOL", "TOROW", "UNIQUE", "VSTACK", "WRAPCOLS", "WRAPROWS"],
                    "mathAndTrigonometryNames": ["ABS", "ACOS", "ACOSH", "ACOT", "ACOTH", "AGGREGATE", "ARABIC", "ASIN", "ASINH", "ATAN", "ATAN2", "ATANH", "BASE", "CEILING", "CEILING.MATH", "CEILING.PRECISE", "COMBIN", "COMBINA", "COS", "COSH", "COT", "COTH", "CSC", "CSCH", "DECIMAL", "DEGREES", "EVEN", "EXP", "FACT", "FACTDOUBLE", "FLOOR", "FLOOR.MATH", "FLOOR.PRECISE", "GCD", "INT", "ISO.CEILING", "LCM", "LN", "LOG", "LOG10", "MDETERM", "MINVERSE", "MMULT", "MOD", "MROUND", "MULTINOMIAL", "ODD", "PI", "POWER", "PRODUCT", "QUOTIENT", "RADIANS", "RAND", "RANDBETWEEN", "ROMAN", "ROUND", "ROUNDDOWN", "ROUNDUP", "SEC", "SECH", "SERIESSUM", "SIGN", "SIN", "SINH", "SQRT", "SQRTPI", "SUBTOTAL", "SUM", "SUMIF", "SUMIFS", "SUMPRODUCT", "SUMSQ", "SUMX2MY2", "SUMX2PY2", "SUMXMY2", "TAN", "TANH", "TRUNC"],
                    "mathAndTrigonometryNamesEx": ["RANDARRAY", "SEQUENCE"],
                    "statisticalNames": ["AVEDEV", "AVERAGE", "AVERAGEA", "AVERAGEIF", "AVERAGEIFS", "BETADIST", "BETAINV", "BETA.DIST", "BETA.INV", "BINOMDIST", "BINOM.DIST", "BINOM.DIST.RANGE", "BINOM.INV", "CHIDIST", "CHIINV", "CHITEST", "CHISQ.DIST", "CHISQ.DIST.RT", "CHISQ.INV", "CHISQ.INV.RT", "CHISQ.TEST", "CONFIDENCE", "CONFIDENCE.NORM", "CONFIDENCE.T", "CORREL", "COUNT", "COUNTA", "COUNTBLANK", "COUNTIF", "COUNTIFS", "COVAR", "COVARIANCE.P", "COVARIANCE.S", "CRITBINOM", "DEVSQ", "EXPONDIST", "EXPON.DIST", "FDIST", "FINV", "FISHER", "FISHERINV", "FORECAST", "FREQUENCY", "FTEST", "F.DIST", "F.DIST.RT", "F.INV", "F.INV.RT", "F.TEST", "GAMMADIST", "GAMMAINV", "GAMMALN", "GEOMEAN", "GROWTH", "GAMMA", "GAMMA.DIST", "GAMMA.INV", "GAMMALN.PRECISE", "GAUSS", "HARMEAN", "HYPGEOMDIST", "HYPGEOM.DIST", "INTERCEPT", "KURT", "LARGE", "LINEST", "LOGEST", "LOGINV", "LOGNORMDIST", "LOGNORM.DIST", "LOGNORM.INV", "MAX", "MAXA", "MAXIFS", "MEDIAN", "MIN", "MINA", "MINIFS", "MODE", "MODE.MULT", "MODE.SNGL", "NEGBINOMDIST", "NEGBINOM.DIST", "NORMDIST", "NORMINV", "NORMSDIST", "NORMSINV", "NORM.DIST", "NORM.INV", "NORM.S.DIST", "NORM.S.INV", "PEARSON", "PERCENTILE", "PERCENTRANK", "PERMUT", "PERCENTILE.EXC", "PERCENTILE.INC", "PERCENTRANK.EXC", "PERCENTRANK.INC", "PERMUTATIONA", "PHI", "POISSON", "POISSON.DIST", "PROB", "QUARTILE", "QUARTILE.EXC", "QUARTILE.INC", "RANK", "RANK.AVG", "RANK.EQ", "RSQ", "SKEW", "SKEW.P", "SLOPE", "SMALL", "STANDARDIZE", "STDEV", "STDEVA", "STDEVP", "STDEVPA", "STDEV.P", "STDEV.S", "STEYX", "TDIST", "TINV", "TREND", "TRIMMEAN", "TTEST", "T.DIST", "T.DIST.2T", "T.DIST.RT", "T.INV", "T.INV.2T", "T.TEST", "VAR", "VARA", "VARP", "VARPA", "VAR.P", "VAR.S", "WEIBULL", "WEIBULL.DIST", "ZTEST", "Z.TEST"]
                }
            }
        ]
    },
    "TEXTJOIN": {
        "desc": "此函数将多个区域和/或字符串的文本组合起来，并包括你在要组合的各文本值之间指定的分隔符。",
        "args": [{
                "name": "delimiter"
            }, {
                "name": "ignore_empty"
            }, {
                "name": "text1"
            }, {
                "name": "text2",
                "required": true
            }
        ]
    },
    "UNICHAR": {
        "desc": "此函数返回给定数值引用的 Unicode 字符。",
        "args": [{
                "name": "number"
            }
        ]
    },
    "UNICODE": {
        "desc": "此函数返回对应于文本的第一个字符的数字（代码点）。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "ENCODEURL": {
        "desc": "此函数返回 URL 编码的字符串。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "BC_QRCODE": {
        "desc": "此函数返回一个用于描绘QRCode的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "color"
            }, {
                "name": "backgroundColor"
            }, {
                "name": "errorCorrectionLevel"
            }, {
                "name": "model"
            }, {
                "name": "version"
            }, {
                "name": "mask"
            }, {
                "name": "connection"
            }, {
                "name": "connectionNo"
            }, {
                "name": "charCode"
            }, {
                "name": "charset"
            }, {
                "name": "quietZoneLeft"
            }, {
                "name": "quietZoneRight"
            }, {
                "name": "quietZoneTop"
            }, {
                "name": "quietZoneBottom"
            }
        ]
    },
    "BC_EAN13": {
        "desc": "此函数返回一个用于描绘EAN13的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "color"
            }, {
                "name": "backgroundColor"
            }, {
                "name": "showLabel"
            }, {
                "name": "labelPosition"
            }, {
                "name": "addOn"
            }, {
                "name": "addOnLabelPosition"
            }, {
                "name": "fontFamily"
            }, {
                "name": "fontStyle"
            }, {
                "name": "fontWeight"
            }, {
                "name": "textDecoration"
            }, {
                "name": "textAlign"
            }, {
                "name": "fontSize"
            }, {
                "name": "quietZoneLeft"
            }, {
                "name": "quietZoneRight"
            }, {
                "name": "quietZoneTop"
            }, {
                "name": "quietZoneBottom"
            }
        ]
    },
    "BC_EAN8": {
        "desc": "此函数返回一个用于描绘EAN8的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "color"
            }, {
                "name": "backgroundColor"
            }, {
                "name": "showLabel"
            }, {
                "name": "labelPosition"
            }, {
                "name": "fontFamily"
            }, {
                "name": "fontStyle"
            }, {
                "name": "fontWeight"
            }, {
                "name": "textDecoration"
            }, {
                "name": "textAlign"
            }, {
                "name": "fontSize"
            }, {
                "name": "quietZoneLeft"
            }, {
                "name": "quietZoneRight"
            }, {
                "name": "quietZoneTop"
            }, {
                "name": "quietZoneBottom"
            }
        ]
    },
    "BC_CODABAR": {
        "desc": "此函数返回一个用于描绘CODABAR的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "color"
            }, {
                "name": "backgroundColor"
            }, {
                "name": "showLabel"
            }, {
                "name": "labelPosition"
            }, {
                "name": "checkDigit"
            }, {
                "name": "nwRatio"
            }, {
                "name": "fontFamily"
            }, {
                "name": "fontStyle"
            }, {
                "name": "fontWeight"
            }, {
                "name": "textDecoration"
            }, {
                "name": "textAlign"
            }, {
                "name": "fontSize"
            }, {
                "name": "quietZoneLeft"
            }, {
                "name": "quietZoneRight"
            }, {
                "name": "quietZoneTop"
            }, {
                "name": "quietZoneBottom"
            }
        ]
    },
    "BC_CODE39": {
        "desc": "此函数返回一个用于描绘CODE39的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "color"
            }, {
                "name": "backgroundColor"
            }, {
                "name": "showLabel"
            }, {
                "name": "labelPosition"
            }, {
                "name": "labelWithStartAndStopCharacter"
            }, {
                "name": "checkDigit"
            }, {
                "name": "nwRatio"
            }, {
                "name": "fullASCII"
            }, {
                "name": "fontFamily"
            }, {
                "name": "fontStyle"
            }, {
                "name": "fontWeight"
            }, {
                "name": "textDecoration"
            }, {
                "name": "textAlign"
            }, {
                "name": "fontSize"
            }, {
                "name": "quietZoneLeft"
            }, {
                "name": "quietZoneRight"
            }, {
                "name": "quietZoneTop"
            }, {
                "name": "quietZoneBottom"
            }
        ]
    },
    "BC_CODE93": {
        "desc": "此函数返回一个用于描绘CODE93的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "color"
            }, {
                "name": "backgroundColor"
            }, {
                "name": "showLabel"
            }, {
                "name": "labelPosition"
            }, {
                "name": "checkDigit"
            }, {
                "name": "fullASCII"
            }, {
                "name": "fontFamily"
            }, {
                "name": "fontStyle"
            }, {
                "name": "fontWeight"
            }, {
                "name": "textDecoration"
            }, {
                "name": "textAlign"
            }, {
                "name": "fontSize"
            }, {
                "name": "quietZoneLeft"
            }, {
                "name": "quietZoneRight"
            }, {
                "name": "quietZoneTop"
            }, {
                "name": "quietZoneBottom"
            }
        ]
    },
    "BC_CODE128": {
        "desc": "此函数返回一个用于描绘CODE128的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "color"
            }, {
                "name": "backgroundColor"
            }, {
                "name": "showLabel"
            }, {
                "name": "labelPosition"
            }, {
                "name": "codeSet"
            }, {
                "name": "fontFamily"
            }, {
                "name": "fontStyle"
            }, {
                "name": "fontWeight"
            }, {
                "name": "textDecoration"
            }, {
                "name": "textAlign"
            }, {
                "name": "fontSize"
            }, {
                "name": "quietZoneLeft"
            }, {
                "name": "quietZoneRight"
            }, {
                "name": "quietZoneTop"
            }, {
                "name": "quietZoneBottom"
            }
        ]
    },
    "BC_GS1_128": {
        "desc": "此函数返回一个用于描绘GS1_128的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "color"
            }, {
                "name": "backgroundColor"
            }, {
                "name": "showLabel"
            }, {
                "name": "labelPosition"
            }, {
                "name": "fontFamily"
            }, {
                "name": "fontStyle"
            }, {
                "name": "fontWeight"
            }, {
                "name": "textDecoration"
            }, {
                "name": "textAlign"
            }, {
                "name": "fontSize"
            }, {
                "name": "quietZoneLeft"
            }, {
                "name": "quietZoneRight"
            }, {
                "name": "quietZoneTop"
            }, {
                "name": "quietZoneBottom"
            }
        ]
    },
    "BC_CODE49": {
        "desc": "此函数返回一个用于描绘CODE49的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "color"
            }, {
                "name": "backgroundColor"
            }, {
                "name": "showLabel"
            }, {
                "name": "labelPosition"
            }, {
                "name": "grouping"
            }, {
                "name": "groupNo"
            }, {
                "name": "fontFamily"
            }, {
                "name": "fontStyle"
            }, {
                "name": "fontWeight"
            }, {
                "name": "textDecoration"
            }, {
                "name": "textAlign"
            }, {
                "name": "fontSize"
            }, {
                "name": "quietZoneLeft"
            }, {
                "name": "quietZoneRight"
            }, {
                "name": "quietZoneTop"
            }, {
                "name": "quietZoneBottom"
            }
        ]
    },
    "BC_PDF417": {
        "desc": "此函数返回一个用于描绘PDF417的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "color"
            }, {
                "name": "backgroundColor"
            }, {
                "name": "errorCorrectionLevel"
            }, {
                "name": "rows"
            }, {
                "name": "columns"
            }, {
                "name": "compact"
            }, {
                "name": "quietZoneLeft"
            }, {
                "name": "quietZoneRight"
            }, {
                "name": "quietZoneTop"
            }, {
                "name": "quietZoneBottom"
            }
        ]
    },
    "BC_DATAMATRIX": {
        "desc": "此函数返回一个用于描绘DATAMATRIX的数据集。",
        "args": [{
                "name": "value"
            }, {
                "name": "color"
            }, {
                "name": "backgroundColor"
            }, {
                "name": "eccMode"
            }, {
                "name": "ecc200SymbolSize"
            }, {
                "name": "ecc200EncodingMode"
            }, {
                "name": "ecc00_140SymbolSize"
            }, {
                "name": "structuredAppend"
            }, {
                "name": "structureNumber"
            }, {
                "name": "fileIdentifier"
            }, {
                "name": "quietZoneLeft"
            }, {
                "name": "quietZoneRight"
            }, {
                "name": "quietZoneTop"
            }, {
                "name": "quietZoneBottom"
            }
        ]
    },
    "FILTER": {
        "desc": "此函数过滤一片区域或一个数组。",
        "args": [{
                "name": "array"
            }, {
                "name": "include"
            }, {
                "name": "if_empty"
            }
        ]
    },
    "RANDARRAY": {
        "desc": "该函数返回一个随机数组。",
        "args": [{
                "name": "rows"
            }, {
                "name": "columns"
            }, {
                "name": "min"
            }, {
                "name": "max"
            }, {
                "name": "whole_number"
            }
        ]
    },
    "SEQUENCE": {
        "desc": "此函数返回一个数字序列。",
        "args": [{
                "name": "rows"
            }, {
                "name": "columns"
            }, {
                "name": "start"
            }, {
                "name": "step"
            }
        ]
    },
    "SINGLE": {
        "desc": "当给定一个值，一片区域或一个数组时，此函数返回单个值。",
        "args": [{
                "name": "value"
            }
        ]
    },
    "SORT": {
        "desc": "此函数对一片或一个数组进行排序。",
        "args": [{
                "name": "array"
            }, {
                "name": "sort_index"
            }, {
                "name": "sort_order"
            }, {
                "name": "by_col"
            }
        ]
    },
    "SORTBY": {
        "desc": "此函数根据相应一片区域或一个数组中的值对一片区域或一个数组进行排序。",
        "args": [{
                "name": "array"
            }, {
                "name": "by_array1"
            }, {
                "name": "sort_order1"
            }, {
                "name": "by_array2",
                "required": true
            }, {
                "name": "sort_order2",
                "required": true
            }
        ]
    },
    "UNIQUE": {
        "desc": "此函数从一片区域或一个数组返回唯一值。",
        "args": [{
                "name": "array"
            }, {
                "name": "by_col"
            }, {
                "name": "exactly_once"
            }
        ]
    },
    "QUERY": {
        "desc": "此函数从数据源的数据表中返回数据。",
        "args": [{
                "name": "tableAndRows"
            }, {
                "name": "columns"
            }, {
                "name": "returnObject"
            }
        ]
    },
    "LET": {
        "desc": "此函数将结果分配给名称。可用于通过定义公式内的名称储存中间计算结果和值。这些名称仅在 LET 函数范围内适用。",
        "args": [{
                "name": "name1"
            }, {
                "name": "name_value1"
            }, {
                "name": "name2",
                "required": true
            }, {
                "name": "name_value2",
                "required": true
            }, {
                "name": "calculation"
            }
        ]
    },
    "IMAGE": {
        "desc": "此函数会在单元格内根据url或者base64字符串插入一张图片。",
        "args": [{
                "name": "URL"
            }, {
                "name": "[mode]"
            }, {
                "name": "[height]"
            }, {
                "name": "[width]"
            }, {
                "name": "[clipY]"
            }, {
                "name": "[clipX]"
            }, {
                "name": "[clipHeight]"
            }, {
                "name": "[clipWidth]"
            }, {
                "name": "[vAlign]"
            }, {
                "name": "[hAlign]"
            }
        ]
    },
    "GETPIVOTDATA": {
        "desc": "此函数会提取存储在数据透视表中的数据。",
        "args": [{
                "name": "data_field"
            }, {
                "name": "pivot_table"
            }, {
                "name": "[field1, item1]"
            }, {
                "name": "..."
            }
        ]
    },
    "WEBSERVICE": {
        "desc": "此函数会从Web服务返回数据。",
        "args": [{
                "name": "url"
            }
        ]
    },
    "FILTERJSON": {
        "desc": "此函数会将json字符串转换为一组值，一个对象或者一个对象数组",
        "args": [{
                "name": "json_string"
            }
        ]
    },
    "ASC": {
        "desc": "将双字节字符转换成单字节字符。与双字节字符集(DBCS)一起使用。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "DBCS": {
        "desc": "将单字节字符转换成双字节字符。",
        "args": [{
                "name": "text"
            }
        ]
    },
    "LAMBDA": {
        "desc": "创建一个可在公式中被调用的函数值。",
        "args": [{
                "name": "parameter_or_calculation"
            }, {
                "name": "[parameter_or_calculation]",
                "required": true
            }
        ]
    },
    "MAP": {
        "desc": "通过应用 LAMBDA 来创建新值，返回将数组中每个值映射到新值而形成的数组。",
        "args": [{
                "name": "array"
            }, {
                "name": "lambda_or_array",
                "required": true
            }
        ]
    },
    "REDUCE": {
        "desc": "通过将 LAMBDA 应用于每个值，并在累加器中返回总值，将数组减小为累积值。",
        "args": [{
                "name": "init_value"
            }, {
                "name": "array"
            }, {
                "name": "function"
            }
        ]
    },
    "SCAN": {
        "desc": "通过对每个值应用 LAMBDA 来扫描数组，并返回具有每个中间值的数组。",
        "args": [{
                "name": "init_value"
            }, {
                "name": "array"
            }, {
                "name": "function"
            }
        ]
    },
    "MAKEARRAY": {
        "desc": "通过应用 LAMBDA 来返回指定行和列大小的计算数组。",
        "args": [{
                "name": "rows"
            }, {
                "name": "cols"
            }, {
                "name": "function"
            }
        ]
    },
    "BYCOL": {
        "desc": "将 LAMBDA 应用于每一列，并返回结果的数组。 例如，如果原始数组是 3 列乘 2 行，则返回的数组为 3 列乘 1 行。",
        "args": [{
                "name": "array"
            }, {
                "name": "function"
            }
        ]
    },
    "BYROW": {
        "desc": "将 LAMBDA 应用于每一行，并返回结果数组。 例如，如果原始数组是 3 列乘 2 行，则返回的数组为 1 列乘 2 行。",
        "args": [{
                "name": "array"
            }, {
                "name": "function"
            }
        ]
    },
    "ISOMITTED": {
        "desc": "检查LAMBDA中的值是否缺失，并返回 TRUE 或 FALSE。",
        "args": [{
                "name": "argument"
            }
        ]
    },
    "TEXTBEFORE": {
        "desc": "返回分隔字符之前的文本。",
        "args": [{
                "name": "text"
            }, {
                "name": "delimiter"
            }, {
                "name": "[instance_num]"
            }, {
                "name": "match_mode",
                "required": false
            }, {
                "name": "[match_end]"
            }, {
                "name": "[if_not_found]"
            }
        ]
    },
    "TEXTAFTER": {
        "desc": "返回分隔字符之后的文本。",
        "args": [{
                "name": "text"
            }, {
                "name": "delimiter"
            }, {
                "name": "[instance_num]"
            }, {
                "name": "match_mode",
                "required": false
            }, {
                "name": "[match_end]"
            }, {
                "name": "[if_not_found]"
            }
        ]
    },
    "TEXTSPLIT": {
        "desc": "使用列和行分隔符拆分文本字符串。",
        "args": [{
                "name": "text"
            }, {
                "name": "col_delimiter"
            }, {
                "name": "[row_delimiter]"
            }, {
                "name": "[ignore_empty]"
            }, {
                "name": "match_mode",
                "required": false
            }, {
                "name": "[pad_with]"
            }
        ]
    },
    "SJS.REGEXEXTRACT": {
        "desc": "按照正则表达式提取匹配的子串。",
        "args": [{
                "name": "text"
            }, {
                "name": "regular_expression"
            }, {
                "name": "[modifiers]"
            }
        ]
    },
    "SJS.REGEXMATCH": {
        "desc": "判断一段文本是否与正则表达式相匹配。",
        "args": [{
                "name": "text"
            }, {
                "name": "regular_expression"
            }, {
                "name": "[modifiers]"
            }
        ]
    },
    "SJS.REGEXREPLACE": {
        "desc": "使用正则表达式将文本字符串中的一部分替换为其他文本字符串。",
        "args": [{
                "name": "text"
            }, {
                "name": "regular_expression"
            }, {
                "name": "replacement"
            }, {
                "name": "[modifiers]"
            }
        ]
    },
    "VSTACK": {
        "desc": "将数组垂直堆叠到一个数组中。",
        "args": [{
                "name": "array1"
            }, {
                "name": "[array2]",
                "required": true
            }
        ]
    },
    "HSTACK": {
        "desc": "将数组水平堆叠到一个数组中。",
        "args": [{
                "name": "array1"
            }, {
                "name": "[array2]",
                "required": true
            }
        ]
    },
    "TOROW": {
        "desc": "以一行形式返回数组。",
        "args": [{
                "name": "array"
            }, {
                "name": "[ignore]"
            }, {
                "name": "[scan_by_column]"
            }
        ]
    },
    "TOCOL": {
        "desc": "以一列形式返回数组。",
        "args": [{
                "name": "array"
            }, {
                "name": "[ignore]"
            }, {
                "name": "[scan_by_column]"
            }
        ]
    },
    "WRAPROWS": {
        "desc": "在指定数目的值后将行或列矢量换行。",
        "args": [{
                "name": "vector"
            }, {
                "name": "wrap_count"
            }, {
                "name": "[pad_with]"
            }
        ]
    },
    "WRAPCOLS": {
        "desc": "在指定数目的值后将行或列矢量换行。",
        "args": [{
                "name": "vector"
            }, {
                "name": "wrap_count"
            }, {
                "name": "[pad_with]"
            }
        ]
    },
    "TAKE": {
        "desc": "从数组开头或结尾返回行或列。",
        "args": [{
                "name": "array"
            }, {
                "name": "rows"
            }, {
                "name": "[columns]"
            }
        ]
    },
    "DROP": {
        "desc": "从数组开头或结尾删除行或列。",
        "args": [{
                "name": "array"
            }, {
                "name": "rows"
            }, {
                "name": "[columns]"
            }
        ]
    },
    "EXPAND": {
        "desc": "将数组扩展到指定维度。",
        "args": [{
                "name": "array"
            }, {
                "name": "rows"
            }, {
                "name": "[columns]"
            }, {
                "name": "[pad_with]"
            }
        ]
    },
    "CHOOSEROWS": {
        "desc": "返回数组中的指定行。",
        "args": [{
                "name": "array"
            }, {
                "name": "row_num1"
            }, {
                "name": "[row_num2]",
                "required": true
            }
        ]
    },
    "CHOOSECOLS": {
        "desc": "返回数组中的指定列。",
        "args": [{
                "name": "array"
            }, {
                "name": "col_num1"
            }, {
                "name": "[col_num2]",
                "required": true
            }
        ]
    }
}

export const getFormulasByCatalog = function (catalog) {
    return CATALOG_FORMULA_MAP[catalog];
};

export const getFormulaMetadata = function(code){
    return FORMULA_METADATAS[code];
}

export const getCatalogs = function () {
    return CATALOGS;
};
