<template>
    <div class="game-component">
        <div class="game_block">
            <div v-for="button in game_buttons" :key="button.id" class="game_block-item"
                :class="[button.class, {active : activeButton == button.id } ]" @click="selectGameButton(button.id)">
            </div>
        </div>
        <div class="game_info">
            <div class="game_info-round">
                <h2>Round: <span>{{round}}</span></h2>
            </div>
            <p v-if="gameLose">Вы проиграли в {{gameLoseRound}} раунде!</p>
            <div class="game_info-difficulties">
                <label v-for="item in difficulties" :key="item.duration">
                    <input type="radio" :value="item" v-model="selectedDifficulty">
                    <span>{{item.title}}</span>
                </label>
            </div>
            <div class="game_info-button">
                <button @click="start" class="button">Start</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                game_buttons: [{
                        id: 1,
                        name: 'blue',
                        class: 'blue_block'
                    },
                    {
                        id: 2,
                        name: 'red',
                        class: 'red_block'
                    },
                    {
                        id: 3,
                        name: 'yellow',
                        class: 'yellow_block'
                    },
                    {
                        id: 4,
                        name: 'green',
                        class: 'green_block'
                    },
                ],
                difficulties: [{
                        title: 'Легкий',
                        name: 'easy',
                        duration: '1.5'
                    },
                    {
                        title: 'Средный',
                        name: 'normal',
                        duration: '1'
                    },
                    {
                        title: 'Сложный',
                        name: 'hard',
                        duration: '0.4'
                    }
                ],
                selectedDifficulty: {
                    title: 'Легкий',
                    name: 'easy',
                    duration: '1.5'
                },
                round: 0,
                gameLose: false,
                gameLoseRound: 0,
                activeButton: 0,
                gameStarted: false,
                game: [],
                userSelectedCombinations: []
            }
        },
        methods: {
            start() {
                this.userSelectedCombinations = [];
                this.game = [];
                this.gameLose = false;
                this.game.push(this.getRandInt());
                this.round = 1;

                setTimeout(this.showCombination, 1000);
            },
            NextRound() {
                this.userSelectedCombinations = [];
                this.game.push(this.getRandInt());
                this.round++;

                setTimeout(this.showCombination, 1000);
            },
            showCombination() {
                for (let i = 0; i < this.game.length; i++) {
                    console.log(this.game);
                    if (i == 0) {
                        let item = this.game[i];
                        this.activeButton = item;

                        setTimeout(this.emptyActiveButton, 1000 * this.selectedDifficulty.duration);
                    } else {
                        setTimeout(() => {
                            let item = this.game[i];
                            this.activeButton = item;

                            setTimeout(this.emptyActiveButton, 1000 * this.selectedDifficulty.duration);
                        }, i * 1500 * this.selectedDifficulty.duration);
                    }
                }
            },
            checkUserSelectedButton(buttonID) {
                let indexOfButton = this.userSelectedCombinations.indexOf(buttonID);

                if (this.game[indexOfButton] == buttonID) {
                    return true;
                } else {
                    return false;
                }
            },
            selectGameButton(buttonID) {
                this.activeButton = buttonID;
                this.userSelectedCombinations.push(buttonID);

                if (this.checkUserSelectedButton(buttonID) == false) {
                    this.gameLoseRound = this.round;
                    this.round = 0;
                    this.game = [];
                    this.userSelectedCombinations = [];
                    this.gameLose = true;
                } else if (this.checkUserSelectedButton(buttonID) && this.userSelectedCombinations.length == this.game.length) {
                    this.NextRound();
                }

                setTimeout(this.emptyActiveButton, 500);
            },
            emptyActiveButton() {
                this.activeButton = 0;
            },
            getRandInt() {
                return Math.floor(Math.random() * 4) + 1;
            }
        }
    }
</script>