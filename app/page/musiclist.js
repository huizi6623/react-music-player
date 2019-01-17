import React from 'react' ;
import MusicListItem from '../components/musiclistitem' ;

class MusicList extends React.Component{
    render(){
        let listEle = null ;
        const { currentMusicItem } = this.props ;
        listEle = this.props.musicList.map((item) => {
            return (
                <MusicListItem
                    focus={item === currentMusicItem}
                    key={item.id}
                    musicItem={item}
                >
                    {item.title}
                </MusicListItem>
            ) ;
        }) ;
        return(
            <ul>
                {listEle}
            </ul>
        ) ;
    }
}

export default MusicList ;