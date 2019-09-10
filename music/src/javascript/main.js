import './icons.js'
import Swiper from './swrapper.js'

  //const $=selector=>document.querySelector(selector);
  //const $$=selector=>document.querySelectorAll(selector);


class Player{
    constructor(node){
        this.root = typeof node === 'string' ? document.querySelector(node):node
        this.$ = selector => this.root.querySelector(selector)
        this.$$ = selector => this.root.querySelectorAll(selector)
        this.songList=[]
        this.currentIndex = 0
        this.audio = new Audio()
        this.lyricsArr = []
        this.lyricIndex = -1

        this.start()
        this.bind()
        
    }
    start(){
        fetch('https://huangwei067231.github.io/data-mock/music-list.json')
        .then(res=>res.json())
        .then(data=>{
            this.songList = data
            this.loadSong()
        })
        // fetch(url, options)
        // .then(res=>res.json())
        // .then(data=>{
        //     console.log(data)
        //     this.songList = data
        // })
    }
    bind(){
        let self = this
        this.$('.btn-play-pause').onclick = function (){
           self.audio.src = self.songList[self.currentIndex].url
          if(this.classList.contains('playing')){
            self.audio.pause()
            this.classList.remove('playing')
            this.classList.add('pause')
            this.querySelector('use').setAttribute('xlink:href','#icon-play')
          }else{
            self.audio.play()
            this.classList.remove('pause')
            this.classList.add('playing')
            this.querySelector('use').setAttribute('xlink:href','#icon-pause')
          }
       }

       this.$('.btn-pre').onclick = function() {
        self.currentIndex = (self.songList.length + self.currentIndex - 1) % self.songList.length
        self.loadSong()
        self.playSong()
      }
  
      this.$('.btn-next').onclick = function() {
        self.currentIndex = (self.currentIndex + 1) % self.songList.length
        self.loadSong()
        self.playSong()
      }

       this.audio.ontimeupdate = function() {
        self.locateLyric()
        self.setProgerssBar()
      }
       
       

       let swiper = new Swiper(this.$('.panels'))
       swiper.on('swipLeft',function(){
         this.classList.remove('panel1')
         this.classList.add('panel2')
        // this.$('.active').classList.remove('active').nextSibling.add('active') 
       })
       swiper.on('swipRight',function(){
        this.classList.remove('panel2')
        this.classList.add('panel1')
       })

    }
    
    loadSong(){
      let songObj = this.songList[this.currentIndex]
      this.$('.header h1').innerText = songObj.title
      this.$('.header p').innerText = songObj.author+'-'+songObj.albumn
      this.audio.src=songObj.url
      this.audio.onloadedmetadata = () => this.$('.time-end').innerText = this.formateTime(this.audio.duration)

      this.loadLyrics()
      
    }


    playSong(){
      // this.currentIndex = (this.songList.length + this.currentIndex -1) % this.songList.length
      // this.audio.src = this.songList[this.currentIndex].url
      // console.log(this.currentIndex)
      this.audio.oncanplaythrough = () => this.audio.play()
    }

    // playNextSong(){
    //   this.currentIndex = (this.songList.length + this.currentIndex + 1)%this.songList.length
    //   this.audio.src = this.songList[this.currentIndex].url
    //   this.audio.oncanplaythrough = () => this.audio.play()
    // }

    loadLyrics(){
      fetch(this.songList[this.currentIndex].lyric)
      .then(res=> res.json())
      .then(data => {
       this.setLyrics(data.lrc.lyric)
       window.lyrics = data.lrc.lyric

      })
    }

    locateLyric() {
      let currentTime = this.audio.currentTime*1000
      let nextLineTime = this.lyricsArr[this.lyricIndex+1][0]
      if(currentTime > nextLineTime && this.lyricIndex < this.lyricsArr.length - 1) {
        this.lyricIndex++
        let node = this.$('[data-time="'+this.lyricsArr[this.lyricIndex][0]+'"]')
        if(node) this.setLyricToCenter(node)
        this.$$('.panel-effect .lyrics p')[0].innerText = this.lyricsArr[this.lyricIndex][1]
        this.$$('.panel-effect .lyrics p')[1].innerText = this.lyricsArr[this.lyricIndex+1] ? this.lyricsArr[this.lyricIndex+1][1] : ''
        
      }
    }
    setLyrics(lyrics) {
      this.lyricIndex = 0
      let fragment = document.createDocumentFragment()
      let lyricsArr  = []
      this.lyricsArr = lyricsArr
      lyrics.split(/\n/)
        .filter(str => str.match(/\[.+?\]/))
        .forEach(line => {
          let str = line.replace(/\[.+?\]/g, '')
          line.match(/\[.+?\]/g).forEach(t=>{
            t = t.replace(/[\[\]]/g,'')
            let milliseconds = parseInt(t.slice(0,2))*60*1000 + parseInt(t.slice(3,5))*1000 + parseInt(t.slice(6))
            lyricsArr.push([milliseconds, str])
          })
        })
  
        lyricsArr.filter(line => line[1].trim() !== '').sort((v1, v2) => {
          if(v1[0] > v2[0]) {
            return 1
          } else {
            return -1
          }
        }).forEach(line => {
            let node = document.createElement('p')
            node.setAttribute('data-time', line[0])
            node.innerText = line[1]
            fragment.appendChild(node)
          })
        this.$('.panel-lyrics .contain').innerHTML = ''
        this.$('.panel-lyrics .contain').appendChild(fragment)
    }

    setLyricToCenter(node) {
      let translateY = node.offsetTop - this.$('.panel-lyrics').offsetHeight / 2
      translateY = translateY > 0 ? translateY : 0
      this.$('.panel-lyrics .contain').style.transform = `translateY(-${translateY}px)`
      this.$$('.panel-lyrics p').forEach(node => node.classList.remove('current'))
      node.classList.add('current')
    }
  
    setProgerssBar() {
      let percent = (this.audio.currentTime * 100 /this.audio.duration) + '%'
      this.$('.bar .progress').style.width = percent
      this.$('.time-start').innerText = this.formateTime(this.audio.currentTime)
    }
  
    formateTime(secondsTotal) {
      let minutes = parseInt(secondsTotal/60)
      minutes = minutes >= 10 ? '' + minutes : '0' + minutes
      let seconds = parseInt(secondsTotal%60)
      seconds = seconds >= 10 ? '' + seconds : '0' + seconds
      return minutes + ':' + seconds
    }

//     loopPlay() { //存储当前播放歌曲的位置
//       console.log(this.audio.src)
//       for(var i=0;i<this.songList.length;i++) {
        
//         if(this.audio.src === this.songList[i].url) {      
//           currentIndex=i; //记录下当前播放歌曲的位置
//           break;
//         }    
//       }
//       return currentIndex; //整个函数返回当前播放歌曲的下标位置
//     }
//      //每隔1秒就检测一下当前播放歌曲的位置
}


 window.p=new Player('#player')

 
 

 
 