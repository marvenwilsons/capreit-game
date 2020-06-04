<template>
    <v-flex style="background:black;" relative fullheight-percent flex1 flexcenter flexcol >
        <video autoplay muted loop id="myVideo">
            <source src="video/vid-bg2.mp4" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
        <audio id="triton-audio">
            <source src="music/triton.mp3" type="audio/mp3">
        </audio>
        <audio id="cs6">
            <source src="sound-effects/SFX - Combo Sound6.mp3" type="audio/mp3">
        </audio>
        <audio id="infoOut">
            <source src="sound-effects/SFX - Info Out.mp3" type="audio/mp3">
        </audio>
        <audio id="buildUp">
            <source src="sound-effects/SFX - Prebooster Anim Buildup.mp3" type="audio/mp3">
        </audio>
        <audio id="signFalls">
            <source src="sound-effects/SFX - Sign Falls In1.wav" type="audio/mp3">
        </audio>
        <audio id="switch">
            <source src="sound-effects/SFX - Switch Sound1.mp3" type="audio/mp3">
        </audio>
        <audio id="win">
            <source src="music/winner.mp3" type="audio/mp3">
        </audio>
        <audio id="pling">
            <source src="sound-effects/SFX - Consolationprize Pling.mp3" type="audio/mp3">
        </audio>
        <audio id="wrong">
            <source src="sound-effects/incorrect sound effect.wav" type="audio/mp3">
        </audio>
        <audio id="unlocklevel">
            <source src="sound-effects/SFX - Sfx Unlocknewlevel.mp3" type="audio/mp3">
        </audio>
        <audio id="unstoppable">
            <source src="sound-effects/Unstoppable - Sound Effect.mp3" type="audio/mp3">
        </audio>
        <!--  -->
        <v-flex id="overlay" style="z-index:100;" fullwidth absolute fullheight-percent pad1ln flexcol>
            <div class="fullwidth" >
                <v-flex fullwidth spacebetween >
                    <div class="flex" >
                        <v-scroll-x-transition>
                            <div v-if="mounted1" id="" class="pad125 borderRad4 nodeShadow-w sf" >
                                <span class="cw ps" >Player: {{info.player}}</span>
                            </div>
                        </v-scroll-x-transition>
                        <v-scroll-y-transition>
                        <div v-if="mounted2" id="" class="pad125 borderRad4 nodeShadow-w marginleft125" >
                            <span class="cw ps sf" >Score: {{score}}</span>
                        </div>
                        </v-scroll-y-transition>
                    </div>
                    <v-scroll-x-transition>
                        <div v-if="mounted3" id="mainContent"  class="pad125 borderRad4 nodeShadow-w" >
                            <v-flex flexcol>
                                <span class="cw ps sf" >
                                    Time Remaining: {{countDownMin}}:{{countDown < 10 ? `0${countDown}` : countDown }}
                                </span>
                                <v-flex class=" spacearround " style="height: 6px;" >
                                    <div v-for="i in 15" :key="i"  :style="{background:getCountDownColor(i)}" class="flex1 marginright025 pad025 nodeShadow-w"></div>
                                </v-flex>
                            </v-flex>
                        </div> 

                        <!-- <v-flex flexcenter fullwidth >
                            <v-flex style="max-width:50%;" spacearround>
                                <div v-for="i in 5" :key="i"  :style="{background:getCountDownColor(i)}" class="flex1 margin050 pad050 nodeShadow-w"></div>
                            </v-flex>
                        </v-flex> -->
                    </v-scroll-x-transition>
                </v-flex>
            </div>
            <!-- game area -->
            <v-flex v-if="gameIsDone == false" style="z-index:100;" flexcenter >
                <v-expand-transition>
                    <v-flex v-if="mounted3 != true" flexcenter >
                        <h1 style="font-size:180px;" class="ps cw" >{{startGameCountDown}}</h1>
                    </v-flex>
                </v-expand-transition>
                <v-expand-transition>
                    <v-flex v-if="isStarting"  fullheight-percent  flexcenter flexcol>
                        <div class="fullheight-percent pad1ln" >
                            <v-scale-transition>
                                <tl-game-node v-show="nextITemTransition" @onDone="nextItem" :item="gameStack[gamePointer]" ></tl-game-node>
                            </v-scale-transition>
                        </div>
                        
                    </v-flex>
                </v-expand-transition>
            </v-flex>
            <!-- game is done -->
            <v-scale-transition>
                <v-flex flexcenter v-if="gameIsDone" relative >
                    <!-- nornal points: 5x, 3 points: 5x, correct answers: #, total questions: ##, total score: ##  -->
                    <div class="flex flexcol flexcenter relative" style="max-width: 650px" >
                        <v-expand-transition>
                            <button v-if="show_normalPointsGained"  class="video-game-button ps " >
                                <div class="pad050 padleft125 padright125 sf flex" >
                                    normal points gained: <span><animatxt @done="animatxtHandler('correctAnswers')" 
                                        :val="normalPointsGained == undefined ? true : normalPointsGained" 
                                    /></span>x
                                </div>     
                            </button>
                        </v-expand-transition>
                        <!-- <v-expand-transition>
                            <button v-if="show_threePointsGained"  class="video-game-button ps margintop125" >
                                <div class="pad050 padleft125 padright125 sf flex" >
                                    3 points gained: <span><animatxt @done="animatxtHandler('correctAnswers')" 
                                    :val="threePointsGained == undefined ? true : threePointsGained" 
                                    /></span>x
                                </div>     
                            </button>
                        </v-expand-transition> -->
                        <v-expand-transition>
                            <button v-if="show_correctAnswers" class="video-game-button ps margintop125" >
                                <div class="pad050 padleft125 padright125 sf flex" >
                                    correct answers: <span><animatxt @done="animatxtHandler('wrongAnswers')" 
                                        :val="correctAnswers == undefined ? true : correctAnswers" /></span>x
                                </div>     
                            </button>
                        </v-expand-transition>
                        <v-expand-transition>
                            <button v-if="show_wrongAnswers" class="video-game-button ps margintop125" >
                                <div class="pad050 padleft125 padright125 sf" >
                                    wrong answers:<span><animatxt @done="animatxtHandler('totalQuestions')" 
                                        :val="wrongAnswers == undefined ? true : wrongAnswers" 
                                        /></span>
                                </div>
                            </button>
                        </v-expand-transition>
                        <v-expand-transition>
                            <button v-if="show_totalQuestions" class="video-game-button ps margintop125" >
                                <div class="pad050 padleft125 padright125 sf" >
                                    total questions: <span><animatxt @done="animatxtHandler('totalScore')" 
                                    :val="totalQuestions == undefined ? true : totalQuestions" /></span>
                                </div>     
                            </button>
                        </v-expand-transition>
                        <v-expand-transition>
                            <v-flex v-if="show_totalScore" style="max-width:560px;" flexcenter spacearround>
                                <h1 class="ps cw marginright050" style="color:white;text-shadow: 2px 2px #f03304;font-size:25pt;"  >Total Score </h1>
                                <h1 v-if="totalScore != 1" class="ps cw" style="color:white;text-shadow: 2px 2px #f03304; font-size:25pt;"  >
                                    :<animatxt @done="animatxtHandler('playagain')" :val="totalScore == undefined ? true : totalScore" />
                                </h1>
                                <h1 style="color:white;text-shadow: 2px 2px #f03304; font-size:25pt;" v-if="totalScore == 1" class="ps cw marginright050"> 
                                    :1
                                </h1>
                            </v-flex>
                        </v-expand-transition>
                        <v-flex>
                            <!-- <h6 @click="playagain" v-if="playAgain" class="gbtn cw pointer marginright125 ps" >
                                Play Again
                            </h6> -->
                            <h6>|</h6>
                            <h6 v-if="playAgain" class="cw pointer marginleft125 ps gbtn" >
                                <div @click="submitScore" v-if="!isSubmitting" >Submit</div>
                                <div v-if="isSubmitting" 
                                    style="font-size:40px; width: 100px;height:40px;text-align:center;" 
                                    class="flex flexcenter loader">
                                    <span >&#11118;</span>
                                </div>
                            </h6>
                        </v-flex>
                    </div>
    
                </v-flex>
            </v-scale-transition>
        </v-flex>

    </v-flex>
