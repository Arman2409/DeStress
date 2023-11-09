import { useEffect, useRef } from "react"
import Phaser from "phaser"

import styles from "../../../../styles/synapseHash/components/Game/Game.module.scss"
import configs from "../../../../configs/synapseHash"
import { addRandomNeurons } from "./utils/functions"
import { NeuronType } from "../../../../types/synapseHash"

const {
    backgroundColor
} = { ...configs };

const Game = () => {
    const scene = useRef<any>(null);

    useEffect(() => {
        class NetWork extends Phaser.Scene {
            neurons: NeuronType[] = []
            clickedNeuron:string = ""
            constructor(props?: any) {
                super(props)
            }
            preload = () => {
                this.load.image("neuronFrame", "./synapseHash/neuron.png");
                this.load.image("connectionFrame", "./synapseHash/connection.png")
                this.load.image("neuronElectrifiedFrame", "./synapseHash/neuronElectrified.png");
                this.load.image("clickedNeuronFrame", "./synapseHash/neuronBlur-removebg-preview.png");
            }
            create = () => {
                addRandomNeurons(this);
                this.cameras.main.setBackgroundColor(backgroundColor)
            }
        }

        scene.current = new NetWork();
        const phaserContainer = document.querySelector("#phaser-container");
        if (phaserContainer) {
            phaserContainer.innerHTML = "";
        }
        new Phaser.Game({
            type: Phaser.AUTO,
            width: "100%",
            height: "100%",
            parent: "phaser-container",
            scene: scene.current,
            physics: {
                default: 'arcade',
            },
        });
    }, [Phaser, addRandomNeurons])

    return (
        <div id="phaser-container" className={styles.phaser_cont} />
    )
}

export default Game;
