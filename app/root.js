import React from 'react' ;
import Header from './components/header' ;
import Player from './page/player' ;
import MusicList from './page/musiclist' ;
import { MUSIC_LIST } from './config/musicList' ;
import { HashRouter, Route, Switch } from 'react-router-dom' ;
import Pubsub from 'pubsub-js' ;
import './static/css/reset.css' ;
import './static/css/common.css' ;

const repeatTypes = ['cycle', 'random', 'once'] ;
class Root extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0],
            isAfterClick: false,
            repeatType: repeatTypes[0]
        } ;

        this.playMusic = this.playMusic.bind(this) ;
        this.playNext = this.playNext.bind(this) ;
        this.changeRepeat = this.changeRepeat.bind(this) ;
    }

    componentDidMount(){
        const { currentMusicItem } = this.state ;

        $('#player').jPlayer({
            ready: function(){
                $(this).jPlayer('setMedia', {
                    mp3: currentMusicItem.file
                })
            },
            supplied: 'mp3',
            wmode: 'window'
        }) ;

        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playNext() ;
        }) ;

        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    return item !== musicItem ;
                })
            }) ;
        }) ;
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem) ;
        }) ;
        Pubsub.subscribe('PLAY_PREV', () => {
            this.playNext('prev') ;
        }) ;
        Pubsub.subscribe('PLAY_NEXT', () => {
            this.playNext('next') ;
        }) ;
        Pubsub.subscribe('CHANGE_REPEAT', () => {
            this.changeRepeat() ;
        }) ;
    }

    componentWillUnMount(){
        Pubsub.unsubscribe('DELETE_MUSIC') ;
        Pubsub.unsubscribe('PLAY_MUSIC') ;
        Pubsub.unsubscribe('PLAY_NEXT') ;
        Pubsub.unsubscribe('PLAY_PREV') ;
        $('#player').unbind($.jPlayer.event.ended) ;
    }

    playMusic(musicItem){
        $('#player').jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play') ;

        this.setState({
            currentMusicItem: musicItem,
            isAfterClick: true
        }) ;
    }

    playNext(type = 'next'){
        let index = this.findMusicIndex(this.state.currentMusicItem) ;
        let newIndex = null ;
        let musicListLength = this.state.musicList.length ;
        switch(this.state.repeatType){
            case repeatTypes[0]:
                newIndex = (type === 'next') ? (index + 1) % musicListLength : (index - 1 + musicListLength) % musicListLength ;
                break;
            case repeatTypes[1]:
                newIndex = Math.floor(Math.random() * musicListLength) ;
                break ;
            case repeatTypes[2]:
                newIndex = index ;
        }
        this.playMusic(this.state.musicList[newIndex]) ;
    }

    changeRepeat(){
        let index = repeatTypes.indexOf(this.state.repeatType) ;
        index = (index + 1) % repeatTypes.length ;
        this.setState({
            repeatType: repeatTypes[index]
        }) ;
    }

    findMusicIndex(musicItem){
        return this.state.musicList.indexOf(musicItem) ;
    }

    render(){
        return (
            <HashRouter>
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' render={() => {
                        return <Player
                            currentMusicItem={this.state.currentMusicItem}
                            isAfterClick={this.state.isAfterClick}
                            repeatType={this.state.repeatType}
                        />
                    }} />

                    <Route path='/list' render={() => {
                        return <MusicList
                            currentMusicItem={this.state.currentMusicItem}
                            musicList={this.state.musicList}
                        />
                    }} />
                </Switch>
            </div>
            </HashRouter>
        ) ;
    }
}

export default Root ;