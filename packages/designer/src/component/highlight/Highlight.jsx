import { Fragment } from 'react';

const Highlight = function (props) {
    const { text, highlight, variant = 'contained' } = props;
    if (highlight == '' || highlight == null || highlight == undefined) {
        return <span>{text}</span>;
    } else {
        const style =
            variant == 'contained'
                ? { backgroundColor: 'yellow' }
                : { color: 'black', backgroundColor: 'yellow' };
        const toHighligt = function (text, highlight) {
            const index = text.indexOf(highlight);
            if (index != -1) {
                if (index > 0) {
                    return (
                        <Fragment>
                            <span>{text.substring(0, index)}</span>
                            <Highlight
                                text={text.substring(index)}
                                highlight={highlight}
                                variant={variant}
                            ></Highlight>
                        </Fragment>
                    );
                } else {
                    return (
                        <Fragment>
                            <span style={style}>{highlight}</span>
                            {text.length > highlight.length ? (
                                <Highlight
                                    text={text.substring(highlight.length)}
                                    highlight={highlight}
                                    variant={variant}
                                ></Highlight>
                            ) : null}
                        </Fragment>
                    );
                }
            } else {
                return <span>{text}</span>;
            }
        };
        return toHighligt(text, highlight);
    }
};

export default Highlight;
