import { Fragment } from 'react';

const Highlight = function (props) {
    const { text, highlight, variant = 'contained', style = {} } = props;
    if (highlight == '' || highlight == null || highlight == undefined) {
        return <span style={style}>{text}</span>;
    } else {
        const st =
            variant == 'contained'
                ? { ...style, backgroundColor: 'yellow' }
                : { ...style, color: 'black', backgroundColor: 'yellow' };
        const toHighligt = function (text = '', highlight) {
            const _text = text.toLowerCase();
            const index = _text.indexOf(highlight.toLowerCase());
            if (index != -1) {
                if (index > 0) {
                    return (
                        <Fragment>
                            <span style={style}>
                                {text.substring(0, index)}
                            </span>
                            <Highlight
                                text={text.substring(index)}
                                highlight={highlight}
                                variant={variant}
                                style={style}
                            ></Highlight>
                        </Fragment>
                    );
                } else {
                    return (
                        <Fragment>
                            <span style={st}>
                                {text.substring(0, highlight.length)}
                            </span>
                            {text.length > highlight.length ? (
                                <Highlight
                                    text={text.substring(highlight.length)}
                                    highlight={highlight}
                                    variant={variant}
                                    style={style}
                                ></Highlight>
                            ) : null}
                        </Fragment>
                    );
                }
            } else {
                return <span style={style}>{text}</span>;
            }
        };
        return toHighligt(text, highlight);
    }
};

export default Highlight;
