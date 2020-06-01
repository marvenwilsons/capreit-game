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
                            <div v-if="mounted1" id="mainContent" class="pad125 borderRad4 nodeShadow-w" >
                                <span class="cw ps" >Player: {{info.player}}</span>
                            </div>
                        </v-scroll-x-transition>
                        <v-scroll-y-transition>
                        <div v-if="mounted2" id="mainContent" class="pad125 borderRad4 nodeShadow-w marginleft125" >
                            <span class="cw ps" >Score: {{score}}</span>
                        </div>
                        </v-scroll-y-transition>
                    </div>
                    <v-scroll-x-transition>
                        <div v-if="mounted3" id="mainContent" style="background" class="pad125 borderRad4 nodeShadow-w" >
                            <span class="cw ps" >Time Remaining: 00:{{countDown < 10 ? `0${countDown}` : countDown }}</span>
                        </div>
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
                        <v-flex flexcenter fullwidth >
                            <v-flex style="max-width:50%;" spacearround>
                                <div v-for="i in 5" :key="i"  :style="{background:getCountDownColor(i)}" class="flex1 margin050 pad050 nodeShadow-w"></div>
                            </v-flex>
                        </v-flex>
                    </v-flex>
                </v-expand-transition>
            </v-flex>
            <v-scale-transition>
                <v-flex flexcenter v-if="gameIsDone" >
                    game is done!
                </v-flex>
            </v-scale-transition>
        </v-flex>

    </v-flex>
</template>

<script>
import tlGameNode from './tl-game-node'

export default {
    props: ['info'],
    components: {'tl-game-node':tlGameNode},
    data: () => ({
        mounted1: false,
        mounted2: false,
        mounted3: false,
        isStarting: false,

        // initializing game
        startGameCountDown: 5,
        countDown: 59,
        
        // on game
        celebs: [],
        gameStack: [],
        gamePointer: 0,
        itemCountDown: 5,
        nextITemTransition: true,
        gameIsDone: false,
        score: 0
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
        this.celebs.push(questionNode('Angelina Jolie','female'))
        this.celebs.push(questionNode('Beyonce','female'))
        this.celebs.push(questionNode('Celine Dion','female'))
        this.celebs.push(questionNode('Ellen','female'))
        this.celebs.push(questionNode('Janet Jackson','female'))
        this.celebs.push(questionNode('Jennifer Aniston','female'))
        this.celebs.push(questionNode('Julia Roberts','female'))
        this.celebs.push(questionNode('Kim Kardashian','female'))
        this.celebs.push(questionNode('Lady Gaga','female'))
        this.celebs.push(questionNode('Madonna','female'))
        this.celebs.push(questionNode('Miley Cyrus','female'))
        this.celebs.push(questionNode('Oprah Winfrey','female'))
        this.celebs.push(questionNode('Rihanna','female'))
        this.celebs.push(questionNode('Selena Gomez','female'))

        // males
        this.celebs.push(questionNode('Barack Obama','male'))
        this.celebs.push(questionNode('Brad Pitt','male'))
        this.celebs.push(questionNode('Dr. Phil','male'))
        this.celebs.push(questionNode('Drake','male'))
        this.celebs.push(questionNode('George Cloonie','male'))
        this.celebs.push(questionNode('Jay-Z','male'))
        this.celebs.push(questionNode('Jim Carrey','male'))
        this.celebs.push(questionNode('Justin Bieber','male'))
        this.celebs.push(questionNode('Usher','male'))
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
                    
                    let random = []
                    for(var i = 0; i < 3; i++) {
                        const myitem = celebs[gender][this.generateRandNumExcept(answerIndex,celebs[gender].length - 1)]
                        // 
                        // const populateRandom = () => {
                        //     if(random.includes(myitem)) {
                        //         // 1. get a new index except the itemIndex
                        //         // 2. check random array using the new index
                        //         // 3. if index exist go back to 1, if not push to random array
                        //         console.log('duplicate')
                        //         populateRandom()
                        //     } else {
                        //         const myitem = celebs[gender][this.generateRandNumExcept(answerIndex,celebs[gender].length - 1)]
                        //         random.push(myitem)
                        //     }
                        // }
                        random.push(myitem)
                        // 
                        if(random.length == 0) {
                            populateRandom()
                        }
                    }
                    random.push(answer)
                    random = this.shuffle(random)
                    return random
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
                    return 1
                } else {
                    return randomInt - 1
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
                        triton.volume = '0.5'
                        triton.play()
    
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
        /** 60 seconds */ startcountDown() {
            const myCountDown = setInterval(() => {
                this.countDown = this.countDown - 1
                if(this.countDown == 0) {
                    // when game is done
                    clearInterval(myCountDown)
                    
                    const win = document.getElementById('win')
                    win.play()

                    const triton = document.getElementById('triton-audio')
                    triton.pause()

                    // restore defaults
                    this.gameIsDone = true
                    this.countDown = 59

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
                }

                if(this.countDown <= 10) {
                    const cssound = document.getElementById('cs6')
                    cssound.currentTime = 0.0
                    cssound.play()
                }
                
            }, 1000);
        },
        //  onGaming
        nextItem(val) {
            
            const pling = document.getElementById('pling')
            const wrong = document.getElementById('wrong')
            const unlocklevel = document.getElementById('unlocklevel')
            const unstoppable = document.getElementById('unstoppable')
            if(val == 1) {
                

                if(this.itemCountDown == 5) {
                    this.score = this.score + 3
                    unlocklevel.volume = 0.3
                    unlocklevel.currentIndex = 0.0
                    unlocklevel.play()

                    unstoppable.volume = 0.2
                    unstoppable.currentTime = 0.0
                    unstoppable.play()
                } else {
                    this.score = this.score + 1
                    pling.currentTime = 0.0
                    pling.play()
                }
            } else {
                wrong.volume = 0.5
                wrong.currentTime = 0.0
                wrong.play()
            }

            if(this.gamePointer == this.gameStack.length - 1) {
                this.gameStack = this.shuffle(this.celebs)
                this.gamePointer = 0
            } else {
                this.gamePointer = this.gamePointer + 1
            }
            this.itemCountDown = 6
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
</style>