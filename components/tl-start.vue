<template>
    <v-flex  borderred fullheight-percent flex1 flexcenter >
        <div style="min-width:500px;" class="pad1ln nodeShadow" >
            <h4 class="ps" >
                <div class="flex flexcol flexcenter" >
                    <span>
                        baby puics
                    </span>
                    <span>
                        celebrity game
                    </span>
                </div>
            </h4>
            <v-text-field
                outlined
                placeholder="Player Name"
            ></v-text-field>
            <v-text-field
                outlined
                placeholder="Capreit Email Address"
            ></v-text-field>
            <v-flex  flexend >
                <!-- <game-btn color="primary" >
                <span class="ps" >
                    Play
                </span>
                </game-btn> -->
                <button class="ps start-btn" >
                    Play
                </button>
            </v-flex>
	    </div>
    </v-flex>
</template>

<style>
@import url('assets/dq-fw-0.4.css');

body {
  background-color: black;
  font-size: 30pt;
  font-family: 'Press Start 2p';
}
.video-game-button {
	text-shadow: 1px 1px pink, -1px -1px maroon;

	line-height: 1.5em;
	text-align: center;
	display: inline-block;
	width: 1.5em;
	-webkit-border-radius: .75em;
	-moz-border-radius: .75em;
	-o-border-radius: .75em;
		border-radius: .75em;
	background-color: red;
	-webkit-box-shadow:  0 .2em maroon;
	-moz-box-shadow:  0 .2em maroon;
	-o-box-shadow:  0 .2em maroon;
	box-shadow:  0 .2em maroon;
	color: red;
	margin: 5px;
	background-color: red;
	background-image: -o-linear-gradient(to top, pink 3%, red 22%, maroon 99%);
	background-image: -moz-linear-gradient(to top, pink 3%, red 22%, maroon 99%);
	background-image: -webkit-linear-gradient(to top, pink 3%, red 22%, maroon 99%);
	background-image: linear-gradient(to top, pink 3%, red 22%, maroon 99%);
	cursor: pointer;
  padding-left: 5px;
}
.start-btn{
    text-align: center;
	display: inline-block;
	margin:5px;
    font-weight: bold;
    padding: 10px 0 10px 10px ;
    background-color: lightgray;
    text-shadow: -1px -1px black, 1px 1px white;
    color: gray;
    -webkit-border-radius: 7px;
	-moz-border-radius: 7px;
	-o-border-radius: 7px;
	border-radius: 7px;
    box-shadow: 0 .2em gray; 
    cursor: pointer;

}
.video-game-button:active, .start-btn:active {
	box-shadow: none;
	position: relative;
	top: .2em;
}
</style>