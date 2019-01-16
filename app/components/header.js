import React from 'react' ;
import './header.less' ;

class Header extends React.Component{
    render(){
        return(
            <div className='components-header row'>
                <img src={require('../static/images/prizeBg1.png')} width='40' alt='' className='-col-auto'/>
                <h1 className='caption'>React Music Player</h1>
            </div>
        ) ;
    }
}

export default Header ;