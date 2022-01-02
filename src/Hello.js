import React from 'react'; // 필수
import './App.css';

// 컴포넌트 이름은 대문자로 시작
function Hello({nameB, nameC, isTrue, color}) {
    const name ="hey~"

    return (
        <div style={{color: color}}>
            {name}
            {nameB}
            {nameC}
            {isTrue && <b>*</b>}
        </div>
    )
}

Hello.defaultProps = {
    nameC: '없음',
    color: 'black'
}


export default Hello;