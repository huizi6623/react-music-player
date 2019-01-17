import React from 'react' ;
import './progress.less' ;

class Progress extends React.Component{
    constructor(props){
        super(props) ;

        this.changeProgress = this.changeProgress.bind(this) ;
    }
    changeProgress(e){
        let progressBar = this.refs.progressBar ;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth ;

        this.props.onProgressChange && this.props.onProgressChange(progress) ;
    }

    render(){
        const style = {
            width: this.props.progress + '%',
            backgroundColor: this.props.barColor
        } ;

        return(
            <div className='components-progress' ref='progressBar' onClick={this.changeProgress}>
                <div className='progress' style={style}></div>
            </div>
        ) ;
    }
}

Progress.defaultProps = {
   barColor: '#2f9842'
} ;

export default Progress ;