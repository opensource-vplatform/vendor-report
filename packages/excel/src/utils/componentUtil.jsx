export const withDivStyled = function (style) {
    return function (props) {
        const { children, ...others } = props;
        return (
            <div style={style} {...others}>
                {children}
            </div>
        );
    };
};

export const withSpanStyled = function (style) {
    return function (props) {
        const { children, ...others } = props;
        return (
            <span style={style} {...others}>
                {children}
            </span>
        );
    };
};

export const withImgStyled = function (style) {
    return function (props) {
        const { children, ...others } = props;
        return (
            <img style={style} {...others}>
                {children}
            </img>
        );
    };
};
