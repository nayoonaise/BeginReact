import React, { Component } from 'react'; // 필수
import './App.css';

/*// 컴포넌트 이름은 대문자로 시작
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
}*/

class Hello extends Component {

    static defaultProps = {
        name: '나용쓰~'
    };

    render() {
        const {color, isSpecial, name} = this.props;
        return (
            <div style={{color}}>
                { isSpecial && <b>*</b> }
                {`안녕하세요 ${name}`}
            </div>
        )
    }
}


/*Hello.defaultProps = {
    nameC: '없음',
    color: 'black'
}*/


export default Hello;