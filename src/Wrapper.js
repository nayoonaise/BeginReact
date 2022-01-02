import React from 'react';

function Wrapper({children}) {
    const style = {
        border: '2px sold',
        background: 'blue',
        padding: 20,
    }

    return <div style={style}>{children}</div>
}
export default Wrapper;