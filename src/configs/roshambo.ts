const backgroundsPath = "/roshambo/backgrounds/";

const getBackgroundsArr = (arr:Array<string>) => arr.map((background:string) => backgroundsPath + background);

export default {
        animationDuration: 2.5,
        summaryWaitTime: 2,
        infoImage: "/roshambo/info.jpg",
        info: "This is the traditional game of Roshambo, where two players use three jests: 'scissors', 'rock' and 'paper', from which 'paper' wins over 'rock', 'rock' over 'scissors' and 'scissors' over 'paper'. ",
        backgrounds: getBackgroundsArr([
            "tree.jpg",
            "street.webp",
            "mountain.jpg",
            "village.jpg",
            "office.webp",
            "village.jpg",
            "highway.jpeg",
            "factory.webp",
        ])
}