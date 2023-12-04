import {
  Fragment,
  useState,
} from 'react';

import Context from './Context';

const activeHeaderStyle = {
    paddingBottom: 1,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderTop: 'solid 1px lightgray',
    borderLeft: 'solid 1px lightgray',
    borderRight: 'solid 1px lightgray',
    background: 'white',
    cursor: 'pointer',
};

function Tabs(props) {
    let { value, children } = props;
    const tabs = Array.isArray(children) ? children : [children];
    const [active, setActive] = useState(() => {
        return typeof value == 'undefined' ? tabs[0].props.code : value;
    });
    const headers = (
        <ul
            style={{
                border: 'solid 1px lightgray',
                background: 'white',
                margin: 0,
                padding: 0,
            }}
        >
            {children.map((child) => {
                const childProps = child.props;
                const childCode = childProps.code;
                const onClick = childProps.onClick;
                const styles = {
                    border: '1px solid transparent',
                    borderBottom: 'none',
                    bottom: '-1px',
                    cursor: 'pointer',
                    display: 'inline-block',
                    listStyle: 'none',
                    //padding: '6px 12px',
                    fontSize:'12px',
                    position: 'relative'
                };
                const actived = childCode == active;
                if (actived) {
                    Object.assign(styles, activeHeaderStyle);
                }
                let children = childProps.title;
                children =
                    typeof children == 'string' ? (
                        <a
                            style={{
                                padding: '6px 12px 6px 12px',
                                display:'block',
                                color: '#333',
                                cursor: actived ? 'text' : 'pointer',
                            }}
                        >
                            {children}
                        </a>
                    ) : (
                        children
                    );
                const clickHandler = typeof onClick == 'function' ? onClick:setActive;
                return (
                    <Fragment key={childCode}>
                        <li
                            style={styles}
                            onClick={() => {
                                clickHandler(childCode);
                            }}
                        >
                            {children}
                        </li>
                    </Fragment>
                );
            })}
        </ul>
    );
    return (
        <Fragment>
            <Context.Provider value={active}>
                <div>
                {headers}
                {children}
                </div>
            </Context.Provider>
        </Fragment>
    );
}

export default Tabs;
