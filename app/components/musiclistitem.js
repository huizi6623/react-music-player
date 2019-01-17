import React from 'react' ;
import './musiclistitem.less' ;
import Pubsub from 'pubsub-js' ;
import { Link } from 'react-router-dom' ;

class MusicListItem extends React.Component{
    constructor(props){
        super(props) ;
        this.playMusic = this.playMusic.bind(this) ;
        this.deleteMusic = this.deleteMusic.bind(this) ;
    }

    playMusic(musicItem){
        Pubsub.publish('PLAY_MUSIC', musicItem) ;
        Pubsub.publish('PLAYED') ;
    }

    deleteMusic(musicItem, e){
        e.stopPropagation() ;
        Pubsub.publish('DELETE_MUSIC', musicItem) ;
    }

    render(){
        let { musicItem, focus } = this.props ;
        return(
            <li
                onClick={() => this.playMusic(musicItem)}
                className={`components-listitem row ${focus ? "focus" : "" }`}
            >
                <Link to={'/'}>
                    <span><strong>{musicItem.title}</strong> - {musicItem.artist}</span>
                </Link>
                <span onClick={e => this.deleteMusic(musicItem, e)} className='-col-auto delete'></span>
            </li>
        );
    }
}

export default MusicListItem ;