</template>

<script>
import tlGameNode from './tl-game-node'
import animatxt from './animatxt'
import gameBtn from './game-btn'

export default {
    props: ['info'],
    components: {'tl-game-node':tlGameNode,animatxt,gameBtn},
    data: () => ({
        mounted1: false,
        mounted2: false,
        mounted3: false,
        isStarting: false,

        // initializing game
        startGameCountDown: 5,
        countDownMin: 2,
        countDown: 30, // 59
        
        // on game
        celebs: [],
        gameStack: [],
        gamePointer: 0,
        itemCountDown: 15,
        nextITemTransition: true,
        gameIsDone: false,
        score: 0,

        // on score board
        normalPointsGained: undefined,
        show_normalPointsGained: false,

        threePointsGained: undefined,
        show_threePointsGained: false,

        correctAnswers: undefined,
        show_correctAnswers: false,

        wrongAnswers: undefined,
        show_wrongAnswers: undefined,
        
        totalQuestions: 1,
        show_totalQuestions: false,

        totalScore: undefined,
        show_totalScore: false,

        playAgain: false,
        isSubmitting:false,
        gameCredits: false,
    }),
    mounted() {
        // test 1
        this.startGameOnLoadCountDown()

        const questionNode = (piclink_and_answer, gender) => {
            return {
                ...this.get3RandomChoices(`${gender}s`, piclink_and_answer),
                pic: `/celeb/${piclink_and_answer}.jpg`
            }
        }

        // females
        this.celebs.push(questionNode('Adele','female'))
        // this.celebs.push(questionNode('Angelina Jolie','female'))
        // this.celebs.push(questionNode('Beyonce','female'))
        // this.celebs.push(questionNode('Celine Dion','female'))
        this.celebs.push(questionNode('Ellen','female'))
        this.celebs.push(questionNode('Janet Jackson','female'))
        this.celebs.push(questionNode('Jennifer Aniston','female'))
        // this.celebs.push(questionNode('Julia Roberts','female'))
        this.celebs.push(questionNode('Kim Kardashian','female'))
        this.celebs.push(questionNode('Lady Gaga','female'))
        this.celebs.push(questionNode('Madonna','female'))
        // this.celebs.push(questionNode('Miley Cyrus','female'))
        this.celebs.push(questionNode('Oprah Winfrey','female'))
        // this.celebs.push(questionNode('Rihanna','female'))
        // this.celebs.push(questionNode('Selena Gomez','female'))

        // males
        this.celebs.push(questionNode('Barack Obama','male'))
        // this.celebs.push(questionNode('Brad Pitt','male'))
        // this.celebs.push(questionNode('Dr. Phil','male'))
        this.celebs.push(questionNode('Drake','male'))
        // this.celebs.push(questionNode('George Cloonie','male'))
        this.celebs.push(questionNode('Jay-Z','male'))
        this.celebs.push(questionNode('Jim Carrey','male'))
        // this.celebs.push(questionNode('Justin Bieber','male'))
        this.celebs.push(questionNode('Usher','male'))
        this.celebs.push(questionNode('Will Smith','male'))
        // this.celebs.push(questionNode('Leonardo DiCarpio','male'))
        // this.celebs.push(questionNode('Michael Buble','male'))
        this.celebs.push(questionNode('Michael Jackson','male'))
        // this.celebs.push(questionNode('Robbie Williams','male'))
        // this.celebs.push(questionNode('John Travolta','male'))

    },
    watch: {
        celebs() {
            this.gameStack = this.shuffle(this.celebs)
        },
        itemCountDown(val) {
            if(val == 0 && this.gameIsDone == false) {
                this.nextItem()
            }
           
            if(val == 1) {
                const signFalls = document.getElementById('signFalls')
                signFalls.volume = 0.5
                const switchSound = document.getElementById('switch')
                switchSound.volume = 0.6
                setTimeout(() => {
                    this.nextITemTransition = false
                    signFalls.play()
                    setTimeout(() => {
                        this.nextITemTransition = true
                        switchSound.play()
                        setTimeout(() => {
                            switchSound.pause()
                        }, 500);
                    }, 500);
                }, 600);
            }

        },
        score() {
            console.log(this.score)
            if(this.score == 15) {
                this.gameFinishProtocol()
            }
        },
        gamePointer() {
            if(this.gamePointer == 15) {
                this.gameFinishProtocol()
            }
        }
    },
    methods: {
        get3RandomChoices(gender, answer) {
            const celebs = {
                females: [
                    'Hillary Clinton',
                    'Michelle Obama',
                    'Michelle Williams',
                    'Katy Perry',
                    'Maria Carey',
                    'Angelina Jolie',
                    'Rihanna', 
                    'Lady Gaga',
                    'Miley Cyrus',
                    'Selena Gomez',
                    'Madonna', 
                    'Kim Kardashian',
                    'Oprah Winfrey', 
                    'Beyonce', 
                    'Julia Roberts',
                    'Adele', 
                    'Ellen', 
                    'Celine Dion',
                    'Jennifer Aniston',
                    'Janet Jackson'
                ],
                
                males: [
                    'Brad Pitt', 
                    'Michael Angelo', 
                    'Barack Obama', 
                    'Jay-Z', 
                    'Usher', 
                    'George Cloonie', 
                    'Jim Carrey', 
                    'Justin Bieber', 
                    'Drake', 
                    'Dr. Phil', 
                    'Leonardo DiCaprio', 
                    'Michael Buble', 
                    'Michael Jackson',
                    'Robbie Williams',
                    'John Travolta',
                    'Will Smith',
                    'Donald Trump',
                    'Justin Trudeau',
                    'Justin Timberlake',
                    'Prince William',
                    'Kyle Lowry'
                ]
            }
            return {
                choices: (() => {
                    // select 3 random items from selected gender
                    const answerIndex = celebs[gender].indexOf(answer)
                    celebs[gender] = this.shuffle(celebs[gender])

                    let random = []
                    for(var i = 0; i < 3; i++) {
                        celebs[gender] = this.shuffle(celebs[gender])

                        const myitem = celebs[gender][this.generateRandNumExcept(answerIndex,celebs[gender].length - 1)]
                        random.push(myitem)
                        // 
                        if(random.length == 0) {
                            populateRandom()
                        }
                    }
                    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
                    
                    random.push(answer)
                    random = this.shuffle(random)
                    
                    if(findDuplicates(random).length != 0) {
                        // console.log('dup -->',random)
                        const uniqueArray = new Set(random)
                        const backToArray = [...uniqueArray]
                        const inidexes = backToArray.map(celebName => {
                            return celebs[gender].indexOf(celebName)
                        })
                        // console.log('set',backToArray, answer)
                        // console.log(inidexes, '---', celebs[gender].indexOf(answer) )
                        // gen a new index
                        const getUniqueIndex = () => {
                            function getRandomInt(min, max) {
                                min = Math.ceil(min);
                                max = Math.floor(max);
                                return Math.floor(Math.random() * (max - min + 1)) + min;
                            }

                            const newRandomInt = getRandomInt(0,celebs[gender].length - 1)

                            if(inidexes.indexOf(newRandomInt) == -1) {
                                
                                return newRandomInt
                            } else {
                                getUniqueIndex()
                            }
                        }

                        random = backToArray

                        const initalIndex = getUniqueIndex()
                        let finalIndex = undefined
                        if(initalIndex  == undefined) {
                            finalIndex = getUniqueIndex()
                        } else {
                            finalIndex = initalIndex
                        }

                        random.push(celebs[gender][finalIndex])
                        random = this.shuffle(random)
                        return random
                    } else {
                        return random
                    }

        
                })(),
                answer
            }
        },
        generateRandNumExcept(except,range) {
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            const randomInt = getRandomInt(0,range)
            
            if(randomInt == except) {
                if(randomInt == 0) {
                    return this.generateRandNumExcept(getRandomInt(0,range),range)
                } else {
                    return this.generateRandNumExcept(getRandomInt(0,range),range)
                }
            } else {
                return randomInt
            }
        },
        shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        },
        // initializing game
        /** 5 seconds */ startItemCountDown() {
            const myInterval = setInterval(() => {
                if(this.itemCountDown == 0) {
                    clearInterval(myInterval)
                } else {
                    this.itemCountDown = this.itemCountDown - 1
                }
            }, 1000)
        },
        startGameOnLoadCountDown() {
                // test 2
                const cssound = document.getElementById('cs6')
                const buildUp = document.getElementById('buildUp')
                const myInterval = setInterval(() => {
                    this.startGameCountDown = this.startGameCountDown - 1
                    cssound.play()
                    if(this.startGameCountDown == 0) {
                        clearInterval(myInterval)
                        const triton = document.getElementById('triton-audio')
                        setTimeout(() => {
                            triton.volume = '0.5'
                            triton.loop = true
                            triton.play()
                        }, 200);
    
                        buildUp.play()
                        buildUp.volume = 0.6
                        setTimeout(() => {
                            this.isStarting = true
                            this.startcountDown()
                            this.startItemCountDown()
                        }, 1000);
                    }
    
                    if(this.startGameCountDown == 1) {
                        this.loadInfos()
                    }
                },1000)
        },
        getCountDownColor(i) {
                const c = this.itemCountDown 
    
                if(i >= c) {
                    return 'gray'
                } else {
                    return 'yellowgreen'
                }
        },
        loadInfos() {
            const infoOut = document.getElementById('infoOut')
            setTimeout(() => {
            this.mounted1 = true
            infoOut.play()
                setTimeout(() => {
                    this.mounted2 = true
                    infoOut.play()
                    setTimeout(() => {
                        this.mounted3 = true
                        infoOut.play()
                    }, 500);
                }, 500);
            }, 500);
        },
        gameFinishProtocol(intervalFunction) {
            this.totalQuestions = 15
            // if(this.wrongAnswers != 0) {
            //     this.score = 15 - this.wrongAnswers
            // }
            // when game is done
            clearInterval(intervalFunction)
            const win = document.getElementById('win')
            win.volume = 0.6
            win.play()
            const triton = document.getElementById('triton-audio')
            triton.pause()
            this.totalScore = this.score
            // restore defaults
            this.gameIsDone = true
            this.countDown = 30
            const infoOut = document.getElementById('cs6')
            infoOut.volume = 1
            setTimeout(() => {
                infoOut.play()
                this.mounted1 = false
                setTimeout(() => {
                    infoOut.play()
                    this.mounted3 = false
                    setTimeout(() => {
                        infoOut.play()
                        this.mounted2 = false
                    }, 250);
                }, 250);
            }, 500);
            this.loadScoreBoard()
        },
        /** 60 seconds */ 
        startcountDown() {
            const myCountDown = setInterval(() => {
                this.countDown = this.countDown - 1
                if(this.countDown == 0 && this.countDownMin == 0) {
                    this.gameFinishProtocol(myCountDown)
                }

                if(this.countDown == 0) {
                    this.countDownMin --
                    this.countDown = 59
                }

                if(this.countDown <= 10 && this.countDownMin == 0) {
                    const cssound = document.getElementById('cs6')
                    cssound.currentTime = 0.0
                    cssound.play()
                }
                
            }, 1000);
        },
        submitScore() {
            // todo
            this.isSubmitting  = true
            const url = undefined
            const ctx = {
                player: this.info.player,
                office_location: this.info.office_location,
                score: this.score
            }
            const options = {
                method: 'POST',
                body: JSON.stringify(ctx),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            fetch('/cap/sc',options)
                .then(res => res.json())
                .then(res => console.log(res));

            setTimeout(() => {
                this.$emit('gameCredits')
            }, 5000);
        },
        //  onGaming
        nextItem(val) {
            
            const pling = document.getElementById('pling')
            const wrong = document.getElementById('wrong')
            const unlocklevel = document.getElementById('unlocklevel')
            const unstoppable = document.getElementById('unstoppable')
            if(val == 1) {
                
                // this.totalQuestions = this.totalQuestions + 1
                if(this.itemCountDown == 15) {
                    this.score = this.score + 1
                    unlocklevel.volume = 0.3
                    unlocklevel.currentIndex = 0.0
                    unlocklevel.play()

                    unstoppable.volume = 0.2
                    unstoppable.currentTime = 0.0
                    unstoppable.play()

                    if(this.threePointsGained == undefined) {
                        this.threePointsGained = 1
                    } else {
                        this.threePointsGained = this.threePointsGained + 1
                    }
                    
                    if(this.correctAnswers == undefined) {
                        this.correctAnswers = 1
                    } else {
                        this.correctAnswers = this.correctAnswers + 1
                    }
                } else {
                    this.score = this.score + 1
                    pling.currentTime = 0.0
                    pling.play()

                    if(this.normalPointsGained == undefined) {
                        this.normalPointsGained = 1
                    } else {
                        this.normalPointsGained = this.normalPointsGained + 1
                    }

                    if(this.correctAnswers == undefined) {
                        this.correctAnswers = 1
                    } else {
                        this.correctAnswers = this.correctAnswers + 1
                    }
                }
            } else {
                wrong.volume = 0.5
                wrong.currentTime = 0.0
                wrong.play()
                if(this.wrongAnswers == undefined) {
                    this.wrongAnswers = 1
                    // this.gameStack = this.shuffle(this.celebs)
                } else {
                    this.wrongAnswers = this.wrongAnswers + 1
                    // this.gameStack = this.shuffle(this.celebs)
                }
            }

            // if(this.gamePointer == this.gameStack.length - 1) {
            //     // this.gameStack = this.shuffle(this.celebs)
            //     this.gamePointer = 0
            // } else {
            //     this.gamePointer = this.gamePointer + 1
            // }
            this.gamePointer = this.gamePointer + 1

            this.itemCountDown = 16
        },
        animatxtHandler(val) {
            const infoOut = document.getElementById('signFalls')
            const playInfoSound = () => {
                infoOut.currentTime = 0.0
                infoOut.play()
            }

            setTimeout(() => {
                if(val == 'threePointsGained') {
                    this.show_threePointsGained = true
                }
                if(val == 'correctAnswers') {
                    this.show_correctAnswers = true
                }
                if(val == 'wrongAnswers') {
                    this.show_wrongAnswers = true
                }
                if(val == 'totalQuestions') {
                    this.show_totalQuestions = true
                }
                if(val == 'totalScore') {
                    this.show_totalScore = true
                }
                if(val == 'playagain') {
                    this.playAgain = true
                    playInfoSound()
                }
            }, 500);
        },
        loadScoreBoard() {
            this.show_normalPointsGained = true
        },
        playagain() {
            this.$emit('playAgain')
        }
        
    }
}
</script>

<style>
#overlay {
    background: rgb(36,0,16);
    background: linear-gradient(273deg, rgba(36,0,16,0.8981967787114846) 32%, rgba(5,116,139,0.9150035014005602) 100%);
}
.nodeShadow-w{
    box-shadow: 0px 0px 13px -5px rgba(241, 241, 241, 0.75);
}
.gbtn:hover {
    color: yellowgreen;
    text-shadow: 2px 2px #f03304;
}
.loader {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>