import { useEffect, useRef, useState } from "react"
import Phaser from "phaser"

import styles from "../../../../styles/synapseHash/components/Game/Game.module.scss"
import configs from "../../../../configs/synapseHash"
import { addRandomNeurons } from "./utils/functions"
import { NeuronType, ConnectionType } from "../../../../types/synapseHash"
import ScoreAlert from "../../../globals/components/ScoreAlert/ScoreAlert"

const {
    backgroundColor
} = { ...configs };

const Game = () => {
    const [connectionsCount, setConnectionsCount] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);
    const scene = useRef<any>(null);
    const possibleConnections = useRef<number>(0);

    useEffect(() => {
        class NetWork extends Phaser.Scene {
            neurons: NeuronType[] = [];
            clickedNeuron: string = "";
            neuronConnections: ConnectionType[] = [];

            constructor(props?: any) {
                super(props)
            }

            preload = () => {
                this.load.image("neuronFrame", "./synapseHash/neuron.png");
                this.load.image("connectionFrame", "./synapseHash/connection.png");
                this.load.image("connectionElectrifiedFrame1", "./synapseHash/connectionElectrified1.png")
                this.load.image("connectionElectrifiedFrame2", "./synapseHash/connectionElectrified2.png")
                this.load.image("connectionElectrifiedFrame3", "./synapseHash/connectionElectrified3.png")
                this.load.image("connectionElectrifiedFrame4", "./synapseHash/connectionElectrified4.png")
                this.load.image("neuronElectrifiedFrame", "./synapseHash/neuronElectrified.png");
                this.load.image("clickedNeuronFrame", "./synapseHash/neuronBlur-removebg-preview.png");
            }
            create = () => {
                addRandomNeurons(this,
                    (connections: number) => {
                        if (connections === possibleConnections.current) setFinished(true)
                        setConnectionsCount(connections)
                    },
                    (neuronsCount: number) => possibleConnections.current = neuronsCount * (neuronsCount - 1) / 2);
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
    }, [Phaser, addRandomNeurons, setConnectionsCount, setFinished])

    return (
        <>
            {finished && <h1>Finished!</h1>}
            <ScoreAlert score={connectionsCount} mode="custom" />
            <div id="phaser-container" className={styles.phaser_cont} />
        </>
    )
}

export default Game;
