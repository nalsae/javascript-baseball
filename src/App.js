const MissonUtils = require("@woowacourse/mission-utils");

class App {
  #RANDOM_NUM_LENGTH = 3;
  #randomNum = [];

  createRandomNum() {
    this.#randomNum = [];

    Array.from({ length: this.#RANDOM_NUM_LENGTH }).forEach(
      () =>
        (this.#randomNum = [
          ...this.#randomNum,
          MissonUtils.Random.pickNumberInRange(1, 9) + "",
        ])
    );
  }

  startGame() {
    MissonUtils.Console.print("숫자 야구 게임을 시작합니다.");

    this.getInput();
  }

  getInput() {
    MissonUtils.Console.readLine("숫자를 입력해주세요 : ", (userInput) =>
      this.compareResults(userInput)
    );
  }

  compareResults(userInput) {
    userInput = userInput.split("");

    const results = { ball: 0, strike: 0 };

    userInput.forEach((num, index) => {
      if (this.#randomNum.includes(num)) {
        num === this.#randomNum[index]
          ? (results.strike += 1)
          : (results.ball += 1);
      }
    });

    this.printResults(results);
  }

  printResults(compareResults) {
    const { strike, ball } = compareResults;

    console.log(this.#randomNum, compareResults);

    if (!ball && !strike) MissonUtils.Console.print("낫싱");

    if (ball && !strike) MissonUtils.Console.print(`${ball}볼`);

    if (!ball && strike) MissonUtils.Console.print(`${strike}스트라이크`);

    if (ball && strike)
      MissonUtils.Console.print(`${ball}볼 ${strike}스트라이크`);

    strike === 3 ? this.resetGame() : this.getInput();
  }

  resetGame() {
    MissonUtils.Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    MissonUtils.Console.readLine(
      "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n",
      (userInput) => {
        if (userInput !== "1" && userInput !== "2")
          this.throwError("초기화 실패");

        userInput === "1" ? this.play() : MissonUtils.Console.close();
      }
    );
  }

  play() {
    this.createRandomNum();

    this.startGame();
  }
}

const app = new App();

app.play();

module.exports = App;
